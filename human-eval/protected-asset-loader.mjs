const DEFAULT_TIMEOUT_MS = 15_000;

async function attemptSessionRefresh(refreshSession, timeoutMs) {
  let timeoutId;
  const timeoutResult = new Promise((resolve) => {
    timeoutId = setTimeout(() => resolve(null), timeoutMs);
  });
  const refreshResult = Promise.resolve()
    .then(refreshSession)
    .catch(() => null);
  try {
    return await Promise.race([refreshResult, timeoutResult]);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function attemptDownload(download, timeoutMs) {
  const controller = new AbortController();
  let timeoutId;
  const timeoutResult = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      controller.abort();
      const error = new Error("Protected asset download timed out.");
      error.name = "TimeoutError";
      resolve({ data: null, error });
    }, timeoutMs);
  });
  const downloadResult = Promise.resolve()
    .then(() => download({ signal: controller.signal }))
    .then(
      (result) => result || {
        data: null,
        error: new Error("Protected asset download returned no result."),
      },
      (error) => ({ data: null, error }),
    );
  try {
    return await Promise.race([downloadResult, timeoutResult]);
  } finally {
    clearTimeout(timeoutId);
  }
}

function downloadSucceeded(result) {
  return Boolean(result?.data) && !result?.error;
}

export async function downloadProtectedAssetWithRetry({
  download,
  refreshSession,
  isCurrent = () => true,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}) {
  const firstResult = await attemptDownload(download, timeoutMs);
  if (!isCurrent()) {
    return { data: null, error: null, session: null, cancelled: true, attempts: 1 };
  }
  if (downloadSucceeded(firstResult)) {
    return { ...firstResult, session: null, cancelled: false, attempts: 1 };
  }

  let refreshedSession = null;
  const refreshResult = await attemptSessionRefresh(refreshSession, timeoutMs);
  refreshedSession = refreshResult?.data?.session || null;
  if (!isCurrent()) {
    return { data: null, error: null, session: refreshedSession, cancelled: true, attempts: 1 };
  }

  const secondResult = await attemptDownload(download, timeoutMs);
  if (!isCurrent()) {
    return { data: null, error: null, session: refreshedSession, cancelled: true, attempts: 2 };
  }
  return {
    ...secondResult,
    session: refreshedSession,
    cancelled: false,
    attempts: 2,
  };
}
