export const STRATEGIES = ["A", "B", "C", "D"];
export const DIMENSION_KEYS = [
  "expected_task_effectiveness",
  "embodied_feasibility",
  "functional_creativity",
];
export const OVERALL_RANKING_SOURCE = "participant_overall_preference";

export function getOnboardingCtaLabel(participantState) {
  return participantState ? "Resume Evaluation →" : "I understand — let’s get started! →";
}

export function ratingsAreComplete(response) {
  return STRATEGIES.every(
    (label) => DIMENSION_KEYS.every((dimension) => {
      const value = response?.ratings?.[label]?.[dimension];
      return Number.isInteger(value) && value >= 1 && value <= 5;
    }),
  );
}

export function overallRankingIsComplete(response) {
  return STRATEGIES.every((label) => {
    const value = response?.rankings?.[label];
    return Number.isInteger(value) && value >= 1 && value <= 4;
  });
}

export function responseIsComplete(response) {
  return overallRankingIsComplete(response) && ratingsAreComplete(response);
}

export function normalizeOverallRanking(rankings) {
  if (!overallRankingIsComplete({ rankings })) {
    throw new TypeError("An overall preference rank is required for all four strategies.");
  }

  const distinctRanks = [...new Set(STRATEGIES.map((label) => rankings[label]))]
    .sort((left, right) => left - right);
  return distinctRanks.map((rank) => STRATEGIES.filter((label) => rankings[label] === rank));
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

export function getPrimaryTaskActionState(currentTaskIndex, taskCount, allComplete) {
  const action = getPrimaryTaskAction(currentTaskIndex, taskCount);
  return {
    ...action,
    label: action.isFinal && !allComplete ? "Save & Review" : action.label,
    visible: true,
    disabled: false,
  };
}

export function studyIsComplete(tasks, responses) {
  return tasks.length > 0 && tasks.every((task) => responseIsComplete(responses?.[task.task_id]));
}

export function getTaskSubmitDestination(currentTaskIndex, taskCount, allComplete) {
  const { isFinal } = getPrimaryTaskAction(currentTaskIndex, taskCount);
  if (!isFinal) return "next";
  return allComplete ? "completion" : "review-incomplete";
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
