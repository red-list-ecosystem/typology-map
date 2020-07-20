import React from 'react';
import styled from 'styled-components';

import { Box, ResponsiveContext } from 'grommet';

import ColumnMain from 'components/ColumnMain';
import ColumnMainContent from 'components/ColumnMainContent';
import ColumnAside from 'components/ColumnAside';
import TopGraphic from 'components/TopGraphic';
import TypologyContent from 'components/TypologyContent';

import { isMinSize } from 'utils/responsive';

const Styled = styled.div`
  position: relative;
  z-index: 2;
`;

export function FallbackExplore() {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled>
          <Box direction="row" fill="horizontal">
            <ColumnMain hasAside={isMinSize(size, 'large')}>
              <TopGraphic direction="row" />
              <ColumnMainContent>
                <TypologyContent />
              </ColumnMainContent>
            </ColumnMain>
            {isMinSize(size, 'large') && <ColumnAside />}
          </Box>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

export default FallbackExplore;
