export const STRATEGIES = ["A", "B", "C", "D"];
export const DIMENSION_KEYS = [
  "expected_task_effectiveness",
  "embodied_feasibility",
  "functional_creativity",
];
export const OVERALL_RANKING_SOURCE = "derived_equal_weight_dimension_sum";

export function getOnboardingCtaLabel(participantState) {
  return participantState ? "Resume Evaluation →" : "Start Evaluation →";
}

export function responseIsComplete(response) {
  return STRATEGIES.every(
    (label) => DIMENSION_KEYS.every((dimension) => {
      const value = response?.ratings?.[label]?.[dimension];
      return Number.isInteger(value) && value >= 1 && value <= 5;
    }),
  );
}

export function deriveOverallRanking(ratings) {
  if (!responseIsComplete({ ratings })) {
    throw new TypeError("All 12 dimension ratings are required to derive an overall ranking.");
  }

  const overall_scores = Object.fromEntries(
    STRATEGIES.map((label) => [
      label,
      DIMENSION_KEYS.reduce((total, dimension) => total + ratings[label][dimension], 0),
    ]),
  );
  const labelsByScore = new Map();
  for (const label of STRATEGIES) {
    const score = overall_scores[label];
    const group = labelsByScore.get(score) || [];
    group.push(label);
    labelsByScore.set(score, group);
  }
  const overall_ranking = [...labelsByScore.keys()]
    .sort((left, right) => right - left)
    .map((score) => [...labelsByScore.get(score)].sort());

  return { overall_scores, overall_ranking };
}

export function getPrimaryTaskAction(currentTaskIndex, taskCount) {
  if (!Number.isInteger(currentTaskIndex) || !Number.isInteger(taskCount) || taskCount < 1) {
    throw new TypeError("Task position is invalid.");
  }
  const isFinal = currentTaskIndex === taskCount - 1;
  return {
    isFinal,
    label: isFinal ? "Save & Finish" : "Save & Next",
  };
}

export function getPrimaryTaskActionState(currentTaskIndex, taskCount, currentComplete) {
  return {
    ...getPrimaryTaskAction(currentTaskIndex, taskCount),
    visible: true,
    disabled: !currentComplete,
  };
}

export function studyIsComplete(tasks, responses) {
  return tasks.length > 0 && tasks.every((task) => responseIsComplete(responses?.[task.task_id]));
}

export function getTaskSubmitDestination(currentTaskIndex, taskCount, currentComplete, allComplete) {
  if (!currentComplete) return "incomplete";
  const { isFinal } = getPrimaryTaskAction(currentTaskIndex, taskCount);
  if (!isFinal) return "next";
  return allComplete ? "completion" : "incomplete";
}

export function readStoredParticipantState(storage, storageKey, expected) {
  try {
    const stored = JSON.parse(storage.getItem(storageKey));
    if (
      !stored ||
      stored.protocol_version !== expected.protocolVersion ||
      stored.dataset_revision !== expected.datasetRevision ||
      stored.pilot !== expected.pilot ||
      typeof stored.participant_id !== "string" ||
      !stored.responses ||
      typeof stored.responses !== "object"
    ) {
      return null;
    }
    return stored;
  } catch {
    return null;
  }
}

export function writeStoredParticipantState(storage, storageKey, state) {
  storage.setItem(storageKey, JSON.stringify(state));
}
