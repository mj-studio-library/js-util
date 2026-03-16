# UTILITIES KNOWLEDGE BASE

**Parent:** `../../AGENTS.md`

## OVERVIEW

`src/utilities/` is the primary public implementation surface. Most work here follows a strict pair pattern: one utility module and one colocated behavior test.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add a new public utility | `src/utilities/<name>.ts` | Keep the file focused and flat |
| Add or update contract tests | `src/utilities/<name>.test.ts` | Same basename as implementation |
| Work on async helpers | `src/utilities/promise/*.ts` | Only for promise/time-based behavior |
| Change recursive JSON utilities | `filterJsonKeys.ts`, `replaceJsonKeysRecursively.ts`, `replaceJsonValuesRecursively.ts` | Higher branching than most files |
| Change time-related helpers | `SecFormat.ts`, `parseSecond.ts`, `setIntervalWithTimeout.ts`, `Timer.ts` | Prefer behavior-driven tests |
| Publish a utility | `../../src/index.ts` | Public export wiring stays at root |

## CONVENTIONS

- Default layout is flat: add new utility files directly under `src/utilities/` unless a clear subdomain boundary already exists.
- Pair every utility change with its colocated `.test.ts` file in the same directory.
- Keep shared non-public predicates in `../internal/` instead of hiding them inside utility-specific exports.
- Favor narrow files and direct implementations over reusable abstraction layers for only one or two utilities.
- Promise helpers belong in `promise/` only when the utility is fundamentally async-aware.

## ANTI-PATTERNS

- Do not add a directory-local barrel or `index.ts` under `src/utilities/`.
- Do not move utility tests into `test/` or another central test directory.
- Do not create a new subdirectory just to group a small number of unrelated helpers.
- Do not export helper-only internals from here when they should stay in `src/internal/`.

## NOTES

- The directory currently contains 36 colocated utility/test pairs plus the `promise/` subdirectory.
- Heavier files in this area include `replaceJsonValuesRecursively.ts`, `filterJsonKeys.ts`, `SecFormat.ts`, and `is.ts`.
- Existing patterns are stable; prefer matching nearby utilities over inventing new structure.
