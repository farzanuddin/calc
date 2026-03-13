import type { Button, Operator } from '../types/calculator';

export const operatorSymbols: Partial<Record<Operator, string>> = {
  '/': '÷',
  '*': '×',
  '-': '−',
};

export const buttons: Button[] = [
  { label: 'C', type: 'clear' },
  { label: '⌫', type: 'backspace' },
  { label: '%', type: 'percent' },
  { label: '÷', type: 'operator', value: '/' },
  { label: '7', type: 'number' },
  { label: '8', type: 'number' },
  { label: '9', type: 'number' },
  { label: '×', type: 'operator', value: '*' },
  { label: '4', type: 'number' },
  { label: '5', type: 'number' },
  { label: '6', type: 'number' },
  { label: '−', type: 'operator', value: '-' },
  { label: '1', type: 'number' },
  { label: '2', type: 'number' },
  { label: '3', type: 'number' },
  { label: '+', type: 'operator', value: '+' },
  { label: '±', type: 'toggle' },
  { label: '0', type: 'number' },
  { label: '.', type: 'decimal' },
  { label: '=', type: 'equals' },
];
