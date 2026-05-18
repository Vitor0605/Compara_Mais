import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      secondary: string;
      danger: string;
      warning: string;
      background: string;
      surface: string;
      text: string;
      textLight: string;
      textLighter: string;
      border: string;
      success: string;
      error: string;
    };
  }
}
