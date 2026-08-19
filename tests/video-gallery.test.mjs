import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "videos", "tasks.js");

function loadTasks() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(manifestPath, "utf8"), context, {
    filename: manifestPath,
  });
  return context.window.CreativeContactBenchTasks.tasks;
}

function walkMp4Files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkMp4Files(entryPath) : entryPath.endsWith(".mp4") ? [entryPath] : [];
  });
}

test("homepage links to both public videos and the gated human evaluation", () => {
  const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.match(homepage, /href="\.\/videos\/"/);
  assert.match(homepage, /href="\.\/human-eval\/"/);
});

test("public gallery contains every manifest-referenced video exactly once", () => {
  const tasks = loadTasks();
  assert.deepEqual(
    Array.from(tasks, (task) => task.id),
    Array.from({ length: 19 }, (_, index) => index + 1),
  );

  const referenced = Array.from(tasks)
    .flatMap((task) => Array.from(task.options))
    .filter((option) => option.videoStatus === "available")
    .map((option) => option.video);
  assert.equal(referenced.length, 72);
  assert.equal(new Set(referenced).size, referenced.length);

  const videoRoot = path.join(root, "videos", "optimized");
  const actual = walkMp4Files(videoRoot).map((file) => path.relative(videoRoot, file).split(path.sep).join("/"));
  assert.deepEqual(actual.sort(), referenced.sort());

  for (const relativePath of actual) {
    const size = fs.statSync(path.join(videoRoot, relativePath)).size;
    assert.ok(size > 0, `${relativePath} must not be empty`);
    assert.ok(size < 100 * 1024 * 1024, `${relativePath} exceeds GitHub's per-file limit`);
  }
});
