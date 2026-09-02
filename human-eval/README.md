# CreativeContactBench Human Strategy Evaluation

This directory contains only the public static study interface. Protected benchmark task text and images are loaded from private Supabase Storage only after a valid Supabase Auth session exists.

## Architecture

1. An unauthenticated visitor sees only the username/password screen.
2. The participant-facing username is checked locally and mapped to the study Auth email from `config.js`.
3. Supabase Auth performs the password sign-in. The site does not compare, log, or save the entered password.
4. After authentication, the browser downloads `tasks.json` and the current task image from a pinned revision directory in the private `human-eval-assets` bucket using the authenticated session.
5. Anonymous ratings and timing are saved locally for refresh recovery. Protected task metadata, image blobs, and object URLs are not written to local storage.
6. Final submission inserts one authenticated row into `human_eval_submissions` and does not read it back.

The browser client is the pinned ESM build of `@supabase/supabase-js` v2.57.4 from jsDelivr. No Node build or backend server is required.

## Configuration

`config.js` contains only browser-safe values: the Supabase URL, publishable key, table and bucket names, participant-facing username, and mapped Auth email. The mapped email is not displayed by the participant UI.

The study password must be entered interactively. Never add it to this repository, configuration, documentation, tests, logs, or browser storage. Do not add privileged server credentials to a static site.

## Onboarding example

The worked example shown before the study is the self-contained static public image `worked-example-guide-v03.svg`.
It illustrates the v0.3 preference-first flow without loading private runtime data. It is display-only HTML content: it
is never added to the authenticated `studyTasks` array, participant LocalStorage responses, or the submission payload.

## Private asset layout

The private package lives outside this repository at:

```text
/home/gechengs/projects/vlmeval/human_eval_private_assets/
```

The researcher uploads `tasks.json` and `images/` to `revisions/<dataset-revision>/` in the existing private bucket with an authenticated, linked Supabase CLI session. Revision-specific paths make the client switch atomic and prevent old and new study assets from being mixed. Do not use privileged credentials in browser code or shell history. This repository must never contain those files.

From a trusted administrator workspace, validate the private package, confirm the linked project and private bucket, then copy only the validated files:

```bash
python /home/gechengs/projects/vlmeval/human_eval_private_assets/validate_assets.py
npx --yes supabase projects list
npx --yes supabase storage cp /home/gechengs/projects/vlmeval/human_eval_private_assets/tasks.json ss:///human-eval-assets/revisions/b14ae69caecbeb062eb60c9189ee879a2514229b/tasks.json --linked --experimental --content-type application/json
npx --yes supabase storage cp /home/gechengs/projects/vlmeval/human_eval_private_assets/images ss:///human-eval-assets/revisions/b14ae69caecbeb062eb60c9189ee879a2514229b/images --recursive --linked --experimental --content-type image/jpeg --jobs 4
```

After upload, recursively list that revision directory and confirm it contains exactly `tasks.json` plus the 67 expected images (task-01 through task-67). Never pass a service-role key on the command line.

## Local preview

From the website repository root:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:8000/human-eval/
http://127.0.0.1:8000/human-eval/?pilot=1
```

Without a valid session, only the login screen is visible and no private task request is made. When the private bucket has not yet been populated, a successful login produces a retryable protected-materials error; there is no public fallback.

## Local participant state

The browser stores only:

- random anonymous participant UUID;
- protocol and dataset revision identifiers;
- pilot flag and current task index;
- the participant's overall preference ranks and the 12 dimension ratings;
- study/task timestamps and durations;
- submission state.

Signing out clears protected task content and image object URLs from memory while leaving the anonymous answer draft recoverable on that device.

## Flexible task navigation

Participants may save a partial task, continue forward, move backward, or jump directly to any task from the task navigator. The navigator marks each task as Not started, In progress, or Complete, and the progress bar reflects completed tasks rather than the current task position. Partial preference ranks and ratings remain in the existing local participant state. Final submission is still unavailable until every study task has an overall rank for A–D and all 12 required ratings, and the submission payload remains in canonical task order.

## Validation

Run from the website repository root:

```bash
python scripts/validate_human_eval_site.py
node tests/human-eval-navigation.test.mjs
```

The validation fails if protected task assets, exact task/strategy text, pinned image hashes, or privileged credential patterns appear in the public tree. It also checks that the authenticated sign-in, private download, and INSERT-only submission paths remain present.

Human protocol v0.3 preserves canonical A/B/C/D order and the three 1–5 dimensions. It first collects a participant-entered overall preference, with rank 1 meaning most preferred and equal ranks representing genuine ties. Once all four overall ranks are present, the dimension-rating matrix is shown. Submissions store the raw ratings, grouped `overall_ranking`, and `overall_ranking_source = participant_overall_preference`; they do not store or display a ranking derived from dimension totals. The equal-weight dimension-derived ranking is computed later during analysis so it remains distinct from the participant's holistic preference. The v0.1 and v0.2 metadata remain available for provenance, and the v0.3 LocalStorage key is separate. Pilot mode continues to use task-01 through task-03 and is marked separately in submissions.
