# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-16 22:23:42 KST  
**Commit:** 9fe692f  
**Branch:** master

## OVERVIEW

`@mj-studio/js-util` is a TypeScript utility library with dual ESM/CJS output. Public API is centralized in `src/index.ts`, and unit tests are colocated with each utility implementation.

## STRUCTURE

```text
js-util/
|- src/
|  |- index.ts              # single public export surface
|  |- utilities/            # utility implementations + colocated tests
|  |  |- promise/           # async helpers
|  |- internal/             # non-exported internal predicates
|  |- words.ts              # word pattern source
|  |- unicodeWords.ts       # unicode-aware word matcher
|- test/
|  |- vitestSetup.ts        # vitest global setup hook
|- tool/
|  |- publish.mjs           # patch bump + build + publish flow
|- tsdown.config.ts         # cjs/esm + d.ts build config
|- vitest.config.ts         # test and coverage config
|- eslint.config.ts         # shared eslint profile entry
|- tsconfig.json            # TypeScript compile config
|- package.json             # scripts and package entrypoints
```

## WHERE TO LOOK

| Task                      | Location                           | Notes                                     |
| ------------------------- | ---------------------------------- | ----------------------------------------- |
| Add/remove package API    | `src/index.ts`                     | Explicit export list, no auto barrel      |
| Implement utility         | `src/utilities/<name>.ts`          | One utility per file pattern              |
| Update utility tests      | `src/utilities/<name>.test.ts`     | Colocated contract tests                  |
| Reuse internal predicates | `src/internal/*.ts`                | Internal only, not root-exported          |
| Promise helper changes    | `src/utilities/promise/*.ts`       | Isolated async utility area               |
| Build/output behavior     | `tsdown.config.ts`, `package.json` | Entry is `src/index.ts`                   |
| Release flow              | `tool/publish.mjs`                 | Runs verify/build/commit/publish/tag/push |

## CONVENTIONS

- Unit tests live under `src/**/*.test.ts`; `test/` is setup-only.
- Public API changes must be wired through `src/index.ts`.
- Utility modules are usually `function file + matching test file` pairs.
- Lint config is inherited from `@mj-studio/eslint-config-node`.
- Verification baseline for release is `pnpm t` then `pnpm build`.

## ANTI-PATTERNS (THIS PROJECT)

- Do not modify unrelated code while solving a focused task (`CONTRIBUTING.md`).
- Do not expose new API without adding/removing explicit export in `src/index.ts`.
- Do not place new unit tests outside colocated `src/**` test files (except global setup).
- Do not add new `@ts-ignore` in source; legacy ignores are confined to some tests.
- Do not bypass `pnpm t` in release workflow.

## UNIQUE STYLES

- Utility-heavy layout: many narrow functions, small files, broad edge-case tests.
- Colocated tests are the primary behavior contract source.
- `src/internal` centralizes shared predicate helpers for object/type utilities.
- Release automation is script-first (`tool/publish.mjs`) rather than CI workflow driven.

## COMMANDS

```bash
pnpm lint
pnpm tsc
pnpm test
pnpm t
pnpm build
pnpm release
```

## NOTES

- `.github/workflows` is absent in this checkout; release is local script driven.
- Package uses `"type": "module"` with conditional `require`/`import` exports.
- `src/utilities` is the primary change surface; review matching tests for behavior shifts.
