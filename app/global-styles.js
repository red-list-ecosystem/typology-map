import { createGlobalStyle } from 'styled-components';
// html {
//   scroll-behavior: smooth;
// }

const GlobalStyle = createGlobalStyle`


  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow-y: scroll !important;
    color: black;
  }

  body.fontLoaded {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fff;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  }

  p {
    margin: 10px 0;
  }

  a {
    color: #C60000;
    text-decoration: none;
    &:visited {
      color: #C60000;
    }
    &:hover {
      text-decoration: underline;
      color: #8D0202;
    }
    &:focus {
      text-decoration: underline;
      color: #8D0202;
      outline: 0;
    }
  }

  .rle-content a {
    font-weight: 600;
  }

  .rle-content h1,
  .rle-content h2,
  .rle-content h3,
  .rle-content h4 {
    line-height: 1.15;
  }

  .rle-caption-markdown p {
    margin: 0;
  }
  .rle-caption-markdown a {
    color: white;
  }
  .rle-iframe-feedback-form-wrapper {
    position: relative;
    overflow: hidden;
    padding-top: 166%;
  }
  .rle-iframe-feedback-form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  .rle-html .rle-content {
    font-size: 15px;
  }
  .rle-content p.lead,
  .rle-html-group .rle-content blockquote,
  .rle-html-group .rle-content blockquote p,
  .rle-html-group .rle-content > p:first-of-type {
    font-size: 20px;
  }
  .rle-html-group .rle-content blockquote {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    quotes: none;
    &:after {
      content: '';
      content: none;
    }
    &:before {
      content: '';
      content: none;
    }
  }
`;

export default GlobalStyle;
