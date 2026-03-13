import type { Operator } from '../types/calculator';

export type Token = string | Operator;

const precedence: Record<Operator, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
};

export const isOperatorToken = (token: Token): token is Operator =>
  token === '+' || token === '-' || token === '*' || token === '/';

export const parseValue = (value: string): number | null => {
  const isPercentDisplay = value.endsWith('%');
  const rawValue = isPercentDisplay ? value.slice(0, -1) : value;
  const parsedValue = Number.parseFloat(rawValue);

  if (!Number.isFinite(parsedValue)) {
    return null;
  }

  return isPercentDisplay ? parsedValue / 100 : parsedValue;
};

export const formatResult = (result: number): string =>
  Number.parseFloat(result.toPrecision(12)).toString();

const calculate = (left: number, right: number, op: Operator): number => {
  switch (op) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      if (right === 0) {
        throw new Error('Division by zero');
      }
      return left / right;
  }
};

export const evaluateTokens = (tokens: Token[]): number => {
  const values: number[] = [];
  const ops: Operator[] = [];

  const applyTopOperator = () => {
    const op = ops.pop();
    const right = values.pop();
    const left = values.pop();

    if (!op || right === undefined || left === undefined) {
      throw new Error('Malformed expression');
    }

    values.push(calculate(left, right, op));
  };

  for (const token of tokens) {
    if (!isOperatorToken(token)) {
      const value = parseValue(token);
      if (value === null) {
        throw new Error('Malformed number');
      }

      values.push(value);
      continue;
    }

    while (
      ops.length > 0 &&
      precedence[ops[ops.length - 1]] >= precedence[token]
    ) {
      applyTopOperator();
    }

    ops.push(token);
  }

  while (ops.length > 0) {
    applyTopOperator();
  }

  if (values.length !== 1) {
    throw new Error('Malformed expression');
  }

  return values[0];
};
