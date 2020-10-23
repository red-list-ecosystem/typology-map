import styled from 'styled-components';

// prettier-ignore
export default styled.h2`
  font-family: Kanit, Arial, sans-serif;
  font-weight: 500;
  font-size: ${({ theme }) => theme.text.xlarge.size};
  line-height: 30px;
  margin: ${({ aside }) => (aside ? 35 : 40)}px 0 14px 0;
  position: relative;
  &::before {
    content: ' ';
    position: absolute;
    top: -${({ aside }) => (aside ? 15 : 20)}px;
    left: 1px;
    border-bottom: ${({ aside }) => (aside ? 6 : 7)}px solid black;
    width: ${({ aside }) => (aside ? 30 : 40)}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    margin-bottom: 20px;
    font-size: ${({ theme, aside }) =>
    theme.text[aside ? 'xlarge' : 'xxlarge'].size};
    line-height: ${({ theme, aside }) =>
    theme.text[aside ? 'xlarge' : 'xxlarge'].height};
  }
`;
