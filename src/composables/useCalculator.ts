import { computed, onMounted, onUnmounted, ref } from 'vue';
import { operatorSymbols } from '../config/calculator';
import {
  evaluateTokens,
  formatResult,
  isOperatorToken,
  parseValue,
  type Token,
} from './calculatorCore.ts';
import type { Button, Operator } from '../types/calculator';

export const useCalculator = () => {
  const display = ref('0');
  const expressionTokens = ref<Token[]>([]);
  const shouldResetDisplay = ref(false);

  const isPercentDisplay = (value: string) => value.endsWith('%');

  const stripPercent = (value: string) =>
    isPercentDisplay(value) ? value.slice(0, -1) : value;

  const getParsedDisplayValue = () => parseValue(display.value);

  const resetOperationState = () => {
    expressionTokens.value = [];
  };

  const showError = () => {
    display.value = 'Error';
    resetOperationState();
    shouldResetDisplay.value = true;
  };

  const clearDisplayError = () => {
    if (display.value === '') return false;

    if (parseValue(display.value) !== null) return false;

    display.value = '0';
    shouldResetDisplay.value = false;
    return true;
  };

  const handleNumber = (num: string) => {
    if (shouldResetDisplay.value || isPercentDisplay(display.value)) {
      display.value = num;
      shouldResetDisplay.value = false;
      return;
    }

    if (display.value === '' || display.value === '0') {
      display.value = num;
      return;
    }

    display.value += num;
  };

  const handleDecimal = () => {
    if (shouldResetDisplay.value || isPercentDisplay(display.value)) {
      display.value = '0.';
      shouldResetDisplay.value = false;
      return;
    }

    if (display.value === '') {
      display.value = '0.';
      return;
    }

    if (!display.value.includes('.')) {
      display.value += '.';
    }
  };

  const handleOperator = (op: Operator) => {
    if (clearDisplayError()) {
      return;
    }

    if (display.value === '') {
      const lastIndex = expressionTokens.value.length - 1;
      if (
        lastIndex >= 0 &&
        isOperatorToken(expressionTokens.value[lastIndex])
      ) {
        expressionTokens.value[lastIndex] = op;
        shouldResetDisplay.value = true;
      }

      return;
    }

    const inputValue = getParsedDisplayValue();
    if (inputValue === null) {
      showError();
      return;
    }

    if (shouldResetDisplay.value) {
      const lastIndex = expressionTokens.value.length - 1;
      if (
        lastIndex >= 0 &&
        isOperatorToken(expressionTokens.value[lastIndex])
      ) {
        expressionTokens.value[lastIndex] = op;
      } else {
        expressionTokens.value.push(display.value, op);
      }
      return;
    }

    expressionTokens.value.push(display.value, op);
    shouldResetDisplay.value = true;
  };

  const handleEquals = () => {
    if (expressionTokens.value.length === 0) return;

    const tokens: Token[] = [...expressionTokens.value];

    if (!shouldResetDisplay.value && display.value !== '') {
      tokens.push(display.value);
    }

    const lastToken = tokens[tokens.length - 1];
    if (lastToken && isOperatorToken(lastToken)) {
      tokens.pop();
    }

    if (tokens.length === 0) {
      return;
    }

    try {
      const result = evaluateTokens(tokens);
      display.value = formatResult(result);
      resetOperationState();
      shouldResetDisplay.value = true;
    } catch {
      showError();
    }
  };

  const handleToggle = () => {
    if (display.value === '') {
      return;
    }

    const isPercent = isPercentDisplay(display.value);
    const currentValue = getParsedDisplayValue();
    if (currentValue === null) {
      clearDisplayError();
      return;
    }

    const nextValue = formatResult(currentValue * -1);
    display.value = isPercent ? `${nextValue}%` : nextValue;
  };

  const handlePercent = () => {
    if (display.value === '') {
      return;
    }

    const currentValue = getParsedDisplayValue();
    if (currentValue === null) {
      clearDisplayError();
      return;
    }

    if (isPercentDisplay(display.value)) {
      return;
    }

    display.value = `${formatResult(currentValue)}%`;
    shouldResetDisplay.value = false;
  };

  const handleClear = () => {
    display.value = '0';
    resetOperationState();
    shouldResetDisplay.value = false;
  };

  const handleBackspace = () => {
    if (clearDisplayError()) {
      return;
    }

    if (shouldResetDisplay.value) {
      const trailingOperator =
        expressionTokens.value[expressionTokens.value.length - 1];
      const trailingValue =
        expressionTokens.value[expressionTokens.value.length - 2];

      if (
        trailingOperator &&
        isOperatorToken(trailingOperator) &&
        typeof trailingValue === 'string'
      ) {
        expressionTokens.value = expressionTokens.value.slice(0, -2);
        display.value = trailingValue;
        shouldResetDisplay.value = false;
        return;
      }

      shouldResetDisplay.value = false;
    }

    if (isPercentDisplay(display.value)) {
      display.value = stripPercent(display.value) || '0';
      return;
    }

    if (display.value === '') {
      const trailingOperator =
        expressionTokens.value[expressionTokens.value.length - 1];
      const trailingValue =
        expressionTokens.value[expressionTokens.value.length - 2];

      if (
        trailingOperator &&
        isOperatorToken(trailingOperator) &&
        typeof trailingValue === 'string'
      ) {
        expressionTokens.value = expressionTokens.value.slice(0, -2);
        display.value = trailingValue;
        return;
      }

      display.value = '0';
      return;
    }

    if (display.value.length > 1) {
      display.value = display.value.slice(0, -1);
    } else if (expressionTokens.value.length > 0) {
      display.value = '';
    } else {
      display.value = '0';
    }
  };

  const handleClick = (btn: Button) => {
    switch (btn.type) {
      case 'backspace':
        handleBackspace();
        return;
      case 'percent':
        handlePercent();
        return;
      case 'number':
        handleNumber(btn.label);
        return;
      case 'decimal':
        handleDecimal();
        return;
      case 'operator':
        handleOperator(btn.value);
        return;
      case 'equals':
        handleEquals();
        return;
      case 'clear':
        handleClear();
        return;
      case 'toggle':
        handleToggle();
    }
  };

  const keyMap: Record<string, () => void> = {
    '+': () => handleOperator('+'),
    '-': () => handleOperator('-'),
    '*': () => handleOperator('*'),
    x: () => handleOperator('*'),
    X: () => handleOperator('*'),
    '/': () => handleOperator('/'),
    '%': handlePercent,
    Enter: handleEquals,
    '=': handleEquals,
    c: handleClear,
    C: handleClear,
    Escape: handleClear,
    Backspace: handleBackspace,
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
      event.preventDefault();
      handleNumber(key);
      return;
    }

    if (key === '.') {
      event.preventDefault();
      handleDecimal();
      return;
    }

    if (key in keyMap) {
      event.preventDefault();
      keyMap[key]();
    }
  };

  const operationDisplay = computed(() => {
    if (expressionTokens.value.length === 0) return '';

    return expressionTokens.value
      .map((token) =>
        isOperatorToken(token) ? (operatorSymbols[token] ?? token) : token
      )
      .join('');
  });

  const mainDisplay = computed(() => {
    if (expressionTokens.value.length === 0) {
      return display.value;
    }

    const baseExpression = operationDisplay.value;
    if (shouldResetDisplay.value) {
      return baseExpression;
    }

    return `${baseExpression}${display.value}`;
  });

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  return {
    display,
    operationDisplay,
    mainDisplay,
    handleBackspace,
    handleClick,
  };
};
