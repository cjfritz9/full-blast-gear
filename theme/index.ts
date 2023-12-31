const defaultLightTheme = require('daisyui/src/theming/themes')[
  '[data-theme=dark]'
];

export const themes = [
  {
    light: {
      ...defaultLightTheme,
      primary: '#1D232A',
      'primary-content': '#FFFFFF',
      secondary: '#DF542E',
      'secondary-content': '#1d232a',
      accent: '#594442',
      'accent-content': '#1d232a',
      neutral: '#f4f4f4',
      'neutral-focus': '#1d232a',
      'neutral-content': '#1d232a',
      'base-100': '#FFFFFF',
      'base-200': '#f4f4f4',
      'base-300': '#301512',
      'base-content': '#1D232A',

      '--rounded-btn': '0rem',
      '--rounded-box': '0rem',
      '--rounded-badge': '0rem',
      '--tab-radius': '0rem'
    }
  }
];
