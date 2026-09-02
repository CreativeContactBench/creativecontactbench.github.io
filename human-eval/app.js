import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/+esm";
import {
  DIMENSION_KEYS,
  OVERALL_RANKING_SOURCE,
  STRATEGIES,
  getOnboardingCtaLabel,
  getPrimaryTaskActionState,
  getTaskSubmitDestination,
  normalizeOverallRanking,
  overallRankingIsComplete,
  readStoredParticipantState,
  responseIsComplete,
  studyIsComplete,
  writeStoredParticipantState,
} from "./study-navigation.mjs";

const CONFIG = window.CCB_CONFIG;
const EXPECTED_REVISION = "b14ae69caecbeb062eb60c9189ee879a2514229b";
const ASSET_REVISION_ROOT = `revisions/${EXPECTED_REVISION}`;
const PROTOCOL_VERSION = "0.4";
const SOURCE_TASK_COUNT = 67;
const QUESTIONNAIRE_TASK_COUNT = 30;
const EXPECTED_TASK_IDS = Array.from(
  { length: SOURCE_TASK_COUNT },
  (_, index) => `task-${String(index + 1).padStart(2, "0")}`,
);
const TASK_FIELDS = [
  "task_id",
  "task_instruction",
  "image_path",
  "option_A",
  "option_B",
  "option_C",
  "option_D",
];
const PILOT = new URLSearchParams(window.location.search).get("pilot") === "1";
const STORAGE_KEY = `ccb-human-eval-${PROTOCOL_VERSION}-${PILOT ? "pilot" : "formal"}`;
const SCREEN_IDS = [
  "initializing-screen",
  "login-screen",
  "asset-loading-screen",
  "asset-error-screen",
  "welcome-screen",
  "task-screen",
  "completion-screen",
  "submitted-screen",
];

const elements = Object.fromEntries(
  [
    ...SCREEN_IDS,
    "pilot-badge",
    "participant-label",
    "sign-out-button",
    "login-form",
    "username",
    "password",
    "login-error",
    "sign-in-button",
    "asset-error-detail",
    "retry-assets-button",
    "welcome-pilot-banner",
    "welcome-task-count",
    "welcome-time-estimate",
    "start-evaluation-button",
    "task-position",
    "task-total",
    "task-id",
    "saved-count",
    "task-jump",
    "task-navigation-notice",
    "progress-fill",
    "task-image",
    "image-loading",
    "task-instruction",
    "strategy-grid",
    "evaluation-form",
    "ranking-section",
    "rank-selectors",
    "preference-complete-note",
    "rating-section",
    "rating-matrix-body",
    "dimension-help",
    "help-title",
    "help-question",
    "help-anchors",
    "close-help-button",
    "previous-button",
    "next-button",
    "completion-count",
    "submission-error",
    "review-last-button",
    "submit-responses-button",
    "submitted-count",
    "submitted-participant-id",
  ].map((id) => [id, document.getElementById(id)]),
);

let supabase;
let authSession = null;
let protocol = null;
let allTasks = [];
let studyTasks = [];
let participantState = null;
let currentImageUrl = null;
let activeTaskStartedAt = null;
let protectedLoadInProgress = false;

function assertConfiguration() {
  const required = [
    "supabaseUrl",
    "supabasePublishableKey",
    "tableName",
    "assetBucket",
    "participantUsername",
    "authEmail",
  ];
  if (!CONFIG || required.some((key) => typeof CONFIG[key] !== "string" || !CONFIG[key])) {
    throw new Error("Study configuration is incomplete.");
  }
  if (!CONFIG.supabasePublishableKey.startsWith("sb_publishable_")) {
    throw new Error("A browser-safe publishable key is required.");
  }
}

function showScreen(id) {
  for (const screenId of SCREEN_IDS) elements[screenId].hidden = screenId !== id;
  window.scrollTo({ top: 0, behavior: "auto" });
}

function setAuthenticatedHeader(authenticated) {
  elements["sign-out-button"].hidden = !authenticated;
  elements["pilot-badge"].hidden = !authenticated || !PILOT;
  elements["participant-label"].hidden = !authenticated || !participantState?.participant_id;
  elements["participant-label"].textContent = participantState?.participant_id || "";
}

function revokeCurrentImage() {
  if (currentImageUrl) URL.revokeObjectURL(currentImageUrl);
  currentImageUrl = null;
  elements["task-image"].removeAttribute("src");
  elements["task-image"].hidden = true;
}

function clearProtectedContent() {
  revokeCurrentImage();
  allTasks = [];
  studyTasks = [];
  elements["task-instruction"].textContent = "";
  elements["strategy-grid"].replaceChildren();
  elements["rank-selectors"].replaceChildren();
  elements["rating-matrix-body"].replaceChildren();
  elements["rating-section"].hidden = true;
  activeTaskStartedAt = null;
}

function showLogin() {
  clearProtectedContent();
  authSession = null;
  setAuthenticatedHeader(false);
  elements["login-error"].hidden = true;
  elements.password.value = "";
  showScreen("login-screen");
  elements.username.focus();
}

function showAssetError() {
  elements["asset-error-detail"].textContent =
    "Ask the researcher to confirm that the private study files have been uploaded, then retry.";
  setAuthenticatedHeader(true);
  showScreen("asset-error-screen");
}

function loadParticipantState() {
  return readStoredParticipantState(localStorage, STORAGE_KEY, {
    protocolVersion: PROTOCOL_VERSION,
    datasetRevision: EXPECTED_REVISION,
    pilot: PILOT,
  });
}

function saveParticipantState() {
  if (!participantState) return;
  writeStoredParticipantState(localStorage, STORAGE_KEY, participantState);
  setAuthenticatedHeader(Boolean(authSession));
}

function createParticipantState() {
  const now = new Date().toISOString();
  return {
    participant_id: crypto.randomUUID(),
    protocol_version: PROTOCOL_VERSION,
    dataset_revision: EXPECTED_REVISION,
    pilot: PILOT,
    study_started_at: now,
    study_completed_at: null,
    duration_seconds: null,
    current_task_index: 0,
    responses: {},
    submission_state: "draft",
  };
}

function validateProtocol(candidate) {
  if (
    candidate?.human_protocol_version !== PROTOCOL_VERSION ||
    candidate?.dataset_revision !== EXPECTED_REVISION ||
    candidate?.source_task_count !== SOURCE_TASK_COUNT ||
    candidate?.task_count !== QUESTIONNAIRE_TASK_COUNT ||
    candidate?.canonical_order_only !== true ||
    candidate?.vlm_balanced_permutations_used !== false ||
    candidate?.manual_overall_ranking_required !== true ||
    candidate?.overall_ranking?.source !== OVERALL_RANKING_SOURCE ||
    candidate?.overall_ranking?.collected_before_dimension_ratings !== true ||
    candidate?.overall_ranking?.all_strategies_required !== true ||
    candidate?.overall_ranking?.ties_allowed !== true ||
    candidate?.overall_ranking?.ranking_style !== "dense" ||
    candidate?.dimension_derived_ranking?.source !== "derived_from_dimension_ratings" ||
    candidate?.dimension_derived_ranking?.computed_at !== "analysis" ||
    candidate?.dimension_derived_ranking?.displayed_to_participant !== false ||
    candidate?.dimension_derived_ranking?.submitted_by_client !== false ||
    candidate?.dimension_derived_ranking?.weighting !== "equal" ||
    candidate?.dimension_derived_ranking?.formula !== "effectiveness + feasibility + creativity" ||
    candidate?.dimension_derived_ranking?.sort !== "descending" ||
    candidate?.dimension_derived_ranking?.ties_allowed !== true ||
    candidate?.dimension_derived_ranking?.tie_method !== "group_equal_total_scores" ||
    candidate?.dimension_derived_ranking?.ranking_style !== "dense"
  ) {
    throw new Error("Public protocol metadata is invalid.");
  }
  if (
    JSON.stringify(candidate.formal_task_ids)
    !== JSON.stringify(EXPECTED_TASK_IDS.slice(0, QUESTIONNAIRE_TASK_COUNT))
  ) {
    throw new Error("Formal questionnaire task set is invalid.");
  }
  if (JSON.stringify(candidate.pilot_task_ids) !== JSON.stringify(EXPECTED_TASK_IDS.slice(0, 3))) {
    throw new Error("Pilot task set is invalid.");
  }
  for (const key of DIMENSION_KEYS) {
    const dimension = candidate.dimensions?.[key];
    if (!dimension || Object.keys(dimension.anchors || {}).length !== 5) {
      throw new Error("Rating dimensions are invalid.");
    }
  }
  return candidate;
}

function validatePrivateTasks(payload) {
  if (
    !payload ||
    Object.keys(payload).sort().join(",") !== "dataset_revision,tasks" ||
    payload.dataset_revision !== EXPECTED_REVISION ||
    !Array.isArray(payload.tasks) ||
    payload.tasks.length !== SOURCE_TASK_COUNT
  ) {
    throw new Error("Protected task metadata failed validation.");
  }
  payload.tasks.forEach((task, index) => {
    if (
      Object.keys(task).sort().join(",") !== [...TASK_FIELDS].sort().join(",") ||
      task.task_id !== EXPECTED_TASK_IDS[index] ||
      task.image_path !== `images/${task.task_id}.jpg` ||
      TASK_FIELDS.some((key) => typeof task[key] !== "string" || !task[key].trim())
    ) {
      throw new Error("Protected task metadata failed validation.");
    }
  });
  return payload.tasks;
}

async function loadProtectedStudy() {
  if (!authSession || protectedLoadInProgress) return;
  protectedLoadInProgress = true;
  setAuthenticatedHeader(true);
  showScreen("asset-loading-screen");
  try {
    if (!protocol) {
      const protocolResponse = await fetch("./human_eval_v0.4.json", { cache: "no-store" });
      if (!protocolResponse.ok) throw new Error("Protocol metadata is unavailable.");
      protocol = validateProtocol(await protocolResponse.json());
    }
    const { data, error } = await supabase.storage
      .from(CONFIG.assetBucket)
      .download(`${ASSET_REVISION_ROOT}/tasks.json`);
    if (error || !data) throw new Error("Protected task metadata is unavailable.");
    const payload = JSON.parse(await data.text());
    allTasks = validatePrivateTasks(payload);
    studyTasks = PILOT
      ? allTasks.slice(0, 3)
      : allTasks.slice(0, QUESTIONNAIRE_TASK_COUNT);
    participantState = loadParticipantState();
    showWelcome();
  } catch {
    clearProtectedContent();
    showAssetError();
  } finally {
    protectedLoadInProgress = false;
  }
}

function showWelcome() {
  if (participantState?.submission_state === "submitted") {
    showSubmitted();
    return;
  }
  const taskCount = studyTasks.length;
  elements["welcome-task-count"].textContent = String(taskCount);
  const lowerMinutes = taskCount <= 3 ? 3 : Math.ceil(((taskCount * 15) / 19) / 5) * 5;
  const upperMinutes = taskCount <= 3 ? 5 : Math.ceil(((taskCount * 25) / 19) / 5) * 5;
  elements["welcome-time-estimate"].textContent = `${lowerMinutes}–${upperMinutes} minutes`;
  elements["welcome-pilot-banner"].hidden = !PILOT;
  elements["start-evaluation-button"].textContent = getOnboardingCtaLabel(participantState);
  setAuthenticatedHeader(true);
  showScreen("welcome-screen");
}

function getTaskResponse(taskId) {
  if (!participantState.responses[taskId]) {
    participantState.responses[taskId] = {
      task_id: taskId,
      ratings: {},
      rankings: {},
      first_viewed_at: new Date().toISOString(),
      last_saved_at: null,
      duration_seconds: 0,
    };
  }
  return participantState.responses[taskId];
}

function saveActiveTaskDuration() {
  if (activeTaskStartedAt === null || !participantState || !studyTasks.length) return;
  const task = studyTasks[participantState.current_task_index];
  if (!task) return;
  const response = getTaskResponse(task.task_id);
  response.duration_seconds += Math.max(0, (performance.now() - activeTaskStartedAt) / 1000);
  activeTaskStartedAt = document.hidden ? null : performance.now();
}

function readCurrentForm() {
  const task = studyTasks[participantState.current_task_index];
  const response = getTaskResponse(task.task_id);
  saveActiveTaskDuration();
  response.rankings ||= {};
  for (const label of STRATEGIES) {
    const rank = document.querySelector(`select[name="rank-${label}"]`)?.value;
    if (rank) response.rankings[label] = Number(rank);
    else delete response.rankings[label];
    response.ratings[label] ||= {};
    for (const dimension of DIMENSION_KEYS) {
      const selected = document.querySelector(
        `input[name="rating-${label}-${dimension}"]:checked`,
      );
      if (selected) response.ratings[label][dimension] = Number(selected.value);
    }
  }
  response.last_saved_at = new Date().toISOString();
  saveParticipantState();
  return response;
}

function completeResponseCount() {
  return studyTasks.filter((task) => responseIsComplete(participantState.responses[task.task_id])).length;
}

function responseHasAnyAnswer(response) {
  return STRATEGIES.some((label) => {
    const rank = response?.rankings?.[label];
    if (Number.isInteger(rank) && rank >= 1 && rank <= 4) return true;
    return DIMENSION_KEYS.some((dimension) => {
      const value = response?.ratings?.[label]?.[dimension];
      return Number.isInteger(value) && value >= 1 && value <= 5;
    });
  });
}

function renderTaskNavigator() {
  const completeCount = completeResponseCount();
  elements["saved-count"].textContent = `${completeCount} of ${studyTasks.length} complete`;
  elements["progress-fill"].style.width = `${(completeCount / studyTasks.length) * 100}%`;
  const progress = document.querySelector(".progress-track");
  progress.setAttribute("aria-valuemax", String(studyTasks.length));
  progress.setAttribute("aria-valuenow", String(completeCount));
  elements["task-jump"].replaceChildren();
  studyTasks.forEach((task, index) => {
    const response = participantState.responses[task.task_id];
    const status = responseIsComplete(response)
      ? "Complete"
      : responseHasAnyAnswer(response)
        ? "In progress"
        : "Not started";
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `Task ${task.task_id.slice(5)} — ${status}`;
    option.selected = index === participantState.current_task_index;
    elements["task-jump"].append(option);
  });
  return completeCount;
}

function showNavigationNotice(message) {
  elements["task-navigation-notice"].textContent = message;
  elements["task-navigation-notice"].hidden = false;
}

function updateNextButton() {
  const action = getPrimaryTaskActionState(
    participantState.current_task_index,
    studyTasks.length,
    studyIsComplete(studyTasks, participantState.responses),
  );
  elements["next-button"].textContent = `${action.label} →`;
  elements["next-button"].hidden = !action.visible;
  elements["next-button"].disabled = action.disabled;
}

function makeRatingControl(label, dimension, selectedValue) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "segmented-rating";
  const legend = document.createElement("legend");
  legend.className = "visually-hidden";
  legend.textContent = `Strategy ${label}, ${protocol.dimensions[dimension].title}`;
  fieldset.append(legend);
  for (let value = 1; value <= 5; value += 1) {
    const input = document.createElement("input");
    const id = `rating-${label}-${dimension}-${value}`;
    input.type = "radio";
    input.id = id;
    input.name = `rating-${label}-${dimension}`;
    input.value = String(value);
    input.checked = selectedValue === value;
    input.required = true;
    const controlLabel = document.createElement("label");
    controlLabel.htmlFor = id;
    controlLabel.textContent = String(value);
    controlLabel.title = protocol.dimensions[dimension].anchors[String(value)];
    fieldset.append(input, controlLabel);
  }
  return fieldset;
}

function renderRatingMatrix(response) {
  elements["rating-matrix-body"].replaceChildren();
  for (const label of STRATEGIES) {
    const row = document.createElement("tr");
    const heading = document.createElement("th");
    heading.scope = "row";
    const badge = document.createElement("span");
    badge.className = "matrix-strategy";
    badge.textContent = label;
    heading.append(badge);
    row.append(heading);
    for (const dimension of DIMENSION_KEYS) {
      const cell = document.createElement("td");
      cell.append(makeRatingControl(label, dimension, response.ratings?.[label]?.[dimension]));
      row.append(cell);
    }
    elements["rating-matrix-body"].append(row);
  }
}

function renderRankSelectors(response) {
  elements["rank-selectors"].replaceChildren();
  for (const label of STRATEGIES) {
    const wrapper = document.createElement("label");
    const heading = document.createElement("span");
    heading.append("Strategy ");
    const strong = document.createElement("strong");
    strong.textContent = label;
    heading.append(strong);
    wrapper.append(heading);

    const select = document.createElement("select");
    select.name = `rank-${label}`;
    select.required = true;
    select.setAttribute("aria-label", `Overall preference rank for strategy ${label}`);
    const prompt = document.createElement("option");
    prompt.value = "";
    prompt.textContent = "Choose rank";
    prompt.disabled = true;
    prompt.selected = !response.rankings?.[label];
    select.append(prompt);
    for (let value = 1; value <= 4; value += 1) {
      const option = document.createElement("option");
      option.value = String(value);
      option.textContent = value === 1
        ? "1 — Most preferred"
        : value === 4
          ? "4 — Least preferred"
          : String(value);
      option.selected = response.rankings?.[label] === value;
      select.append(option);
    }
    wrapper.append(select);
    elements["rank-selectors"].append(wrapper);
  }
}

function updateRatingStage(response) {
  const rankingComplete = overallRankingIsComplete(response);
  elements["rating-section"].hidden = false;
  elements["preference-complete-note"].hidden = !rankingComplete;
}

async function loadCurrentPrivateImage(task, renderIndex) {
  revokeCurrentImage();
  elements["image-loading"].hidden = false;
  elements["image-loading"].textContent = "Loading protected image…";
  const { data, error } = await supabase.storage
    .from(CONFIG.assetBucket)
    .download(`${ASSET_REVISION_ROOT}/${task.image_path}`);
  if (error || !data) {
    showAssetError();
    return;
  }
  if (participantState.current_task_index !== renderIndex || !authSession) return;
  currentImageUrl = URL.createObjectURL(data);
  elements["task-image"].src = currentImageUrl;
  elements["task-image"].alt = `Robot manipulation scene for ${task.task_id}`;
  elements["task-image"].hidden = false;
  elements["image-loading"].hidden = true;
}

function renderTask() {
  const index = Math.max(0, Math.min(participantState.current_task_index, studyTasks.length - 1));
  participantState.current_task_index = index;
  const task = studyTasks[index];
  const response = getTaskResponse(task.task_id);
  saveParticipantState();

  elements["task-position"].textContent = String(index + 1);
  elements["task-total"].textContent = String(studyTasks.length);
  elements["task-id"].textContent = task.task_id;
  renderTaskNavigator();
  elements["task-navigation-notice"].hidden = true;
  elements["task-instruction"].textContent = task.task_instruction;

  elements["strategy-grid"].replaceChildren();
  for (const label of STRATEGIES) {
    const card = document.createElement("article");
    card.className = "strategy-card";
    const badge = document.createElement("div");
    badge.className = "strategy-label";
    badge.textContent = label;
    const text = document.createElement("p");
    text.textContent = task[`option_${label}`];
    card.append(badge, text);
    elements["strategy-grid"].append(card);
  }

  renderRankSelectors(response);
  renderRatingMatrix(response);
  updateRatingStage(response);
  elements["previous-button"].hidden = index === 0;
  elements["dimension-help"].hidden = true;
  updateNextButton();
  setAuthenticatedHeader(true);
  showScreen("task-screen");
  activeTaskStartedAt = document.hidden ? null : performance.now();
  void loadCurrentPrivateImage(task, index);
}

function buildSubmissionResponses() {
  return studyTasks.map((task) => {
    const response = participantState.responses[task.task_id];
    if (!responseIsComplete(response)) throw new Error("A required task response is incomplete.");
    return {
      task_id: task.task_id,
      ratings: Object.fromEntries(
        STRATEGIES.map((label) => [
          label,
          Object.fromEntries(
            DIMENSION_KEYS.map((dimension) => [dimension, response.ratings[label][dimension]]),
          ),
        ]),
      ),
      overall_ranking: normalizeOverallRanking(response.rankings),
      overall_ranking_source: OVERALL_RANKING_SOURCE,
      first_viewed_at: response.first_viewed_at,
      last_saved_at: response.last_saved_at,
      duration_seconds: Number(response.duration_seconds.toFixed(3)),
    };
  });
}

function showCompletion() {
  if (!studyIsComplete(studyTasks, participantState.responses)) {
    showNavigationNotice("Some tasks are still incomplete. Use the task navigator to finish them before submitting.");
    return;
  }
  activeTaskStartedAt = null;
  participantState.study_completed_at = new Date().toISOString();
  saveParticipantState();
  const count = studyTasks.length;
  elements["completion-count"].textContent = `${count} / ${count}`;
  elements["submission-error"].hidden = true;
  elements["submit-responses-button"].disabled = false;
  elements["submit-responses-button"].textContent = "Submit Responses";
  showScreen("completion-screen");
}

function showSubmitted() {
  const count = studyTasks.length;
  elements["submitted-count"].textContent = `${count} / ${count}`;
  elements["submitted-participant-id"].textContent = participantState.participant_id;
  setAuthenticatedHeader(true);
  showScreen("submitted-screen");
}

async function submitResponses() {
  if (participantState?.submission_state === "submitted") {
    showSubmitted();
    return;
  }
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    showLogin();
    return;
  }
  let responses;
  try {
    responses = buildSubmissionResponses();
  } catch {
    elements["submission-error"].hidden = false;
    return;
  }
  const completedAt = participantState.study_completed_at || new Date().toISOString();
  const durationSeconds = Math.max(
    0,
    (Date.parse(completedAt) - Date.parse(participantState.study_started_at)) / 1000,
  );
  const payload = {
    participant_id: participantState.participant_id,
    protocol_version: PROTOCOL_VERSION,
    dataset_revision: EXPECTED_REVISION,
    pilot: PILOT,
    started_at: participantState.study_started_at,
    completed_at: completedAt,
    duration_seconds: Number(durationSeconds.toFixed(3)),
    responses,
  };

  elements["submit-responses-button"].disabled = true;
  elements["submit-responses-button"].textContent = "Submitting…";
  const { error } = await supabase.from(CONFIG.tableName).insert(payload);
  if (error) {
    elements["submission-error"].hidden = false;
    elements["submit-responses-button"].disabled = false;
    elements["submit-responses-button"].textContent = "Retry Submission";
    return;
  }
  participantState.study_completed_at = completedAt;
  participantState.duration_seconds = payload.duration_seconds;
  participantState.submission_state = "submitted";
  saveParticipantState();
  showSubmitted();
}

function showDimensionHelp(key) {
  const dimension = protocol.dimensions[key];
  elements["help-title"].textContent = dimension.title;
  elements["help-question"].textContent = dimension.question;
  elements["help-anchors"].replaceChildren();
  for (let value = 1; value <= 5; value += 1) {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = `${value} — `;
    item.append(strong, dimension.anchors[String(value)]);
    elements["help-anchors"].append(item);
  }
  elements["dimension-help"].hidden = false;
}

async function signOut() {
  saveActiveTaskDuration();
  saveParticipantState();
  clearProtectedContent();
  await supabase.auth.signOut();
  showLogin();
}

function bindEvents() {
  elements["login-form"].addEventListener("submit", async (event) => {
    event.preventDefault();
    elements["login-error"].hidden = true;
    const username = elements.username.value.trim();
    const enteredPassword = elements.password.value;
    elements.password.value = "";
    if (username !== CONFIG.participantUsername || !enteredPassword) {
      elements["login-error"].hidden = false;
      return;
    }
    elements["sign-in-button"].disabled = true;
    elements["sign-in-button"].textContent = "Signing in…";
    const { data, error } = await supabase.auth.signInWithPassword({
      email: CONFIG.authEmail,
      password: enteredPassword,
    });
    elements["sign-in-button"].disabled = false;
    elements["sign-in-button"].textContent = "Sign In";
    if (error || !data.session) {
      elements["login-error"].hidden = false;
      return;
    }
    authSession = data.session;
    await loadProtectedStudy();
  });

  elements["sign-out-button"].addEventListener("click", signOut);
  document.querySelectorAll(".sign-out-alias").forEach((button) => button.addEventListener("click", signOut));
  elements["retry-assets-button"].addEventListener("click", loadProtectedStudy);
  elements["start-evaluation-button"].addEventListener("click", () => {
    participantState ||= createParticipantState();
    saveParticipantState();
    renderTask();
  });

  elements["evaluation-form"].addEventListener("input", () => {
    const response = readCurrentForm();
    updateRatingStage(response);
    renderTaskNavigator();
    updateNextButton();
  });
  elements["evaluation-form"].addEventListener("change", () => {
    const response = readCurrentForm();
    updateRatingStage(response);
    renderTaskNavigator();
    updateNextButton();
  });
  elements["evaluation-form"].addEventListener("submit", (event) => {
    event.preventDefault();
    readCurrentForm();
    const allComplete = studyIsComplete(studyTasks, participantState.responses);
    const destination = getTaskSubmitDestination(
      participantState.current_task_index,
      studyTasks.length,
      allComplete,
    );
    if (destination === "review-incomplete") {
      const firstIncompleteIndex = studyTasks.findIndex(
        (task) => !responseIsComplete(participantState.responses[task.task_id]),
      );
      const incompleteCount = studyTasks.length - completeResponseCount();
      participantState.current_task_index = Math.max(0, firstIncompleteIndex);
      saveParticipantState();
      renderTask();
      showNavigationNotice(
        `${incompleteCount} ${incompleteCount === 1 ? "task is" : "tasks are"} still incomplete. `
        + "You can finish them in any order before final submission.",
      );
      return;
    }
    if (destination === "completion") {
      showCompletion();
      return;
    }
    participantState.current_task_index += 1;
    saveParticipantState();
    renderTask();
  });
  elements["task-jump"].addEventListener("change", (event) => {
    const requestedIndex = Number(event.target.value);
    if (!Number.isInteger(requestedIndex) || requestedIndex < 0 || requestedIndex >= studyTasks.length) {
      return;
    }
    readCurrentForm();
    participantState.current_task_index = requestedIndex;
    saveParticipantState();
    renderTask();
  });
  elements["previous-button"].addEventListener("click", () => {
    readCurrentForm();
    participantState.current_task_index = Math.max(0, participantState.current_task_index - 1);
    saveParticipantState();
    renderTask();
  });
  elements["review-last-button"].addEventListener("click", () => {
    participantState.current_task_index = studyTasks.length - 1;
    participantState.study_completed_at = null;
    saveParticipantState();
    renderTask();
  });
  elements["submit-responses-button"].addEventListener("click", submitResponses);

  document.querySelectorAll(".help-button").forEach((button) => {
    button.addEventListener("click", () => showDimensionHelp(button.dataset.help));
  });
  elements["close-help-button"].addEventListener("click", () => {
    elements["dimension-help"].hidden = true;
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      saveActiveTaskDuration();
      saveParticipantState();
    } else if (!elements["task-screen"].hidden) {
      activeTaskStartedAt = performance.now();
    }
  });
  window.addEventListener("beforeunload", () => {
    saveActiveTaskDuration();
    saveParticipantState();
    revokeCurrentImage();
  });
}

async function initialize() {
  try {
    assertConfiguration();
    supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
    bindEvents();
    supabase.auth.onAuthStateChange((event, session) => {
      authSession = session;
      if (event === "SIGNED_OUT" || !session) {
        showLogin();
      }
    });
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      showLogin();
      return;
    }
    authSession = data.session;
    await loadProtectedStudy();
  } catch {
    showLogin();
  }
}

void initialize();
