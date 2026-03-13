import { describe, expect, it } from 'vitest';
import {
  evaluateTokens,
  formatResult,
  isOperatorToken,
  parseValue,
} from '../src/composables/calculatorCore';

describe('calculatorCore', () => {
  it('parses plain numbers', () => {
    expect(parseValue('42')).toBe(42);
    expect(parseValue('3.14')).toBe(3.14);
  });

  it('parses percentages as decimal math values', () => {
    expect(parseValue('25%')).toBe(0.25);
    expect(parseValue('-50%')).toBe(-0.5);
  });

  it('returns null for malformed input', () => {
    expect(parseValue('Error')).toBeNull();
    expect(parseValue('')).toBeNull();
  });

  it('evaluates arithmetic with operator precedence', () => {
    expect(evaluateTokens(['2', '+', '3', '*', '4'])).toBe(14);
    expect(evaluateTokens(['20', '/', '5', '+', '1'])).toBe(5);
  });

  it('supports percentage values in expressions', () => {
    expect(evaluateTokens(['100', '*', '25%'])).toBe(25);
    expect(evaluateTokens(['50%', '+', '50%'])).toBe(1);
  });

  it('throws on division by zero', () => {
    expect(() => evaluateTokens(['2', '/', '0'])).toThrow('Division by zero');
  });

  it('throws on malformed expressions', () => {
    expect(() => evaluateTokens(['2', '+'])).toThrow('Malformed expression');
    expect(() => evaluateTokens(['2', '+', 'abc'])).toThrow('Malformed number');
  });

  it('formats floating point math safely for display', () => {
    expect(formatResult(0.1 + 0.2)).toBe('0.3');
  });

  it('identifies operator tokens', () => {
    expect(isOperatorToken('+')).toBe(true);
    expect(isOperatorToken('*')).toBe(true);
    expect(isOperatorToken('2')).toBe(false);
  });
});
