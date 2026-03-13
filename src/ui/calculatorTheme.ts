import type { ThemeClasses, ThemeName } from '../types/calculator-ui';

export const baseKeyClasses =
  'h-full min-h-[clamp(64px,15vw,84px)] sm:h-[54px] sm:min-h-[54px] border border-black/10 rounded-[6px] text-[clamp(24px,7vw,34px)] sm:text-[clamp(20px,5vw,32px)] leading-none [font-family:var(--font-calc-key)] cursor-pointer transition-[transform,filter,box-shadow] duration-150 hover:brightness-110 hover:-translate-y-px active:translate-y-px';

export const darkModeToggleBaseClasses =
  'w-8 h-8 sm:w-7 sm:h-7 rounded border text-[14px] sm:text-[12px] font-bold leading-none flex items-center justify-center cursor-pointer transition-[filter,transform] duration-150 hover:brightness-110 active:translate-y-px';

const appBackground = {
  light: 'bg-[var(--color-app-surface-light)]',
  dark: 'bg-[var(--color-app-surface-dark)]',
} as const;

const toggleSurface = {
  light:
    'border-black/15 bg-[var(--color-key-function-light)] text-[var(--color-key-function-text-light)] shadow-[var(--shadow-key-function-light)]',
  dark: 'border-[var(--color-toggle-border-dark)] bg-[var(--color-toggle-surface-dark)] text-[var(--color-toggle-text-dark)]',
} as const;

const calculatorShell = {
  light: 'bg-[var(--color-calculator-shell-light)]',
  dark: 'bg-[var(--color-calculator-shell-dark)]',
} as const;

const calculatorBody = {
  light: 'bg-[var(--color-calculator-body-light)]',
  dark: 'bg-[var(--color-calculator-body-dark)]',
} as const;

const displayFrame = {
  light: 'bg-[var(--color-display-frame-light)]',
  dark: 'bg-[var(--color-display-frame-dark)]',
} as const;

const displayFrameShadow = {
  light: 'shadow-[var(--shadow-display-frame-light)]',
  dark: 'shadow-[var(--shadow-display-frame-dark)]',
} as const;

const buttonSurface = {
  light: {
    neutral:
      'bg-[var(--color-key-neutral-light)] text-[var(--color-key-neutral-text-light)]',
    function:
      'bg-[var(--color-key-function-light)] text-[var(--color-key-function-text-light)]',
    operator:
      'bg-[var(--color-key-operator-light)] text-[var(--color-key-operator-text-light)]',
    equals:
      'bg-[var(--color-key-operator-light)] text-[var(--color-key-operator-text-light)]',
  },
  dark: {
    neutral:
      'bg-[var(--color-key-neutral-dark)] text-[var(--color-key-neutral-text-dark)]',
    function:
      'bg-[var(--color-key-function-dark)] text-[var(--color-key-function-text-dark)]',
    operator:
      'bg-[var(--color-key-operator-dark)] text-[var(--color-key-operator-text-dark)]',
    equals:
      'bg-[var(--color-key-operator-dark)] text-[var(--color-key-operator-text-dark)]',
  },
} as const;

const buttonShadow = {
  light: {
    neutral: 'shadow-[var(--shadow-key-neutral-light)]',
    function: 'shadow-[var(--shadow-key-function-light)]',
    operator: 'shadow-[var(--shadow-key-operator-light)]',
    equals: 'shadow-[var(--shadow-key-operator-light)]',
  },
  dark: {
    neutral: 'shadow-[var(--shadow-key-neutral-dark)]',
    function: 'shadow-[var(--shadow-key-function-dark)]',
    operator: 'shadow-[var(--shadow-key-operator-dark)]',
    equals: 'shadow-[var(--shadow-key-operator-dark)]',
  },
} as const;

export const themeClasses: Record<ThemeName, ThemeClasses> = {
  light: {
    app: appBackground.light,
    toggle: toggleSurface.light,
    shell: calculatorShell.light,
    body: calculatorBody.light,
    displayFrame: `${displayFrame.light} ${displayFrameShadow.light}`,
    buttonVariants: {
      neutral: `${buttonSurface.light.neutral} ${buttonShadow.light.neutral}`,
      function: `${buttonSurface.light.function} ${buttonShadow.light.function}`,
      operator: `${buttonSurface.light.operator} ${buttonShadow.light.operator}`,
      equals: `${buttonSurface.light.equals} ${buttonShadow.light.equals}`,
    },
  },
  dark: {
    app: appBackground.dark,
    toggle: toggleSurface.dark,
    shell: calculatorShell.dark,
    body: calculatorBody.dark,
    displayFrame: `${displayFrame.dark} ${displayFrameShadow.dark}`,
    buttonVariants: {
      neutral: `${buttonSurface.dark.neutral} ${buttonShadow.dark.neutral}`,
      function: `${buttonSurface.dark.function} ${buttonShadow.dark.function}`,
      operator: `${buttonSurface.dark.operator} ${buttonShadow.dark.operator}`,
      equals: `${buttonSurface.dark.equals} ${buttonShadow.dark.equals}`,
    },
  },
};
