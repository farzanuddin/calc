# Calc

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

A simple, keyboard-accessible calculator built with Vue 3 and TypeScript. Supports simple arithmetic operations, a light and dark theme and responsive mobile layout.

https://farzanuddin.github.io/calc/

![Demo](https://raw.githubusercontent.com/farzanuddin/calc/main/.github/assets/screen-recording.gif)

## Objective

This project was built as a hands-on exploration of two things: getting back up to speed with Vue after not having used it for a while, and evaluating the newly released Vite 8 — specifically how [Rolldown](https://rolldown.rs/) works as its bundler under the hood. Rolldown replaces the previous Rollup-based pipeline with a Rust-native bundler, and a small but real project felt like the right way to observe its build performance and output characteristics in practice.

## Features

- **Basic arithmetic** — addition, subtraction, multiplication, division, and percentage
- **Chained operations** — apply multiple operators in sequence without pressing equals
- **Sign toggle** — flip the sign of the current value with `±`
- **Light/dark mode** — theme persisted to `localStorage`, with automatic detection of system preference on first load
- **Keyboard support** — full keyboard input for digits, operators, Enter, Backspace, and Escape
- **Haptic feedback** — optional vibration on button press on some mobile devices
- **Error handling** — gracefully catches division by zero and malformed states
- **Responsive layout** — fills the full screen on mobile with comfortable padding; fixed width on desktop

## Why This Approach

**Composables over a monolithic component** — Logic is extracted into focused composables (`useCalculator`, `useThemePreference`, etc.) rather than kept in a single large `App.vue`. Each composable owns one concern, making them independently readable and testable.

**`computed` for derived state** — The active theme, rendered button classes, and main display string are `computed` properties. Vue caches these and only re-evaluates when reactive dependencies change, keeping rendering efficient without manual memoization.

**Static button config** — The button layout lives in `src/config/calculator.ts` as a plain `const`. Since it never changes at runtime, keeping it outside reactivity avoids unnecessary tracking overhead.

**Typed theme tokens** — Theme colours and class strings are defined once in `src/ui/calculatorTheme.ts` and typed via `calculator-ui.ts`. Components receive the current theme object and apply it directly, so colour is never repeated across the codebase.

**Tailwind CSS v4** — Utility classes are applied inline in templates, keeping styles co-located with markup. The v4 Vite plugin (`@tailwindcss/vite`) integrates directly into the build pipeline, so no separate PostCSS setup is required.

**Keyboard listeners on `window`** — Rather than requiring a specific element to be focused, key events are captured at the `window` level so the calculator responds immediately. The listener is removed in `onUnmounted` to prevent leaks.

**Haptics via the Vibration API** — `useHaptics` wraps `navigator.vibrate` with a feature check, so it silently does nothing on unsupported browsers.

## Getting Started

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
pnpm preview
```

## Testing

- Tests and coverage are run with **Vitest**. Run the test suite with `pnpm run test` and generate a coverage report with `pnpm exec vitest --coverage` (the project uses Vitest's v8 coverage provider).

