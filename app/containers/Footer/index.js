import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Button, Box, Text } from 'grommet';
import { filter } from 'lodash/collection';
import { FOOTER } from 'containers/App/constants';
import { FormattedMessage } from 'react-intl';
import { PAGES } from 'config';

import { selectRouterPath } from 'containers/App/selectors';
import { navigatePage } from 'containers/App/actions';

import commonMessages from 'messages';

const Styled = styled.footer`
  position: relative;
`;

// prettier-ignore
const FooterLink = styled(props => <Button {...props} plain />)`
  padding: ${({ theme }) => theme.global.edgeSize.small} ${({ theme }) => theme.global.edgeSize.medium};
  color: ${({ theme }) => theme.global.colors.white};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  background: transparent;
  &:hover {
    text-decoration: underline;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    padding: ${({ theme }) => theme.global.edgeSize.small};
  }
`;

const FooterBar = styled.div`
  display: flex;
  padding: 0 ${({ theme }) => theme.global.edgeSize.medium};
  background: black;
`;

const NavFooter = styled(props => (
  <Box {...props} direction="row" gap="small" />
))``;

const pagesArray = Object.keys(PAGES).map(key => ({
  key,
  ...PAGES[key],
}));

function Footer({ navPage, path }) {
  const paths = path.split('/');
  const contentType = paths[0] === '' ? paths[1] : paths[0];
  const contentId =
    paths[0] === ''
      ? paths.length > 1 && paths[2]
      : paths.length > 0 && paths[1];
  const pagesFooter = filter(pagesArray, p => p.nav === FOOTER);
  return (
    <Styled>
      <FooterBar>
        <NavFooter justify="end">
          {pagesFooter.map((p, index) => (
            <FooterLink
              key={p.key}
              onClick={() => navPage(p.key)}
              label={
                <Text size="small">
                  <FormattedMessage {...commonMessages[`page_${p.key}`]} />
                </Text>
              }
              active={contentType === 'page' && contentId === p.key}
              last={index === pagesFooter.length - 1}
            />
          ))}
        </NavFooter>
      </FooterBar>
    </Styled>
  );
}

Footer.propTypes = {
  navPage: PropTypes.func,
  path: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  path: state => selectRouterPath(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    navPage: id => dispatch(navigatePage(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
