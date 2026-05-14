import { buttons } from '../config/calculator';
import { baseKeyClasses } from '../ui/calculatorTheme';
import type { Button } from '../types/calculator';
import type { ButtonVariant, DecoratedButton } from '../types/calculator-ui';

const getButtonVariant = (btn: Button): ButtonVariant => {
  if (btn.type === 'equals') return 'equals';
  if (
    btn.type === 'clear' ||
    btn.type === 'backspace' ||
    btn.type === 'percent'
  ) {
    return 'function';
  }
  if (btn.type === 'operator') return 'operator';
  return 'neutral';
};

const variantClasses: Record<ButtonVariant, string> = {
  neutral:
    'bg-(--color-key-surface) text-(--color-key-text) shadow-(--shadow-key)',
  function:
    'bg-(--color-key-surface) text-(--color-key-text) shadow-(--shadow-key)',
  operator:
    'bg-(--color-key-operator-surface) text-(--color-key-operator-text) shadow-(--shadow-key-operator)',
  equals:
    'bg-(--color-key-operator-surface) text-(--color-key-operator-text) shadow-(--shadow-key-operator)',
};

export const decoratedButtons: DecoratedButton[] = buttons.map((btn) => ({
  ...btn,
  classes: [baseKeyClasses, variantClasses[getButtonVariant(btn)]],
}));
