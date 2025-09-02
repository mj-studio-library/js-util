# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

이 프로젝트는 MJ Studio의 JavaScript 유틸리티 라이브러리입니다. TypeScript로 작성되어 있으며, 다양한 JavaScript 개발에 유용한 유틸리티 함수들을 제공합니다.

## Essential Commands

### Development Commands
- `yarn t` - 전체 체크 (lint + typecheck + test with coverage)
- `yarn lint` - ESLint 실행
- `yarn test` - Jest 테스트 실행
- `yarn build` - TSDX로 라이브러리 빌드
- `yarn release` - 패키지 퍼블리시 (zx tool/publish.mjs 실행)

### Type Checking
- `yarn tsc` - TypeScript 컴파일러 체크 (package.json의 `t` 스크립트에 포함)

## Architecture

### Project Structure
- `src/` - 모든 소스 코드
  - `src/internal/` - 개별 유틸리티 함수들 (각 함수별 파일 분리)
  - `src/internal/promise/` - Promise 관련 유틸리티들
  - `src/index.ts` - 모든 공개 API의 진입점
- `test/` - Jest 설정 파일들
- `tool/` - 빌드 및 퍼블리시 도구들

### Code Organization
- 각 유틸리티 함수는 `src/internal/` 디렉토리에 개별 파일로 구성
- 각 함수는 대응하는 `.test.ts` 파일 보유 (동일 디렉토리 내)
- `src/index.ts`에서 모든 공개 API를 명시적으로 export
- TypeScript 설정: ESNext 타겟, 소스맵 생성, declaration 파일 생성

### Build System
- **TSDX**: 라이브러리 빌드 도구 (TypeScript 라이브러리 최적화)
- **Output**: CommonJS (`dist/index.js`) + ESM (`dist/js-util.esm.js`) 듀얼 패키지
- **Types**: `dist/index.d.ts`로 타입 정의 생성

### Testing Framework
- **Jest**: ts-jest 프리셋 사용
- **Coverage**: 테스트 커버리지 포함
- **Setup**: `test/jestSetup.ts`에서 초기 설정

### Code Standards
- ESLint: `@mj-studio/eslint-config-node` 설정 사용
- TypeScript: 5.3.3 버전 고정
- Prettier: 코드 포맷팅
- 2칸 들여쓰기, 같은 줄 중괄호 열기 규칙

## Development Guidelines

### Adding New Utilities
1. `src/internal/`에 새로운 `.ts` 파일 생성
2. 동일한 이름의 `.test.ts` 파일로 테스트 작성
3. `src/index.ts`에 export 추가
4. 함수는 named export 사용 (default export 지양)
5. 객체 매개변수와 구조 분해 할당 선호

### Testing Requirements
- 모든 새로운 유틸리티에는 테스트 필수
- `yarn t` 명령어로 전체 검증 수행
- 테스트 실패 시 커밋 금지

### Publishing
- `yarn release` 명령어 사용
- 자동화된 퍼블리시 프로세스 (`tool/publish.mjs`)
- 버전 관리는 자동화되어 있음