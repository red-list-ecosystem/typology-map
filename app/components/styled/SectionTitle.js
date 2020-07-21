import styled from 'styled-components';

import H2 from 'components/H2';

export default styled(H2)`
  font-size: ${({ small }) => (small ? 18 : 36)}px;
  line-height: ${({ small }) => (small ? 24 : 48)}px;
  margin: 0.25em 0;
`;
