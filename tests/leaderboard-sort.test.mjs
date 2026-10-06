import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const script = fs.readFileSync(new URL("../leaderboard.js", import.meta.url), "utf8");

class Element {
  constructor(tag = "span", text = "") {
    this.tag = tag;
    this.text = text;
    this.childNodes = [];
    this.dataset = {};
    this.attributes = {};
    this.handlers = {};
    this.className = "";
    this.classList = { contains: (name) => this.className.split(" ").includes(name) };
  }
  get textContent() { return this.text + this.childNodes.map((node) => node.textContent).join(""); }
  set textContent(text) { this.text = text; this.childNodes = []; }
  append(...nodes) {
    for (const node of nodes) {
      if (node.parentElement) {
        const siblings = node.parentElement.childNodes;
        siblings.splice(siblings.indexOf(node), 1);
      }
      node.parentElement = this;
      this.childNodes.push(node);
    }
  }
  get rows() { return this.childNodes; }
  setAttribute(key, value) { this.attributes[key] = value; }
  removeAttribute(key) { delete this.attributes[key]; }
  addEventListener(key, fn) { this.handlers[key] = fn; }
  querySelector(selector) {
    for (const child of this.childNodes) {
      if (selector.startsWith(".") ? child.classList.contains(selector.slice(1)) : child.tag === selector) return child;
      const found = child.querySelector(selector);
      if (found) return found;
    }
    return null;
  }
}

function setup() {
  const names = ["Configuration", "Valid", "Mean tau [95% CI]", "n tau", "Strict (%)", "Inclusive (%)", "Top ties"];
  const headers = names.map((name, i) => {
    const header = new Element("th");
    header.append(new Element("span", name));
    header.dataset.sortType = i === 0 ? "text" : i === 1 ? "ratio" : "number";
    if (i === 2) header.dataset.sortDefault = "descending";
    return header;
  });
  const fixtures = [
    [["Model 10", "30/30", "0.729 [0.585, 0.856]", "30", "66.7", "66.7", "0"],
      ["Model 2", "30/30", "0.709 [0.555, 0.844]", "30", "73.3", "73.3", "1"],
      ["Model 3", "30/30", "\u22120.10 [-0.2, 0.0]", "9", "9.0", "66.7", "10"]],
    [["Partial A", "9/10", "0.401 [0.236, 0.563]", "27", "44.4", "59.3", "4"],
      ["Partial B", "26/30", "0.237 [0.025, 0.439]", "26", "46.2", "46.2", "0"],
      ["Partial C", "29/30", "0.178 [-0.062, 0.408]", "19", "13.8", "72.4", "20"]]
  ];
  const groups = fixtures.map((rows) => {
    const body = new Element("tbody");
    const label = new Element("tr", "Coverage group");
    label.className = "leaderboard-group";
    body.append(label);
    for (const values of rows) {
      const row = new Element("tr");
      row.cells = values.map((text) => new Element("td", text));
      body.append(row);
    }
    return body;
  });
  const parent = new Element("div");
  const table = { tHead: { rows: [{ cells: headers }] }, tBodies: groups, parentElement: parent };
  vm.runInNewContext(script, {
    document: { querySelector: () => table, createElement: (tag) => new Element(tag) }
  });
  return {
    headers, groups, parent,
    click: (i) => headers[i].querySelector("button").handlers.click(),
    order: (i = 0) => groups[i].rows.slice(1).map((row) => row.cells[0].textContent)
  };
}

test("default mean sorting keeps groups and source data intact", () => {
  const page = setup();
  assert.deepEqual(page.order(), ["Model 10", "Model 2", "Model 3"]);
  assert.equal(page.headers[2].attributes["aria-sort"], "descending");
  assert.ok(page.groups.every((group) => group.rows[0].className === "leaderboard-group"));
  assert.equal(page.groups[0].rows[1].cells[2].textContent, "0.729 [0.585, 0.856]");
});

test("all seven columns sort both ways numerically or alphabetically", () => {
  const expected = [
    ["Model 2", "Model 3", "Model 10"],
    ["Model 10", "Model 2", "Model 3"],
    ["Model 3", "Model 2", "Model 10"],
    ["Model 10", "Model 2", "Model 3"],
    ["Model 2", "Model 10", "Model 3"],
    ["Model 2", "Model 10", "Model 3"],
    ["Model 3", "Model 2", "Model 10"]
  ];
  const reversed = [
    ["Model 10", "Model 3", "Model 2"],
    ["Model 10", "Model 2", "Model 3"],
    ["Model 10", "Model 2", "Model 3"],
    ["Model 3", "Model 10", "Model 2"],
    ["Model 3", "Model 10", "Model 2"],
    ["Model 10", "Model 3", "Model 2"],
    ["Model 10", "Model 2", "Model 3"]
  ];
  for (let i = 0; i < 7; i++) {
    const page = setup();
    page.click(i);
    assert.deepEqual(page.order(), expected[i], `Column ${i}`);
    const first = page.headers[i].attributes["aria-sort"];
    page.click(i);
    assert.notEqual(page.headers[i].attributes["aria-sort"], first);
    assert.deepEqual(page.order(), reversed[i], `Reversed column ${i}`);
    assert.equal(page.headers.filter((header) => header.attributes["aria-sort"]).length, 1);
    assert.ok(page.headers[i].querySelector("button").title.startsWith("Sort "));
    assert.match(page.parent.textContent, /within each coverage group/);
  }
});

test("Valid compares fractions and ties retain original order after another sort", () => {
  const page = setup();
  page.click(1);
  assert.deepEqual(page.order(1), ["Partial C", "Partial A", "Partial B"]);
  page.click(1);
  assert.deepEqual(page.order(1), ["Partial B", "Partial A", "Partial C"]);
  page.click(6);
  page.click(5);
  assert.deepEqual(page.order(), ["Model 2", "Model 10", "Model 3"]);
});

test("missing numeric values stay last in either direction", () => {
  const page = setup();
  page.groups[0].rows[1].cells[4].textContent = "";
  page.click(4);
  assert.equal(page.order().at(-1), "Model 10");
  page.click(4);
  assert.equal(page.order().at(-1), "Model 10");
});

test("pages without a leaderboard remain unaffected", () => {
  assert.doesNotThrow(() => vm.runInNewContext(script, { document: { querySelector: () => null } }));
});
