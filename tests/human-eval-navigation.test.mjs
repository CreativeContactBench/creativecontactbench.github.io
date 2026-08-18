import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  DIMENSION_KEYS,
  OVERALL_RANKING_SOURCE,
  STRATEGIES,
  deriveOverallRanking,
  getPrimaryTaskAction,
  getPrimaryTaskActionState,
  getTaskSubmitDestination,
  readStoredParticipantState,
  responseIsComplete,
  studyIsComplete,
  writeStoredParticipantState,
} from "../human-eval/study-navigation.mjs";

const REVISION = "8d27ada2f16f1a90dfbf0cd7b7537c764cffa61d";

function ratingsWithTotals(totals) {
  return Object.fromEntries(
    STRATEGIES.map((label) => {
      let remainder = totals[label] - DIMENSION_KEYS.length;
      const values = DIMENSION_KEYS.map(() => {
        const increment = Math.min(4, remainder);
        remainder -= increment;
        return 1 + increment;
      });
      assert.equal(remainder, 0, `Total for strategy ${label} must be between 3 and 15.`);
      return [label, Object.fromEntries(DIMENSION_KEYS.map((dimension, index) => [dimension, values[index]]))];
    }),
  );
}

function completeResponse(taskId, totals = { A: 9, B: 9, C: 9, D: 9 }) {
  const ratings = ratingsWithTotals(totals);
  const derived = deriveOverallRanking(ratings);
  return {
    task_id: taskId,
    ratings,
    ...derived,
    overall_ranking_source: OVERALL_RANKING_SOURCE,
    first_viewed_at: "2026-08-18T00:00:00.000Z",
    last_saved_at: "2026-08-18T00:01:00.000Z",
    duration_seconds: 60,
  };
}

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test("derived ranking orders unique totals from highest to lowest", () => {
  assert.deepEqual(deriveOverallRanking(ratingsWithTotals({ A: 15, B: 12, C: 9, D: 6 })), {
    overall_scores: { A: 15, B: 12, C: 9, D: 6 },
    overall_ranking: [["A"], ["B"], ["C"], ["D"]],
  });
});

test("derived ranking groups two-way ties and sorts labels alphabetically", () => {
  assert.deepEqual(deriveOverallRanking(ratingsWithTotals({ A: 13, B: 10, C: 13, D: 7 })), {
    overall_scores: { A: 13, B: 10, C: 13, D: 7 },
    overall_ranking: [["A", "C"], ["B"], ["D"]],
  });
});

test("derived ranking uses dense groups for a three-way tie", () => {
  assert.deepEqual(deriveOverallRanking(ratingsWithTotals({ A: 10, B: 10, C: 10, D: 8 })), {
    overall_scores: { A: 10, B: 10, C: 10, D: 8 },
    overall_ranking: [["A", "B", "C"], ["D"]],
  });
});

test("derived ranking handles a four-way tie as one group", () => {
  assert.deepEqual(deriveOverallRanking(ratingsWithTotals({ A: 11, B: 11, C: 11, D: 11 })), {
    overall_scores: { A: 11, B: 11, C: 11, D: 11 },
    overall_ranking: [["A", "B", "C", "D"]],
  });
});

test("11 ratings are incomplete and 12 ratings enable the task action", () => {
  const response = completeResponse("task-03");
  const missingRating = response.ratings.D.functional_creativity;
  delete response.ratings.D.functional_creativity;
  assert.equal(responseIsComplete(response), false);
  assert.throws(() => deriveOverallRanking(response.ratings), /All 12 dimension ratings/);
  assert.equal(getPrimaryTaskActionState(2, 3, false).disabled, true);

  response.ratings.D.functional_creativity = missingRating;
  assert.equal(responseIsComplete(response), true);
  assert.deepEqual(deriveOverallRanking(response.ratings).overall_ranking, [["A", "B", "C", "D"]]);
  assert.equal(getPrimaryTaskActionState(2, 3, true).disabled, false);
});

test("pilot navigation labels tasks 1–2 as next and task 3 as finish", () => {
  assert.deepEqual(getPrimaryTaskAction(0, 3), { isFinal: false, label: "Save & Next" });
  assert.deepEqual(getPrimaryTaskAction(1, 3), { isFinal: false, label: "Save & Next" });
  assert.deepEqual(getPrimaryTaskAction(2, 3), { isFinal: true, label: "Save & Finish" });
});

test("formal navigation labels task 17 as next and task 18 as finish", () => {
  assert.deepEqual(getPrimaryTaskAction(16, 18), { isFinal: false, label: "Save & Next" });
  assert.deepEqual(getPrimaryTaskAction(17, 18), { isFinal: true, label: "Save & Finish" });
});

test("complete pilot responses carry derived scores, ranking, and provenance", () => {
  const tasks = ["task-01", "task-02", "task-03"].map((task_id) => ({ task_id }));
  const responses = Object.fromEntries(
    tasks.map(({ task_id }, index) => [task_id, completeResponse(task_id, {
      A: 15 - index,
      B: 12,
      C: 9 + index,
      D: 6,
    })]),
  );
  assert.equal(studyIsComplete(tasks, responses), true);
  for (const response of Object.values(responses)) {
    assert.deepEqual(Object.keys(response.overall_scores), STRATEGIES);
    assert.ok(Array.isArray(response.overall_ranking));
    assert.equal(response.overall_ranking_source, OVERALL_RANKING_SOURCE);
  }
  assert.equal(getTaskSubmitDestination(2, 3, true, true), "completion");
});

test("incomplete final task keeps its finish action but cannot continue", () => {
  const incomplete = completeResponse("task-03");
  delete incomplete.ratings.D.functional_creativity;
  assert.deepEqual(getPrimaryTaskActionState(2, 3, false), {
    isFinal: true,
    label: "Save & Finish",
    visible: true,
    disabled: true,
  });
  assert.equal(getTaskSubmitDestination(2, 3, false, false), "incomplete");
});

test("v0.2 local state is isolated from v0.1 state", () => {
  const storage = memoryStorage();
  const oldKey = "ccb-human-eval-0.1-pilot";
  const newKey = "ccb-human-eval-0.2-pilot";
  const oldState = { protocol_version: "0.1", marker: "untouched" };
  storage.setItem(oldKey, JSON.stringify(oldState));

  const state = {
    participant_id: "participant-1",
    protocol_version: "0.2",
    dataset_revision: REVISION,
    pilot: true,
    current_task_index: 0,
    responses: { "task-01": completeResponse("task-01") },
  };
  writeStoredParticipantState(storage, newKey, state);

  assert.deepEqual(JSON.parse(storage.getItem(oldKey)), oldState);
  assert.equal(readStoredParticipantState(storage, oldKey, {
    protocolVersion: "0.2", datasetRevision: REVISION, pilot: true,
  }), null);
  assert.deepEqual(readStoredParticipantState(storage, newKey, {
    protocolVersion: "0.2", datasetRevision: REVISION, pilot: true,
  }), state);
});

test("reviewing the last task restores all ratings and derived values", () => {
  const storage = memoryStorage();
  const storageKey = "ccb-human-eval-0.2-pilot";
  const tasks = ["task-01", "task-02", "task-03"].map((task_id) => ({ task_id }));
  const state = {
    participant_id: "participant-1",
    protocol_version: "0.2",
    dataset_revision: REVISION,
    pilot: true,
    current_task_index: 2,
    responses: Object.fromEntries(tasks.map(({ task_id }) => [task_id, completeResponse(task_id)])),
  };
  const expected = { protocolVersion: "0.2", datasetRevision: REVISION, pilot: true };

  writeStoredParticipantState(storage, storageKey, state);
  const refreshed = readStoredParticipantState(storage, storageKey, expected);
  refreshed.current_task_index = 1;
  writeStoredParticipantState(storage, storageKey, refreshed);
  const afterPrevious = readStoredParticipantState(storage, storageKey, expected);
  afterPrevious.current_task_index = 2;
  writeStoredParticipantState(storage, storageKey, afterPrevious);
  const afterReview = readStoredParticipantState(storage, storageKey, expected);

  assert.deepEqual(afterReview.responses["task-03"], completeResponse("task-03"));
  assert.equal(getTaskSubmitDestination(2, 3, true, studyIsComplete(tasks, afterReview.responses)), "completion");
});

test("the participant UI contains no manual ranking controls", () => {
  const html = readFileSync(new URL("../human-eval/index.html", import.meta.url), "utf8");
  const app = readFileSync(new URL("../human-eval/app.js", import.meta.url), "utf8");
  assert.doesNotMatch(html, /rank-selectors|name=["']rank-|Assign each strategy a rank/);
  assert.doesNotMatch(app, /rank-selectors|name=["']rank-|normalizeRanking/);
});
