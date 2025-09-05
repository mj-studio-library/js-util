# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project is MJ Studio's JavaScript utilities library. Written in TypeScript, it provides various utility functions useful for JavaScript development.

## Essential Commands

### Development Commands
- `pnpm t` - Complete check (lint + typecheck + test with coverage)
- `pnpm lint` - Run ESLint
- `pnpm test` - Run Vitest tests
- `pnpm build` - Build library with TSDX
- `pnpm release` - Publish package (runs zx tool/publish.mjs)

### Type Checking
- `pnpm tsc` - TypeScript compiler check (included in `t` script from package.json)

## Architecture

### Project Structure
- `src/` - All source code
  - `src/utilities/` - Individual utility functions (separated by function)
  - `src/internal/` - Internal helper functions and shared utilities
  - `src/index.ts` - Entry point for all public APIs
- `test/` - Vitest configuration files
- `tool/` - Build and publish tools

### Code Organization
- Each utility function is organized as individual files in `src/utilities/` directory
- Internal helper functions are organized in `src/internal/` directory
- Each function has corresponding `.test.ts` file (in same directory)
- All public APIs are explicitly exported from `src/index.ts`
- TypeScript configuration: ESNext target, source maps generation, declaration files generation

### Build System
- **TSDX**: Library build tool (optimized for TypeScript libraries)
- **Output**: Dual package - CommonJS (`dist/index.cjs`) + ESM (`dist/index.js`)
- **Types**: Type definitions generated as `dist/index.d.ts` and `dist/index.d.cts`

### Testing Framework
- **Vitest**: Modern testing framework with native TypeScript support
- **Coverage**: Test coverage included
- **Setup**: Initial setup in `test/vitestSetup.ts`

### Code Standards
- ESLint: Using `@mj-studio/eslint-config-node` configuration
- TypeScript: Fixed to version 5.3.3
- Prettier: Code formatting
- 2-space indentation, same-line opening braces rule

## Development Guidelines

### Adding New Utilities
1. Create new `.ts` file in `src/utilities/`
2. Write JSDoc documentation for all exported functions
3. Write tests in `.test.ts` file with same name
4. Add export to `src/index.ts`
5. **Update README.md table** - Add new function to the API Reference table with appropriate category, function signature, and description
6. Use named exports (avoid default exports)
7. Prefer object parameters and destructuring assignment

### JSDoc Documentation Standards
All exported utility functions must include JSDoc comments with:
- Function description explaining what it does
- `@param` tags for all parameters with types and descriptions
- `@returns` tag describing the return value
- `@example` tags with practical usage examples (at least 1-2 examples)

Example format:
```typescript
/**
 * Converts a snake_case or kebab-case string to camelCase
 *
 * @param str - The string to convert to camelCase
 * @returns The converted camelCase string
 *
 * @example
 * camelCase('user_name') // Returns: 'userName'
 * camelCase('user-name') // Returns: 'userName'
 */
export function camelCase(str: string): string {
  // implementation
}
```

### Testing Requirements
- Tests are mandatory for all new utilities
- Use `pnpm t` command for complete validation
- Do not commit if tests fail

### Publishing
- Use `pnpm release` command
- Automated publishing process (`tool/publish.mjs`)
- Version management is automated