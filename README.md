# Prompt Seismograph

A local-first experiment workbench for inspecting how model answers change under prompt perturbations. Paste a baseline answer and variants (typos, translations, misleading premises, formatting changes), define invariant checks, then inspect lexical overlap and regressions. Turkish-aware Unicode normalization is built in.

## Run

Requires Python 3 or another static HTTP server. No API keys or dependencies.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. The example demonstrates a deliberately incorrect synthetic answer; it is not a benchmark result for any real model.

## Tests

```sh
node --test test.mjs
```

Node.js 22 is recommended. The application can also be hosted as a static GitHub Pages site.

## Method and limitations

- Similarity = Jaccard overlap of unique normalized Unicode word/number tokens. It is not semantic similarity or a correctness score.
- Contains, forbids, and exact rules use Turkish-locale lowercase, Unicode NFKC and collapsed whitespace. Contains is a substring check, not a word boundary check. Rules can miss paraphrases or negation.
- A regression is a rule that passed on the baseline but fails on a variant. Baseline failures are reported separately.
- This tool does not call models or prove robustness, safety, or factual correctness. Paste outputs manually and repeat trials to account for stochasticity.
- No network requests are made by application code. Exported JSON includes the original prompts and answers, so inspect before sharing. Data is not persisted across reloads.

MIT licensed. Contributions welcome.
