/*
 * Intro
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Paragraph, Box, Button } from 'grommet';
import { Down } from 'grommet-icons';

import H1 from 'components/H1';

import { getHeaderHeight, getAsideWidth } from 'utils/responsive';

import messages from './messages';

const Styled = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: transparent;
  /* responsive height */
  right: ${getAsideWidth('small')}px;
  top: ${getHeaderHeight('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    top: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    top: ${getHeaderHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    top: ${getHeaderHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    top: ${getHeaderHeight('xxlarge')}px;
  }
`;

const IntroContentWrap = styled(props => <Box {...props} justify="evenly" />)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const IntroWrap = styled.div`
  max-width: 55%;
`;
const IntroTitleWrap = styled(props => (
  <Box pad={{ left: 'medium', right: 'small', vertical: 'hair' }} {...props} />
))`
  position: relative;
  display: inline-block;
  &::before {
    content: '';
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    width: 100%;
    top: 50%;
    height: 40px;
  }
`;
const IntroTitle = styled(H1)`
  position: relative;
  z-index: 1;
  font-size: 56px;
  line-height: 66px;
  display: inline;
  margin: 0;
  color: white;
`;
const IntroParaWrap = styled(props => (
  <Box
    pad={{ left: 'medium', right: 'small', vertical: 'xxsmall' }}
    margin={{ bottom: 'medium' }}
    {...props}
  />
))`
  display: inline-block;
  background: rgba(0, 0, 0, 0.6);
`;
const IntroPara = styled(Paragraph)`
  color: white;
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
`;

const IntroScroll = styled(props => <Button plain {...props} />)`
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 70px;
  height: 70px;
  border-radius: 9999px;
  vertical-align: middle;
  text-align: center;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;
export function Intro({ onScroll }) {
  return (
    <Styled>
      <IntroContentWrap onClick={() => onScroll()}>
        <IntroWrap>
          <IntroTitleWrap>
            <IntroTitle>
              <FormattedMessage {...messages.introTitle} />
            </IntroTitle>
          </IntroTitleWrap>
          <IntroTitleWrap>
            <IntroTitle>
              <FormattedMessage {...messages.introTitle2} />
            </IntroTitle>
          </IntroTitleWrap>
        </IntroWrap>
        <IntroWrap>
          <IntroParaWrap>
            <IntroPara>
              <FormattedMessage {...messages.introParagraph} />
            </IntroPara>
          </IntroParaWrap>
        </IntroWrap>
        <IntroScroll
          icon={<Down size="50px" color="white" />}
          onClick={() => onScroll()}
        />
      </IntroContentWrap>
    </Styled>
  );
}

Intro.propTypes = {
  onScroll: PropTypes.func,
};

export default Intro;
