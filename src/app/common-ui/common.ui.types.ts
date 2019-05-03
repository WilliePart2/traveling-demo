export const enum TJustifyTypes {
  CENTER = 'center',
  START = 'start',
  END = 'end',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around'
}

export const enum TAlignTypes {
  START = 'start',
  END = 'end',
  CENTER = 'center',
  BASELINE = 'baseline'
}

export interface IFormComponent {
  isValid: boolean;
  reset(): void;
}
