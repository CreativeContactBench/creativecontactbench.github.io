(function () {
  const taskGrid = document.querySelector("#task-grid");
  const { tasks } = window.CreativeContactBenchTasks;

  function createPoster(task) {
    const frame = document.createElement("div");
    frame.className = "task-poster";

    const img = document.createElement("img");
    img.alt = `${task.title} canonical initial-state poster`;
    img.loading = "lazy";

    const fallback = document.createElement("div");
    fallback.className = "poster-fallback";
    fallback.textContent = "Poster unavailable";

    img.addEventListener("error", () => {
      img.remove();
      frame.append(fallback);
    });

    if (task.poster) {
      img.src = task.poster;
      frame.append(img);
    } else {
      frame.append(fallback);
    }

    return frame;
  }

  function render() {
    taskGrid.textContent = "";

    tasks.forEach((task) => {
      const card = document.createElement("article");
      card.className = "task-card";

      const link = document.createElement("a");
      link.href = `./task.html?id=${encodeURIComponent(task.slug)}`;
      link.setAttribute("aria-label", `View ${task.title}`);

      const body = document.createElement("div");
      body.className = "task-card-body";

      const number = document.createElement("p");
      number.className = "task-number";
      number.textContent = `Task ${task.id}`;

      const title = document.createElement("h3");
      title.textContent = task.title;

      const view = document.createElement("p");
      view.className = "view-task";
      view.textContent = "View Task";

      body.append(number, title, view);

      link.append(createPoster(task), body);
      card.append(link);
      taskGrid.append(card);
    });
  }

  render();
})();
