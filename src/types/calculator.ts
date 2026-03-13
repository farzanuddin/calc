export type Operator = '+' | '-' | '*' | '/';

export type ButtonType =
  | 'clear'
  | 'backspace'
  | 'percent'
  | 'toggle'
  | 'operator'
  | 'number'
  | 'decimal'
  | 'equals';

type BaseButton<T extends ButtonType> = {
  label: string;
  type: T;
};

export type ClearButton = BaseButton<'clear'>;
export type BackspaceButton = BaseButton<'backspace'>;
export type PercentButton = BaseButton<'percent'>;
export type ToggleButton = BaseButton<'toggle'>;
export type NumberButton = BaseButton<'number'>;
export type DecimalButton = BaseButton<'decimal'>;
export type EqualsButton = BaseButton<'equals'>;
export type OperatorButton = BaseButton<'operator'> & { value: Operator };

export type Button =
  | ClearButton
  | BackspaceButton
  | PercentButton
  | ToggleButton
  | NumberButton
  | DecimalButton
  | EqualsButton
  | OperatorButton;
