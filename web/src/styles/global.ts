import { createGlobalStyle } from 'styled-components';
import { colors, spacing } from './variables';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${colors.background};
    color: ${colors.text};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
  }

  input, textarea, select {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Mobile-first responsive */
  @media (max-width: 640px) {
    html {
      font-size: 14px;
    }
  }

  /* Smooth scrolling */
  scroll-behavior: smooth;
`;
