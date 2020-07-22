import styled from 'styled-components';

export default styled.h2`
  font-size: 24px;
  line-height: 30px;
  margin: 40px 0 14px 0;
  position: relative;
  &::before {
    content: ' ';
    position: absolute;
    top: -20px;
    left: 1px;
    border-bottom: 7px solid black;
    width: 40px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    margin-bottom: 20px;
    font-size: 36px;
    line-height: 48px;
  }
`;
