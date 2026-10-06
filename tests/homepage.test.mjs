import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "videos/tasks.js"), "utf8"), context);
const tasks = context.window.CreativeContactBenchTasks.tasks;

test("homepage shows the full RGB poster instead of the twelve-image mosaic", () => {
  const figure = html.match(/<figure class="scene-overview">([\s\S]*?)<\/figure>/)[1];
  assert.equal((figure.match(/<img\b/g) || []).length, 1);
  assert.match(figure, /creativecontactbench-rgb-poster-overlay\.png/);
  assert.match(figure, /width="3840" height="1728"/);
  assert.doesNotMatch(html, /scene-mosaic/);
});

test("homepage preserves all four canonical Task 5 operations", () => {
  const task = tasks.find((item) => item.id === 5);
  for (const option of task.options) assert.ok(html.includes(option.strategy), option.label);
  assert.ok(html.includes(task.goal));
  assert.ok(html.includes("./videos/task.html?id=task-5"));
});

test("homepage contains no placeholders or outbound identity links", () => {
  assert.ok(html.includes("Anonymous Authors"));
  assert.doesNotMatch(html, /to be added|Author One|Institution One|BibTeX|href="#"/i);
  assert.doesNotMatch(html, /(?:src|href)="(?:https?:|\/\/|mailto:)/i);
  assert.doesNotMatch(html, /<iframe|<form|supabase|participant_id/i);
});

test("homepage references existing local media and anchors", () => {
  const ids = new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => match[1]));
  for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
    const url = match[1];
    if (url.startsWith("data:")) continue;
    if (url.startsWith("#")) {
      assert.ok(ids.has(url.slice(1)), url);
      continue;
    }
    assert.ok(fs.existsSync(path.join(root, url.split(/[?#]/)[0])), url);
  }
});

test("homepage omits the subtitle and overview section", () => {
  assert.doesNotMatch(html, /class="subtitle"|id="overview"|href="#overview"|overview-title|overview-film/);
  assert.doesNotMatch(html, /Recognizing useful, non-obvious, and physically feasible manipulation strategies\./);
  assert.ok(html.includes('class="skip-link" href="#project-video"'));
  assert.doesNotMatch(html, /Video overview|overview-20261004\.mp4|overview-video-cover\.jpg/);
  assert.equal(fs.existsSync(path.join(root, "assets/video/creativecontactbench-overview-20261004.mp4")), false);
});

test("latest full video follows the RGB poster without extra introductory copy", () => {
  assert.doesNotMatch(html, /A selection of benchmark scenes/);
  assert.match(html, /class="scene-overview">[\s\S]*?<\/figure>\s*<figure class="project-film" id="project-video">/);
  assert.match(html, /src="\.\/assets\/video\/CCB_sup_v5\.mp4"/);
});

test("homepage videos use native controls without autoplay or strategy sources", () => {
  const videos = Array.from(html.matchAll(/<video\b([^>]*)>/g), (match) => match[1]);
  assert.equal(videos.length, 2);
  for (const attrs of videos) {
    assert.match(attrs, /preload="none"/);
    assert.match(attrs, /\bcontrols\b/);
    assert.match(attrs, /\bplaysinline\b/);
    assert.doesNotMatch(attrs, /\bautoplay\b/);
  }
  assert.doesNotMatch(html, /optimized\/Task|<script[^>]+tasks\.js/);
});

test("hardware counts reflect the public inventory, not the candidate count", () => {
  const recordings = tasks.flatMap((task) => Array.from(task.options))
    .filter((option) => option.videoStatus === "available");
  assert.equal(recordings.length, 72);
  assert.equal(tasks.length, 19);
  assert.ok(html.includes("72 recorded demonstrations across 19 tasks"));
  assert.doesNotMatch(html, /76.*demonstrations/);
});
