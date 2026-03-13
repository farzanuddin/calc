import type { Button } from './calculator';

export type ButtonVariant = 'neutral' | 'function' | 'operator' | 'equals';

export type ThemeName = 'light' | 'dark';

export type ThemeClasses = {
  app: string;
  toggle: string;
  shell: string;
  body: string;
  displayFrame: string;
  buttonVariants: Record<ButtonVariant, string>;
};

export type DecoratedButton = Button & { classes: string[] };
