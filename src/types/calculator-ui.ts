import type { Button } from './calculator';

export type ButtonVariant = 'neutral' | 'function' | 'operator' | 'equals';

export type DecoratedButton = Button & { classes: string[] };
