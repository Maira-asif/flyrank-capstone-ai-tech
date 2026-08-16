# WORKFLOW.md — Prompting Drill: Vague vs. Precise

## Setup

- **Feature:** Settings form (username, email, password) with validation.
- **Round 1 prompt** (`round1-vague-prompt` branch): *"build a settings form"* — one sentence, no context, output accepted as-is.
- **Round 2 prompt** (`round2-precise-prompt` branch, fresh session from `master`): explicit field constraints (username 3-20 alphanumeric, valid email format, password 8+ chars with a number), a requirement for inline errors and accessible label/error associations, submit disabled while invalid, and a verification step — "write it, then write tests and run them."

## Correctness

Round 1 has **zero validation**. Any input — empty fields, a one-character username, `not-an-email`, a 3-character password — submits successfully and just gets logged to the console. It technically "renders a form," but it doesn't do what a settings form needs to do: stop bad data from being saved.

Round 2 enforces the actual constraints (`src/validation.js`) and I have 12 passing unit tests (`tests/validation.test.js`, run with plain `node tests/validation.test.js`, no extra dependencies) proving the rules hold: empty fields rejected, length bounds enforced, email format checked, password number requirement checked, and the combined `isFormValid` check gating the submit button.

## Accessibility

Round 1: no `<label>` elements, only placeholder text (which disappears on focus and isn't reliably read by screen readers), no error messaging at all, no `aria-*` attributes.

Round 2: every input has an associated `<label for>`, each error span is wired with `aria-describedby` on the input and `aria-live="polite"` + `role="alert"` so a screen reader announces validation errors as they appear, and `aria-invalid` toggles per field.

## Edge Cases & an AI Mistake I Caught

Writing round 2, my first version of `validation.js` ended with a bare `module.exports = {...}` so the test file could `require()` it. That's correct in Node, but the *same file* is also loaded directly in the browser via `<script src="validation.js">` in `settings-form.html` — and in a browser, `module` doesn't exist. Loading the page would have thrown `ReferenceError: module is not defined` and silently broken the whole form. I caught it by actually opening the file mentally as "what runs in two environments" and guarded it: `if (typeof module !== 'undefined' && module.exports) { ... }`. Re-ran the test suite after the fix — still 12/12 passing — so the guard didn't affect Node behavior.

Round 1 had no equivalent failure mode to catch, because it had no logic complex enough to fail — which is itself informative: a vague prompt produces code too simple to break in interesting ways, which feels safe but isn't, because "doesn't crash" and "doesn't work" are different things.

## Review Effort

Round 1 took under a minute to "accept" — but that's misleading. If I were actually shipping it, I'd then need a second pass to add every constraint and accessibility feature by hand, which is most of the real work.

Round 2 took longer up front (writing the precise prompt, waiting for tests to run) and *felt* slower in the moment. But end-to-end — prompt to a form I'd actually trust in the capstone — round 2 was faster, because the review pass was verifying against explicit, testable constraints instead of guessing what was missing. Round 1's real cost is hidden in a cleanup phase that hasn't happened yet.

## Diff Summary

`git diff round1-vague-prompt round2-precise-prompt --stat`: 4 files changed, 171 insertions, 17 deletions — `validation.js` and `tests/validation.test.js` exist only on round 2; `settings-form.html` and `settings-form.js` are substantially rewritten, not incrementally patched.
