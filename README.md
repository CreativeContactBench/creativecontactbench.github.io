# CreativeContactBench.github.io

Static GitHub Pages site for the CreativeContactBench project page.

## Edit checklist

1. Replace author, affiliation, venue, paper, code, and data links in `index.html`.
2. Replace the abstract with the final paper abstract.
3. Add a real teaser image only if you want one.
4. Update the results table and BibTeX in `index.html`.
5. Keep protected benchmark task content outside this public repository.

The password-gated study interface is in `human-eval/`. Its task metadata and images are stored in private Supabase
Storage and are fetched only after authentication. See `human-eval/README.md` for the security architecture.

## Local preview

From this directory:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
http://localhost:8000/human-eval/
```

Before review, run `python scripts/validate_human_eval_site.py`. It fails if protected task content or privileged
credential patterns are present in the public tree.

## GitHub Pages

Create a repository named `creativecontactbench.github.io` under the `CreativeContactBench` organization, push these
files to the default branch, then enable Pages from the repository settings if it is not enabled automatically.

Do not publish until the researcher has reviewed the login gate and uploaded the private study package to the private
bucket with the authenticated Supabase CLI workflow documented in `human-eval/README.md`.
