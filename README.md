# CreativeContactBench.github.io

Static GitHub Pages site for the CreativeContactBench project page.

## Edit checklist

1. Keep the review homepage anonymous: no author, affiliation, personal-account, or identifying paper links.
2. Update research copy only from author-confirmed manuscript text; do not publish placeholders.
3. Keep the researcher-approved reproduction gallery under `videos/` web-ready and publicly reviewable.
4. Keep the full RGB overview poster and Task 05 example tied to the existing assets and strategy manifest.
5. Update the results table in `index.html` and its regression fixture together. Citation and unavailable resource links stay hidden during anonymous review.
6. Keep private Human Evaluation assets and participant data outside this public repository.

The public video gallery is in `videos/`. The password-gated study interface is in `human-eval/`; its separate task
package is stored in private Supabase Storage and is fetched only after authentication. See `human-eval/README.md`
for the study security architecture.

## Local preview

From this directory:

```bash
python3 scripts/range-server.py 8000
```

Then open:

```text
http://localhost:8000/
http://localhost:8000/videos/
http://localhost:8000/human-eval/
```

Before review, run `python scripts/validate_human_eval_site.py`. It verifies the complete public video inventory and
fails if private Human Evaluation assets or privileged credential patterns are present in the public tree.

The range-enabled preview supports seeking in the overview and demonstration videos. For a basic static preview,
`python3 -m http.server 8000` also works, but video seeking can be limited by its lack of byte-range support.

## Homepage Review Edition (2026-10-04)

`home.css` and `home.js` are homepage-only; the gallery and task-detail presentation are unchanged.
The page has a full RGB overview poster, a full Task 05 example, evaluation protocol, the supplied
18-configuration leaderboard, and an entry to the 19-task reproduction gallery. Homepage videos use native controls,
do not autoplay, and use `preload="none"`. They are hosted locally, without third-party video embeds or analytics.

The archived website overview is a separate 142-second edition, no longer embedded on the homepage. Its leaderboard and hardware-count title were regenerated
from the editable video project; the other scenes and the 3x/5x demonstration speeds were retained. The public
inventory has 72 recordings for 19 tasks, which is not the same as 76 possible candidate slots. The original
video projects and source recordings are preserved. The source script is in
`../video_draft/website_20261004/build_media.py`, outside the public website.

Validation:

```sh
python3 -m unittest discover -s tests -p test_leaderboard.py -v
node --test tests/homepage.test.mjs tests/video-gallery.test.mjs tests/human-eval-navigation.test.mjs
```

The supplied dagger markers remain unchanged. Their methodological footnote requires author confirmation.

## GitHub Pages

Create a repository named `creativecontactbench.github.io` under the `CreativeContactBench` organization, push these
files to the default branch, then enable Pages from the repository settings if it is not enabled automatically.

Do not publish until the researcher has reviewed the login gate and uploaded the private study package to the private
bucket with the authenticated Supabase CLI workflow documented in `human-eval/README.md`.
