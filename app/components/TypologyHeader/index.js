/**
 *
 * TypologyHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'containers/Breadcrumb';
import NavAncestor from 'components/NavAncestor';
import IconRealm from 'components/IconRealm';
import styled from 'styled-components';
import { Box } from 'grommet';

const Styled = styled(Box)``;
const TitleWrap = styled.h1`
  margin-bottom: ${({ theme }) => theme.global.edgeSize.medium};
  margin-top: ${({ theme }) => theme.global.edgeSize.small};
  line-height: 1.25em;
  font-size: ${({ theme }) => theme.text.xxlarge.size};
`;

const Id = styled.span`
  margin-right: ${({ theme }) => theme.global.edgeSize.small};
  color: ${({ theme }) => theme.global.colors['dark-grey']};
`;
const Title = styled.span``;

const IconWrap = styled(p => <Box {...p} />)`
  margin-bottom: ${({ theme }) => theme.global.edgeSize.small};
`;

function TypologyHeader({ typology, ancestors, locale }) {
  return (
    <Styled>
      <IconWrap>
        <IconRealm realmId={ancestors ? ancestors[0].id : typology.id} />
      </IconWrap>
      <Breadcrumb
        level={ancestors ? ancestors.length : 0}
        targets={ancestors ? ancestors.map(a => a.nav) : []}
      />
      <TitleWrap>
        <Id>{typology.id}</Id>
        <Title>{typology.title[locale]}</Title>
      </TitleWrap>
      {ancestors &&
        ancestors.map(a => (
          <NavAncestor
            key={a.id}
            type={a.typologyType}
            onClick={() => a.nav()}
            id={a.id}
            name={a.title[locale]}
          />
        ))}
    </Styled>
  );
}

TypologyHeader.propTypes = {
  typology: PropTypes.object,
  ancestors: PropTypes.array,
  locale: PropTypes.string,
};

export default TypologyHeader;
