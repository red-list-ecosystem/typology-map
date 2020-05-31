import styled from 'styled-components';

export default styled.div`
  background: ${({ theme, background }) => {
    if (!background) return 'transparent';
    if (theme.global.colors[background]) {
      return theme.global.colors[background];
    }
    return background;
  }};
`;
