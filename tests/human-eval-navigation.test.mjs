import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  DIMENSION_KEYS,
  OVERALL_RANKING_SOURCE,
  STRATEGIES,
  getOnboardingCtaLabel,
  getPrimaryTaskAction,
  getPrimaryTaskActionState,
  getTaskSubmitDestination,
  normalizeOverallRanking,
  overallRankingIsComplete,
  ratingsAreComplete,
  readStoredParticipantState,
  responseIsComplete,
  shuffleTaskIds,
  studyIsComplete,
  taskOrderIsValid,
  writeStoredParticipantState,
} from "../human-eval/study-navigation.mjs";

const REVISION = "b14ae69caecbeb062eb60c9189ee879a2514229b";

function completeRatings(value = 3) {
  return Object.fromEntries(
    STRATEGIES.map((label) => [
      label,
      Object.fromEntries(DIMENSION_KEYS.map((dimension) => [dimension, value])),
    ]),
  );
}

function completeResponse(taskId, rankings = { A: 1, B: 2, C: 3, D: 4 }) {
  return {
    task_id: taskId,
    ratings: completeRatings(),
    rankings,
    first_viewed_at: "2026-09-02T00:00:00.000Z",
    last_saved_at: "2026-09-02T00:01:00.000Z",
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

test("overall preference normalizes unique ranks from most to least preferred", () => {
  assert.deepEqual(normalizeOverallRanking({ A: 4, B: 1, C: 3, D: 2 }), [
    ["B"], ["D"], ["C"], ["A"],
  ]);
});

test("overall preference preserves genuine ties as dense rank groups", () => {
  assert.deepEqual(normalizeOverallRanking({ A: 1, B: 3, C: 1, D: 4 }), [
    ["A", "C"], ["B"], ["D"],
  ]);
  assert.equal(OVERALL_RANKING_SOURCE, "participant_overall_preference");
});

test("a response requires both the overall preference and all 12 ratings", () => {
  const response = completeResponse("task-03");
  assert.equal(overallRankingIsComplete(response), true);
  assert.equal(ratingsAreComplete(response), true);
  assert.equal(responseIsComplete(response), true);

  delete response.rankings.D;
  assert.equal(overallRankingIsComplete(response), false);
  assert.equal(responseIsComplete(response), false);
  assert.throws(() => normalizeOverallRanking(response.rankings), /rank is required/);

  response.rankings.D = 4;
  delete response.ratings.D.functional_creativity;
  assert.equal(ratingsAreComplete(response), false);
  assert.equal(responseIsComplete(response), false);
});

test("an incomplete response does not block flexible task navigation", () => {
  assert.deepEqual(getPrimaryTaskActionState(1, 3, false), {
    isFinal: false,
    label: "Save & Next",
    visible: true,
    disabled: false,
  });
  assert.equal(getPrimaryTaskActionState(2, 3, true).disabled, false);
});

test("pilot navigation labels tasks 1–2 as next and task 3 as finish", () => {
  assert.deepEqual(getPrimaryTaskAction(0, 3), { isFinal: false, label: "Save & Next" });
  assert.deepEqual(getPrimaryTaskAction(1, 3), { isFinal: false, label: "Save & Next" });
  assert.deepEqual(getPrimaryTaskAction(2, 3), { isFinal: true, label: "Save & Finish" });
});

test("formal navigation labels task 29 as next and task 30 as finish", () => {
  assert.deepEqual(getPrimaryTaskAction(28, 30), { isFinal: false, label: "Save & Next" });
  assert.deepEqual(getPrimaryTaskAction(29, 30), { isFinal: true, label: "Save & Finish" });
});

test("participant task order is a shuffled copy and remains a valid permutation", () => {
  const canonical = ["task-01", "task-02", "task-03", "task-04"];
  const randomValues = [0.1, 0.8, 0.3];
  const shuffled = shuffleTaskIds(canonical, () => randomValues.shift());
  assert.deepEqual(canonical, ["task-01", "task-02", "task-03", "task-04"]);
  assert.notDeepEqual(shuffled, canonical);
  assert.equal(taskOrderIsValid(shuffled, canonical), true);
  assert.equal(taskOrderIsValid(["task-01", "task-01", "task-03", "task-04"], canonical), false);
});

test("complete pilot responses carry manual overall preferences", () => {
  const tasks = ["task-01", "task-02", "task-03"].map((task_id) => ({ task_id }));
  const responses = Object.fromEntries(
    tasks.map(({ task_id }, index) => [task_id, completeResponse(task_id, {
      A: 1 + index,
      B: 2,
      C: 3,
      D: 4,
    })]),
  );
  assert.equal(studyIsComplete(tasks, responses), true);
  for (const response of Object.values(responses)) {
    assert.ok(Array.isArray(normalizeOverallRanking(response.rankings)));
  }
  assert.equal(getTaskSubmitDestination(2, 3, true), "completion");
});

test("an incomplete study can advance and the final action starts review", () => {
  const incomplete = completeResponse("task-03");
  delete incomplete.rankings.D;
  assert.deepEqual(getPrimaryTaskActionState(2, 3, false), {
    isFinal: true,
    label: "Save & Review",
    visible: true,
    disabled: false,
  });
  assert.equal(getTaskSubmitDestination(1, 3, false), "next");
  assert.equal(getTaskSubmitDestination(2, 3, false), "review-incomplete");
});

test("v0.5 local state is isolated from v0.4 state and validates its task order", () => {
  const storage = memoryStorage();
  const oldKey = "ccb-human-eval-0.4-pilot";
  const newKey = "ccb-human-eval-0.5-pilot";
  const oldState = { protocol_version: "0.4", marker: "untouched" };
  storage.setItem(oldKey, JSON.stringify(oldState));

  const state = {
    participant_id: "participant-1",
    protocol_version: "0.5",
    dataset_revision: REVISION,
    pilot: true,
    current_task_index: 0,
    task_order: ["task-02", "task-03", "task-01"],
    responses: { "task-01": completeResponse("task-01") },
  };
  writeStoredParticipantState(storage, newKey, state);

  assert.deepEqual(JSON.parse(storage.getItem(oldKey)), oldState);
  assert.equal(readStoredParticipantState(storage, oldKey, {
    protocolVersion: "0.5", datasetRevision: REVISION, pilot: true,
    taskIds: ["task-01", "task-02", "task-03"],
  }), null);
  assert.deepEqual(readStoredParticipantState(storage, newKey, {
    protocolVersion: "0.5", datasetRevision: REVISION, pilot: true,
    taskIds: ["task-01", "task-02", "task-03"],
  }), state);

  state.task_order = ["task-01", "task-01", "task-03"];
  writeStoredParticipantState(storage, newKey, state);
  assert.equal(readStoredParticipantState(storage, newKey, {
    protocolVersion: "0.5", datasetRevision: REVISION, pilot: true,
    taskIds: ["task-01", "task-02", "task-03"],
  }), null);
});

test("saved responses from a previous dataset revision are isolated", () => {
  const storage = memoryStorage();
  const storageKey = "ccb-human-eval-0.5-formal";
  storage.setItem(storageKey, JSON.stringify({
    participant_id: "participant-old-revision",
    protocol_version: "0.5",
    dataset_revision: "d8fc98ae30bf1233518330215a6e57f990565d94",
    pilot: false,
    current_task_index: 0,
    responses: { "task-01": completeResponse("task-01") },
  }));

  assert.equal(readStoredParticipantState(storage, storageKey, {
    protocolVersion: "0.5", datasetRevision: REVISION, pilot: false,
  }), null);
});

test("partial overall preference and ratings survive local persistence", () => {
  const storage = memoryStorage();
  const storageKey = "ccb-human-eval-0.5-formal";
  const partial = completeResponse("task-12");
  delete partial.rankings.D;
  delete partial.ratings.C.embodied_feasibility;
  const state = {
    participant_id: "participant-partial",
    protocol_version: "0.5",
    dataset_revision: REVISION,
    pilot: false,
    current_task_index: 11,
    responses: { "task-12": partial },
  };

  writeStoredParticipantState(storage, storageKey, state);
  const restored = readStoredParticipantState(storage, storageKey, {
    protocolVersion: "0.5", datasetRevision: REVISION, pilot: false,
  });
  assert.deepEqual(restored, state);
  assert.equal(responseIsComplete(restored.responses["task-12"]), false);
});

test("reviewing the last task restores the overall preference and ratings", () => {
  const storage = memoryStorage();
  const storageKey = "ccb-human-eval-0.5-pilot";
  const tasks = ["task-01", "task-02", "task-03"].map((task_id) => ({ task_id }));
  const state = {
    participant_id: "participant-1",
    protocol_version: "0.5",
    dataset_revision: REVISION,
    pilot: true,
    current_task_index: 2,
    responses: Object.fromEntries(tasks.map(({ task_id }) => [task_id, completeResponse(task_id)])),
  };
  const expected = { protocolVersion: "0.5", datasetRevision: REVISION, pilot: true };

  writeStoredParticipantState(storage, storageKey, state);
  const refreshed = readStoredParticipantState(storage, storageKey, expected);
  refreshed.current_task_index = 1;
  writeStoredParticipantState(storage, storageKey, refreshed);
  const afterPrevious = readStoredParticipantState(storage, storageKey, expected);
  afterPrevious.current_task_index = 2;
  writeStoredParticipantState(storage, storageKey, afterPrevious);
  const afterReview = readStoredParticipantState(storage, storageKey, expected);

  assert.deepEqual(afterReview.responses["task-03"], completeResponse("task-03"));
  assert.equal(getTaskSubmitDestination(2, 3, studyIsComplete(tasks, afterReview.responses)), "completion");
});

test("task UI supports jumping and saving partial answers", () => {
  const html = readFileSync(new URL("../human-eval/index.html", import.meta.url), "utf8");
  const app = readFileSync(new URL("../human-eval/app.js", import.meta.url), "utf8");
  assert.match(html, /id="task-jump"/);
  assert.match(html, /You may skip this task and return later/);
  assert.doesNotMatch(html, /id="next-button"[^>]*disabled/);
  assert.match(app, /task-jump"\]\.addEventListener\("change"/);
  assert.match(app, /responseHasAnyAnswer/);
  assert.match(app, /You can finish them in any order before final submission/);
});

test("overall preference is presented before ratings while both sections stay visible", () => {
  const html = readFileSync(new URL("../human-eval/index.html", import.meta.url), "utf8");
  const app = readFileSync(new URL("../human-eval/app.js", import.meta.url), "utf8");
  assert.ok(html.indexOf('id="ranking-section"') < html.indexOf('id="rating-section"'));
  assert.doesNotMatch(html, /id="rating-section"[^>]*hidden/);
  assert.match(html, /Use the same rank only for a genuine tie/);
  assert.match(app, /overallRankingIsComplete\(response\)/);
  assert.match(app, /elements\["rating-section"\]\.hidden = false/);
  assert.match(app, /overall_ranking: normalizeOverallRanking\(response\.rankings\)/);
  assert.match(app, /overall_ranking_source: OVERALL_RANKING_SOURCE/);
  assert.doesNotMatch(html, /derived-ranking|Calculated automatically from the three ratings/);
  assert.doesNotMatch(app, /deriveOverallRanking|overall_scores|derived-ranking/);
});

test("v0.5 protocol includes tasks 1–19 plus a reproducible random sample of 11", () => {
  const protocol = JSON.parse(readFileSync(
    new URL("../human-eval/human_eval_v0.5.json", import.meta.url),
    "utf8",
  ));
  assert.equal(protocol.human_protocol_version, "0.5");
  assert.equal(protocol.source_task_count, 67);
  assert.equal(protocol.task_count, 30);
  const core = Array.from({ length: 19 }, (_, index) => `task-${String(index + 1).padStart(2, "0")}`);
  assert.deepEqual(protocol.formal_task_ids.slice(0, 19), core);
  assert.equal(new Set(protocol.formal_task_ids).size, 30);

  const pool = Array.from({ length: 48 }, (_, index) => `task-${String(index + 20).padStart(2, "0")}`);
  const seed = protocol.questionnaire_selection.seed;
  const reproducedSample = pool
    .sort((left, right) => createHash("sha256").update(`${seed}:${left}`).digest("hex")
      .localeCompare(createHash("sha256").update(`${seed}:${right}`).digest("hex")))
    .slice(0, 11);
  assert.deepEqual(protocol.questionnaire_selection.sampled_task_ids, reproducedSample);
  assert.deepEqual(
    protocol.formal_task_ids.slice(19),
    [...reproducedSample].sort((left, right) => left.localeCompare(right)),
  );
  assert.equal(protocol.canonical_order_only, false);
  assert.equal(protocol.presentation_order.scope, "per_participant");
  assert.equal(protocol.presentation_order.persisted_with_progress, true);
  assert.equal(protocol.presentation_order.submission_response_order, "canonical_task_id_ascending");
  assert.equal(protocol.manual_overall_ranking_required, true);
  assert.equal(protocol.overall_ranking.source, "participant_overall_preference");
  assert.equal(protocol.overall_ranking.collected_before_dimension_ratings, true);
  assert.equal(protocol.dimension_derived_ranking.computed_at, "analysis");
  assert.equal(protocol.dimension_derived_ranking.displayed_to_participant, false);
  assert.equal(protocol.dimension_derived_ranking.submitted_by_client, false);
});

test("onboarding CTA distinguishes first-time and saved-progress states", () => {
  const app = readFileSync(new URL("../human-eval/app.js", import.meta.url), "utf8");
  assert.equal(getOnboardingCtaLabel(null), "I understand — let’s get started! →");
  assert.equal(getOnboardingCtaLabel(undefined), "I understand — let’s get started! →");
  assert.equal(
    getOnboardingCtaLabel({ participant_id: "participant-1", responses: {} }),
    "Resume Evaluation →",
  );
  assert.match(
    app,
    /start-evaluation-button"\]\.addEventListener\("click", \(\) => \{\s+participantState \|\|= createParticipantState\(\);\s+applyParticipantTaskOrder\(\);\s+saveParticipantState\(\);\s+renderTask\(\);/,
  );
});

test("static worked example remains display-only and separate from study tasks", () => {
  const html = readFileSync(new URL("../human-eval/index.html", import.meta.url), "utf8");
  const app = readFileSync(new URL("../human-eval/app.js", import.meta.url), "utf8");
  assert.match(html, /data-display-only="true"/);
  assert.match(html, /src="\.\/worked-example-guide-v03\.svg"/);
  assert.doesNotMatch(app, /worked-example-guide|tutorial/i);
  assert.match(app, /const selectedTaskIds = PILOT \? protocol\.pilot_task_ids : protocol\.formal_task_ids/);
  assert.match(app, /return canonicalStudyTasks\.map\(\(task\) =>/);
  assert.match(app, /presentation_position: participantState\.task_order\.indexOf\(task\.task_id\) \+ 1/);
});

test("protected task metadata and images remain pinned to the dataset revision", () => {
  const app = readFileSync(new URL("../human-eval/app.js", import.meta.url), "utf8");
  assert.match(app, /const ASSET_REVISION_ROOT = `revisions\/\$\{EXPECTED_REVISION\}`/);
  assert.match(app, /download\(`\$\{ASSET_REVISION_ROOT\}\/tasks\.json`\)/);
  assert.match(app, /download\(`\$\{ASSET_REVISION_ROOT\}\/\$\{task\.image_path\}`\)/);
});

test("onboarding scene count is derived from the loaded study task set", () => {
  const html = readFileSync(new URL("../human-eval/index.html", import.meta.url), "utf8");
  const app = readFileSync(new URL("../human-eval/app.js", import.meta.url), "utf8");
  assert.match(html, /id="welcome-task-count"/);
  assert.match(html, /id="welcome-time-estimate"/);
  assert.match(app, /const taskCount = studyTasks\.length/);
  assert.match(app, /welcome-task-count"\]\.textContent = String\(taskCount\)/);
  assert.match(app, /welcome-time-estimate"\]\.textContent/);
});
