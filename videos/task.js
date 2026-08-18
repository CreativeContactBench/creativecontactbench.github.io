(function () {
  const { tasks } = window.CreativeContactBenchTasks;
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id") || "task-1";
  const task =
    tasks.find((item) => item.slug === requestedId || String(item.id) === requestedId) || tasks[0];
  const taskIndex = tasks.findIndex((item) => item.slug === task.slug);

  function show(element, visible) {
    if (element) element.hidden = !visible;
  }

  function setText(selector, text) {
    const element = document.querySelector(selector);
    if (element) element.textContent = text || "";
  }

  function hasMetadata(video) {
    return video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0;
  }

  async function serverSupportsRange(src) {
    try {
      const response = await fetch(src, {
        method: "HEAD",
        headers: { Range: "bytes=0-1" },
      });
      return response.status === 206 || response.headers.get("accept-ranges") === "bytes";
    } catch (error) {
      return true;
    }
  }

  function primeVideoMetadata(video, src) {
    requestAnimationFrame(() => video.load());

    window.setTimeout(async () => {
      if (hasMetadata(video) || video.dataset.fallbackAttempted === "true") return;
      video.dataset.fallbackAttempted = "true";
      if (await serverSupportsRange(src)) return;
      if (hasMetadata(video)) return;

      try {
        const response = await fetch(src);
        if (!response.ok) return;
        const blobUrl = URL.createObjectURL(await response.blob());
        video.dataset.objectUrl = blobUrl;
        video.dataset.originalSrc = src;
        video.src = blobUrl;
        video.load();
      } catch (error) {
        // The native video error UI remains the fallback if a file cannot be fetched.
      }
    }, 1800);
  }

  function webVideoPath(originalPath) {
    return `optimized/${originalPath}`;
  }

  function createVideo(option) {
    const slot = document.createElement("div");
    slot.className = "video-slot";

    if (!option.video || option.videoStatus !== "available") {
      const fallback = document.createElement("div");
      fallback.className = "video-missing";
      fallback.textContent = "Video unavailable";
      slot.append(fallback);
      return slot;
    }

    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    video.setAttribute("playsinline", "");

    const source = document.createElement("source");
    const src = new URL(webVideoPath(option.video), window.location.href).href;
    source.src = src;
    source.type = "video/mp4";

    video.append(source, document.createTextNode("Your browser does not support HTML5 video."));
    slot.append(video);
    primeVideoMetadata(video, src);
    return slot;
  }

  function renderOptions() {
    const optionGrid = document.querySelector("#option-grid");
    optionGrid.textContent = "";

    task.options.forEach((option) => {
      const card = document.createElement("article");
      card.className = "video-card option-card";
      card.dataset.option = option.label;

      const heading = document.createElement("div");
      heading.className = "option-heading";

      const letter = document.createElement("span");
      letter.className = "option-letter";
      letter.textContent = option.label;

      const title = document.createElement("span");
      title.className = "option-title";
      title.textContent = option.strategy || "";

      heading.append(letter);
      if (title.textContent) heading.append(title);
      card.append(heading, createVideo(option));

      if (option.success && option.success.trials > 0) {
        const success = document.createElement("p");
        success.className = "option-success";
        success.textContent = `Success rate: ${option.success.successes}/${option.success.trials}`;
        card.append(success);
      }

      optionGrid.append(card);
    });

    syncOptionHeadingHeights();
  }

  let headingSyncFrame;

  function syncOptionHeadingHeights() {
    window.cancelAnimationFrame(headingSyncFrame);
    headingSyncFrame = window.requestAnimationFrame(() => {
      const headings = [...document.querySelectorAll(".option-heading")];
      headings.forEach((heading) => {
        heading.style.height = "";
      });

      if (window.matchMedia("(max-width: 720px)").matches || headings.length === 0) return;

      const tallestHeading = Math.ceil(
        Math.max(...headings.map((heading) => heading.getBoundingClientRect().height)),
      );
      headings.forEach((heading) => {
        heading.style.height = `${tallestHeading}px`;
      });
    });
  }

  document.title = `${task.title} | CreativeContactBench`;
  setText("#task-number", `Task ${task.id}`);
  setText("#task-title", task.title);

  const badges = document.querySelector("#task-badges");
  const badgeValues = [task.sensorModality, ...(task.tags || [])].filter(Boolean);
  badges.textContent = "";
  badgeValues.forEach((value) => {
    const badge = document.createElement("span");
    badge.textContent = value;
    badges.append(badge);
  });
  show(badges, badgeValues.length > 0);

  const previousTask = tasks[(taskIndex - 1 + tasks.length) % tasks.length];
  const nextTask = tasks[(taskIndex + 1) % tasks.length];
  document.querySelector("#previous-task").href = `./task.html?id=${previousTask.slug}`;
  document.querySelector("#previous-task").textContent = `← Task ${previousTask.id}`;
  document.querySelector("#next-task").href = `./task.html?id=${nextTask.slug}`;
  document.querySelector("#next-task").textContent = `Task ${nextTask.id} →`;

  renderOptions();
  window.addEventListener("resize", syncOptionHeadingHeights);

  window.addEventListener("pagehide", () => {
    document.querySelectorAll("video[data-object-url]").forEach((video) => {
      URL.revokeObjectURL(video.dataset.objectUrl);
    });
  });
})();
