# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-16 14:29:35 KST  
**Commit:** 7883564  
**Branch:** master

## OVERVIEW

`@mj-studio/js-util` is a TypeScript utility library with dual CJS/ESM output. Public API is manually curated in `src/index.ts`, while most behavior lives in colocated utility/test pairs under `src/`.

## STRUCTURE

```text
js-util/
|- src/
|  |- index.ts                 # only public export surface
|  |- utilities/
|  |  |- AGENTS.md             # rules for public utility work
|  |  |- *.ts / *.test.ts      # main implementation surface
|  |  |- promise/              # async-specific helpers
|  |- internal/                # non-public predicates with local tests
|  |- words.ts                 # regex source kept outside utilities/
|  |- unicodeWords.ts          # unicode-aware matcher kept outside utilities/
|- test/
|  |- vitestSetup.ts           # setup only, not test cases
|- tool/
|  |- publish.mjs              # local release automation
|- tsdown.config.ts            # build entry and formats
|- vitest.config.ts            # colocated test collection
|- package.json                # scripts and published entrypoints
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add/remove public API | `src/index.ts` | Explicit exports only; no barrel generation |
| Implement or change a utility | `src/utilities/*.ts` | Main work surface; see `src/utilities/AGENTS.md` |
| Update async helpers | `src/utilities/promise/*.ts` | Only current nested utility domain |
| Change non-public predicates | `src/internal/*.ts` | Keep internal-only helpers here |
| Change word matching | `src/words.ts`, `src/unicodeWords.ts` | Intentionally outside `utilities/` |
| Update tests | `src/**/*.test.ts` | Colocated tests are the contract |
| Test setup | `test/vitestSetup.ts` | Global setup only |
| Build or publish flow | `tsdown.config.ts`, `tool/publish.mjs` | `tsc` is typecheck-only |

## CONVENTIONS

- Root package export is `package.json` `"."` only; all public surface changes go through `src/index.ts`.
- Tests live in `src/**/*.test.ts`; `test/` is setup-only.
- `pnpm t` is the verification baseline: lint, typecheck, then Vitest coverage.
- `pnpm tsc` runs `tsc --noEmit`; production output is built by `tsdown`, not `tsc`.
- `tsconfig.json` excludes test files, so source type errors and test failures are caught by different steps.
- Lint targets `src` only through the shared `@mj-studio/eslint-config-node` preset.
- Release flow is local-script driven via `tool/publish.mjs`, not CI-driven in this checkout.

[GUIDE LIST]

### Manual Docs Sync

`README.md` and `llms.txt` are manually maintained documents in this project. They must stay aligned with `src/index.ts` exports and the real behavior in source files whenever an agent changes public code.

**Rules:**
- When a public API changes, update the source JSDoc, `README.md`, and `llms.txt` in the same task.
- Treat `src/index.ts` and the implementation files as the source of truth; documentation must match actual exports, signatures, and behavior.
- Do not introduce generator-only markers or automation-specific instructions into `README.md` or `llms.txt`.
- In `llms.txt`, `Good` examples should show realistic recommended usage, and `Bad` examples should show meaningful misuse or anti-patterns.
- Do not use fake `Bad` examples that only pass obviously invalid argument types unless that exact mistake is a real usage pitfall worth calling out.
- If a function has no meaningful `Bad` practice worth documenting, prefer omitting `Bad` over inventing noise.

**Good:**
```ts
/**
 * Returns the formatter for the given second format.
 *
 * @example
 * const formatter = SecFormat.get('mm:ss')
 * formatter(90) // Returns: '01:30'
 */
```

```md
#### `SecFormat.format(totalSeconds, type)`
Formats total seconds with the given second format.

**Good:**
Use `SecFormat.format(3661, 'hh:mm:ss')` for a one-off format call.

**Bad:**
Document a real misuse only when there is one. Do not invent a fake wrong call just to fill the section.
```

**Bad:**
```bash
git diff src/index.ts
# public API changed here, but README.md and llms.txt are left untouched
```

**When to apply:**
- When changing anything exported from `src/index.ts`.
- When editing JSDoc for a public utility or nested public callable such as `is.*`, `SecFormat.*`, or `createTimer().timeout`.

[GUIDE LIST END]

## ANTI-PATTERNS (THIS PROJECT)

- Do not modify unrelated files while solving a focused task.
- Do not add public exports anywhere except `src/index.ts`.
- Do not add new tests outside `src/**/*.test.ts`.
- Do not add new `@ts-ignore` in source; existing ignores are legacy test-only exceptions.
- Do not bypass `pnpm t` before release-oriented changes.
- Do not assume GitHub Actions or another CI workflow is the source of truth for publishing.

## UNIQUE STYLES

- `src/utilities/` is mostly flat; `promise/` is the only current subdomain split.
- `src/internal/` is a real boundary for shared predicates that should not be published.
- `words.ts` and `unicodeWords.ts` sit at `src/` root instead of `src/utilities/`.
- Tooling history is mixed: pnpm is the active command path, but Yarn artifacts still exist in the repo.

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

- No `.github/workflows` directory is present in this checkout.
- `tool/publish.mjs` patch-bumps `package.json`, stages `git add .`, commits, publishes, tags, and pushes; avoid running it from a dirty worktree unless that is intentional.
- `main`, `module`, and `exports` entry naming in `package.json` is not fully uniform; check it before changing build outputs.
- `src/utilities/` contains most of the code and tests, so changes there should remain narrowly scoped.
