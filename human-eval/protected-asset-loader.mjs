async function attemptDownload(download) {
  try {
    const result = await download();
    return result || { data: null, error: new Error("Protected asset download returned no result.") };
  } catch (error) {
    return { data: null, error };
  }
}

function downloadSucceeded(result) {
  return Boolean(result?.data) && !result?.error;
}

export async function downloadProtectedAssetWithRetry({
  download,
  refreshSession,
  isCurrent = () => true,
}) {
  const firstResult = await attemptDownload(download);
  if (!isCurrent()) {
    return { data: null, error: null, session: null, cancelled: true, attempts: 1 };
  }
  if (downloadSucceeded(firstResult)) {
    return { ...firstResult, session: null, cancelled: false, attempts: 1 };
  }

  let refreshedSession = null;
  try {
    const refreshResult = await refreshSession();
    refreshedSession = refreshResult?.data?.session || null;
  } catch {
    // A second download can still succeed after a transient refresh failure.
  }
  if (!isCurrent()) {
    return { data: null, error: null, session: refreshedSession, cancelled: true, attempts: 1 };
  }

  const secondResult = await attemptDownload(download);
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
