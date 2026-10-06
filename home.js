// Native controls remain available without JavaScript; the full gallery is separate.
document.querySelectorAll("[data-home-video]").forEach((video) => {
  const fallback = video.parentElement.querySelector(".media-fallback");
  const showFallback = () => {
    if (fallback) fallback.hidden = false;
  };
  video.addEventListener("error", showFallback);
  video.querySelectorAll("source").forEach((source) => {
    source.addEventListener("error", showFallback);
  });
  video.addEventListener("play", () => {
    document.querySelectorAll("[data-home-video]").forEach((other) => {
      if (other !== video) other.pause();
    });
  });
});

const sceneTabs = document.querySelector(".scene-tabs");
if (sceneTabs) {
  const tabs = Array.from(sceneTabs.querySelectorAll('[role="tab"]'));
  const selectTab = (selected) => {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !active;
    });
  };
  sceneTabs.hidden = false;
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    });
  });
}
