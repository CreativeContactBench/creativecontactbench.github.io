(() => {
  const table = document.querySelector(".leaderboard");
  if (!table) return;

  const headers = Array.from(table.tHead.rows[0].cells);
  // Keep coverage groups separate and preserve the original order for tied values.
  const groups = Array.from(table.tBodies, (body) => ({
    body,
    rows: Array.from(body.rows)
      .filter((row) => !row.classList.contains("leaderboard-group"))
      .map((row, order) => ({ row, order }))
  }));
  const valueOf = (row, column) => {
    const text = row.cells[column].textContent.trim().replace(/\u2212/g, "-");
    if (headers[column].dataset.sortType === "text") return text;
    if (headers[column].dataset.sortType === "ratio") {
      const [valid, total] = text.split("/").map(Number);
      return total > 0 ? valid / total : NaN;
    }
    return Number.parseFloat(text);
  };
  const status = document.createElement("span");
  status.className = "sort-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  table.parentElement.append(status);
  const labels = headers.map((header) => header.textContent.trim());
  let activeColumn = -1;
  let direction = "descending";

  const sort = (column, nextDirection, announce = true) => {
    activeColumn = column;
    direction = nextDirection;
    groups.forEach(({ body, rows }) => {
      const ordered = [...rows].sort((a, b) => {
        const left = valueOf(a.row, column);
        const right = valueOf(b.row, column);
        // Missing values stay at the bottom in either direction.
        if (Number.isNaN(left)) return Number.isNaN(right) ? a.order - b.order : 1;
        if (Number.isNaN(right)) return -1;
        const difference = typeof left === "string"
          ? left.localeCompare(right, "en", { numeric: true, sensitivity: "base" })
          : left - right;
        return (direction === "ascending" ? difference : -difference) || a.order - b.order;
      });
      ordered.forEach(({ row }) => body.append(row));
    });
    headers.forEach((header, index) => {
      if (index === column) header.setAttribute("aria-sort", direction);
      else header.removeAttribute("aria-sort");
      const next = index === column
        ? (direction === "ascending" ? "descending" : "ascending")
        : (header.dataset.sortType === "text" ? "ascending" : "descending");
      header.querySelector("button").title = `Sort ${labels[index]} ${next}`;
      header.querySelector(".sort-indicator").textContent = index === column
        ? (direction === "ascending" ? "\u2191" : "\u2193") : "\u2195";
    });
    if (announce) status.textContent = `${labels[column]} sorted ${direction} within each coverage group.`;
  };

  headers.forEach((header, column) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "leaderboard-sort";
    const label = document.createElement("span");
    label.append(...Array.from(header.childNodes));
    const indicator = document.createElement("span");
    indicator.className = "sort-indicator";
    indicator.setAttribute("aria-hidden", "true");
    button.append(label, indicator);
    header.append(button);
    button.addEventListener("click", () => {
      const next = column === activeColumn
        ? (direction === "descending" ? "ascending" : "descending")
        : (header.dataset.sortType === "text" ? "ascending" : "descending");
      sort(column, next);
    });
  });
  const initial = headers.findIndex((header) => header.dataset.sortDefault);
  if (initial >= 0) sort(initial, headers[initial].dataset.sortDefault, false);
})();
