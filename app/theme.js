// theme defining breakpoints, colors, sizes, grid gutters
export const sizes = {};
export const breakpoints = {
  small: {
    min: 0,
    max: 720, // inclusive
    name: 'mobile',
    index: 0,
  },
  medium: {
    min: 721,
    max: 992,
    name: 'tablet (portrait)',
    index: 1,
  },
  large: {
    min: 993,
    max: 1152,
    name: 'laptop/tablet (landscape)',
    index: 2,
  },
  xlarge: {
    min: 1153,
    max: 1728,
    name: 'desktop',
    index: 3,
  },
  xxlarge: {
    min: 1729,
    max: 99999999,
    name: 'large desktop',
    index: 4,
  },
};

// grommet text
const text = {
  xxsmall: { size: '12px', height: '14px', maxWidth: '500px' },
  xsmall: { size: '13px', height: '16px', maxWidth: '600px' },
  small: { size: '14px', height: '18px', maxWidth: '700px' },
  medium: { size: '16px', height: '21px', maxWidth: '800px' },
  large: { size: '18px', height: '24px', maxWidth: '800px' },
  xlarge: { size: '22px', height: '30px', maxWidth: '800px' },
  xxlarge: { size: '30px', height: '36px', maxWidth: '800px' },
  xxxlarge: { size: '60px', height: '75px', maxWidth: '800px' },
};
// grommet paddings and margins
const edgeSize = {
  hair: '1px',
  xxsmall: '3px',
  xsmall: '6px',
  small: '12px',
  ms: '16px',
  medium: '24px',
  ml: '36px',
  large: '48px',
  xlarge: '64px',
  xxlarge: '100px',
};
// grommet icon size
const icon = {
  size: {
    small: '14px',
    medium: '17px',
    large: '20px',
    xlarge: '24px',
    xxlarge: '32px',
  },
};

const theme = {
  sizes,
  breakpoints: {
    min: {
      small: `${breakpoints.small.min}px`,
      medium: `${breakpoints.medium.min}px`,
      large: `${breakpoints.large.min}px`,
      xlarge: `${breakpoints.xlarge.min}px`,
      xxlarge: `${breakpoints.xxlarge.min}px`,
    },
    max: {
      small: `${breakpoints.small.max}px`,
      medium: `${breakpoints.medium.max}px`,
      large: `${breakpoints.large.max}px`,
      xlarge: `${breakpoints.xlarge.max}px`,
      xxlarge: `${breakpoints.xxlarge.max}px`,
    },
  },
  // used for grommet
  icon,
  text,
  paragraph: text,
  global: {
    // margins & paddings
    edgeSize,
    font: {
      // family: 'Source Sans Pro',
      height: '22px',
      size: '16px',
    },
    colors: {
      black: '#000000',
      white: '#ffffff',
      text: {
        dark: '#ffffff', // on dark background
        light: '#000000', // on light background
      },
      border: {
        dark: '#ffffff', // on dark background
        light: '#dddddd', // on light background
      },
    },
    input: {
      padding: '2px',
      weight: 400,
    },
    breakpoints: {
      small: {
        value: breakpoints.small.max,
      },
      medium: {
        value: breakpoints.medium.max,
      },
      large: {
        value: breakpoints.large.max,
      },
      xlarge: {
        value: breakpoints.xlarge.max,
      },
      xxlarge: {},
    },
  },
};

export default theme;
