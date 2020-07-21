import React from 'react';
import styled from 'styled-components';

const Styled = styled.footer`
  position: relative;
`;

const FooterBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2em 0;
  background: black;
`;

function Footer() {
  return (
    <Styled>
      <FooterBar />
    </Styled>
  );
}

export default Footer;
