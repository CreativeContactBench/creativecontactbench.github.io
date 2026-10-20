"""Verify the author-supplied October 20 leaderboard without browser dependencies."""

from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
EXPECTED = """GPT-5.6 Sol|30/30|0.729 [0.585, 0.856]|30|66.7|66.7|0
GPT-6 Astra|30/30|0.709 [0.555, 0.844]|30|73.3|73.3|1
GPT-5.5|30/30|0.667 [0.511, 0.800]|30|66.7|66.7|0
GPT-5.4|30/30|0.629 [0.503, 0.752]|30|56.7|56.7|0
Qwen3.8-27B|30/30|0.575 [0.430, 0.705]|30|60.0|60.0|0
Gemma-4-31B|30/30|0.563 [0.367, 0.733]|30|63.3|63.3|0
Qwen3-VL-8B-Instruct|30/30|0.229 [0.056, 0.395]|30|26.7|26.7|0
Phi-4-Reasoning-Vision-15B|30/30|0.229 [0.030, 0.418]|30|26.7|33.3|4
Phi-3.5-Vision|30/30|0.222 [0.056, 0.389]|30|50.0|50.0|0
Mistral-Small-3.2-24B-Instruct-2506|30/30|0.185 [−0.022, 0.381]|30|16.7|16.7|0
Gemma-3-12B|30/30|0.181 [−0.003, 0.362]|30|26.7|26.7|0
Gemma-4-E2B|30/30|0.170 [−0.067, 0.409]|27|36.7|50.0|9
Gemma-3-27B|30/30|0.149 [−0.031, 0.322]|30|16.7|16.7|0
Qwen3-VL-4B-Instruct|30/30|0.093 [−0.107, 0.293]|30|23.3|30.0|2
Gemma-3-4B|30/30|0.062 [−0.130, 0.248]|30|23.3|23.3|1
Qwen3.6-35B-A3B|26/30|0.476 [0.294, 0.634]|26|38.5|38.5|0
Gemma-4-12B|27/30|0.401 [0.236, 0.563]|27|44.4|59.3|4
Qwen3.5-9B|20/30|0.367 [0.150, 0.583]|20|40.0|40.0|0
Gemma-4-E4B|26/30|0.237 [0.025, 0.439]|26|46.2|46.2|0
Phi-4-Multimodal|29/30|0.178 [−0.062, 0.408]|19|13.8|72.4|20"""


class LeaderboardParser(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.in_table = False
        self.in_body = False
        self.cell = None
        self.rows = []
        self.groups = []
        self.highlights = []
        self.highlight = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "table" and attrs.get("class") == "leaderboard":
            self.in_table = True
        if not self.in_table:
            return
        if tag == "tbody":
            self.in_body = True
            self.groups.append((attrs.get("aria-label"), len(self.rows)))
        if tag == "tr":
            self.row = []
        if tag in ("th", "td"):
            self.cell = ""
        if tag == "strong":
            self.highlight = ""

    def handle_data(self, data):
        if self.cell is not None:
            self.cell += data
        if self.highlight is not None:
            self.highlight += data

    def handle_endtag(self, tag):
        if not self.in_table:
            return
        if tag in ("th", "td") and self.cell is not None:
            self.row.append(self.cell.strip())
            self.cell = None
        if tag == "strong":
            self.highlights.append(self.highlight)
            self.highlight = None
        if tag == "tr" and self.in_body and len(self.row) == 7:
            self.rows.append(self.row)
        if tag == "tbody":
            self.in_body = False
        if tag == "table":
            self.in_table = False


class LeaderboardTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (ROOT / "index.html").read_text()
        cls.table = LeaderboardParser(cls.html)

    def test_all_values_and_order_match_supplied_results(self):
        self.assertEqual(self.table.rows, [row.split("|") for row in EXPECTED.splitlines()])

    def test_complete_and_partial_groups(self):
        self.assertEqual(self.table.groups, [("Complete coverage", 0), ("Partial coverage", 15)])

    def test_replaced_qwen_labels_and_configuration_note(self):
        self.assertNotIn("&dagger;", self.html)
        self.assertNotIn("†", self.html)
        for row in self.table.rows:
            self.assertNotIn("BF16", row[0])
            self.assertNotIn("thinking", row[0])
        for model in ("Qwen3.8-27B", "Qwen3.6-35B-A3B", "Qwen3.5-9B"):
            self.assertIn(f"{model}: BF16, thinking enabled;", self.html)
        self.assertEqual(self.html.count('class="leaderboard-notes"'), 1)
        self.assertNotIn("(descriptive only)", self.html)
        self.assertIn("Qwen3-VL-8B-Instruct: BF16, Instruct mode;", self.html)
        self.assertIn('title="10/26 eligible valid tasks"', self.html)
        self.assertIn('title="8/20 eligible valid tasks"', self.html)

    def test_only_supplied_winners_are_bold(self):
        self.assertEqual(self.table.highlights, ["0.729", "73.3", "73.3"])

    def test_anonymous_homepage_and_accessible_table(self):
        self.assertIn("Anonymous Authors", self.html)
        for removed in ("Author One", "Institution One", "Results to be added."):
            self.assertNotIn(removed, self.html)
        self.assertNotIn('class="affiliations"', self.html)
        self.assertIn('aria-labelledby="results-title" tabindex="0"', self.html)
        self.assertEqual(self.html.count('scope="col"'), 7)
        self.assertIn('aria-describedby="leaderboard-notes"', self.html)


if __name__ == "__main__":
    unittest.main()
