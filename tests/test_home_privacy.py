import importlib.util
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("site_validator", ROOT / "scripts/validate_human_eval_site.py")
validator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(validator)


class HomePrivacyTest(unittest.TestCase):
    def test_exception_is_only_the_existing_public_task_five_text(self):
        manifest = ROOT / "videos/tasks.js"
        source = manifest.read_text()
        tasks = validator.json.JSONDecoder().raw_decode(source.partition("=")[2].lstrip())[0]["tasks"]
        public_example = next(task for task in tasks if task["id"] == 5)
        another_task = next(task for task in tasks if task["id"] == 6)
        allowed = [public_example["goal"], *(option["strategy"] for option in public_example["options"])]
        unrelated = another_task["goal"] + " | unrelated private study text"
        filtered = validator.without_approved_home_example("\n".join(allowed) + "\n" + unrelated, manifest)
        for phrase in allowed:
            self.assertNotIn(phrase, filtered)
        self.assertIn(unrelated, filtered)


if __name__ == "__main__":
    unittest.main()
