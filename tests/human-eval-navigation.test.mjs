import assert from "node:assert/strict";
import test from "node:test";

import {
  DIMENSION_KEYS,
  STRATEGIES,
  getPrimaryTaskAction,
  getPrimaryTaskActionState,
  getTaskSubmitDestination,
  readStoredParticipantState,
  responseIsComplete,
  studyIsComplete,
  writeStoredParticipantState,
} from "../human-eval/study-navigation.mjs";

const REVISION = "8d27ada2f16f1a90dfbf0cd7b7537c764cffa61d";

function completeResponse(taskId) {
  return {
    task_id: taskId,
    ratings: Object.fromEntries(
      STRATEGIES.map((label) => [
        label,
        Object.fromEntries(DIMENSION_KEYS.map((dimension) => [dimension, 3])),
      ]),
    ),
    rankings: Object.fromEntries(STRATEGIES.map((label, index) => [label, index + 1])),
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

test("pilot navigation labels tasks 1–2 as next and task 3 as finish", () => {
  assert.deepEqual(getPrimaryTaskAction(0, 3), { isFinal: false, label: "Save & Next" });
  assert.deepEqual(getPrimaryTaskAction(1, 3), { isFinal: false, label: "Save & Next" });
  assert.deepEqual(getPrimaryTaskAction(2, 3), { isFinal: true, label: "Save & Finish" });
});

test("formal navigation labels task 17 as next and task 18 as finish", () => {
  assert.deepEqual(getPrimaryTaskAction(16, 18), { isFinal: false, label: "Save & Next" });
  assert.deepEqual(getPrimaryTaskAction(17, 18), { isFinal: true, label: "Save & Finish" });
});

test("incomplete final task keeps its finish action but cannot continue", () => {
  const incomplete = completeResponse("task-03");
  delete incomplete.ratings.D.functional_creativity;
  assert.equal(responseIsComplete(incomplete), false);
  assert.deepEqual(getPrimaryTaskActionState(2, 3, false), {
    isFinal: true,
    label: "Save & Finish",
    visible: true,
    disabled: true,
  });
  assert.equal(getTaskSubmitDestination(2, 3, false, false), "incomplete");
});

test("a complete final task advances to the explicit completion screen", () => {
  const tasks = ["task-01", "task-02", "task-03"].map((task_id) => ({ task_id }));
  const responses = Object.fromEntries(tasks.map(({ task_id }) => [task_id, completeResponse(task_id)]));
  assert.equal(studyIsComplete(tasks, responses), true);
  assert.equal(getTaskSubmitDestination(2, 3, true, true), "completion");
});

test("reviewing the last task returns to completion with answers restored", () => {
  const storage = memoryStorage();
  const storageKey = "pilot-state";
  const tasks = ["task-01", "task-02", "task-03"].map((task_id) => ({ task_id }));
  const state = {
    participant_id: "participant-1",
    protocol_version: "0.1",
    dataset_revision: REVISION,
    pilot: true,
    current_task_index: 2,
    responses: Object.fromEntries(tasks.map(({ task_id }) => [task_id, completeResponse(task_id)])),
  };
  const expected = { protocolVersion: "0.1", datasetRevision: REVISION, pilot: true };

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
