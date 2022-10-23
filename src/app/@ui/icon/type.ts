import { InjectionToken } from '@angular/core';

export interface PadIconConfig {
  defaultColor: string;
  defaultSize: GroupIconSizePropertyName;
  path: string;
  sizes: GroupIconSize;
}

export enum GroupIconSizePropertyName {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
}

export type GroupIconSize = {
  [k in GroupIconSizePropertyName]: string;
} & Record<string, string>;

export const DEFAULT_CONFIG: PadIconConfig = {
  sizes: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '2.5rem',
  },
  path: 'assets/icons/',
  defaultColor: '',
  defaultSize: GroupIconSizePropertyName.lg,
};

export const PAD_ICON_CONFIG = new InjectionToken<PadIconConfig>(
  'PAD_ICON_CONFIG'
);
