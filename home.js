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
