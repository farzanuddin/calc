import { computed, type ComputedRef } from 'vue';
import { buttons } from '../config/calculator';
import { baseKeyClasses } from '../ui/calculatorTheme';
import type { Button } from '../types/calculator';
import type {
  ButtonVariant,
  DecoratedButton,
  ThemeClasses,
} from '../types/calculator-ui';

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

export const useDecoratedButtons = (
  currentTheme: ComputedRef<ThemeClasses>
) => {
  const decoratedButtons = computed<DecoratedButton[]>(() =>
    buttons.map((btn) => ({
      ...btn,
      classes: [
        baseKeyClasses,
        currentTheme.value.buttonVariants[getButtonVariant(btn)],
      ],
    }))
  );

  return {
    decoratedButtons,
  };
};
