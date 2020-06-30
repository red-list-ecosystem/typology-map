/**
 *
 * Map
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import {
  Button,
  Box,
  RangeInput,
  CheckBox,
  Text,
  ResponsiveContext,
} from 'grommet';
import { Menu } from 'grommet-icons';

import { GROUP_LAYER_PROPERTIES } from 'config';

import { isMinSize } from 'utils/responsive';
import commonMessages from 'messages';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import { selectBasemap, selectOpacity, selectCountry } from './selectors';
import { setOpacity, setBasemap, setCountry } from './actions';

import messages from './messages';

const Styled = styled(props => (
  <Box direction="row" {...props} elevation="xxsmall" />
))`
  position: absolute;
  z-index: 401;
  bottom: 4px;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  height: ${({ theme, fs }) =>
    theme.dimensions.settings.height[fs ? 'large' : 'small']}px;
`;

const SettingsToggle = styled(props => <Button {...props} plain />)`
  width: ${({ theme }) => theme.dimensions.settingsToggle.width}px;
  height: ${({ theme, fs }) =>
    theme.dimensions.settings.height[fs ? 'large' : 'small']}px;
`;

const KeyColor = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
`;

const IconWrap = styled(Box)`
  width: ${({ theme }) => theme.dimensions.settingsToggle.width}px;
  height: ${({ theme }) => theme.dimensions.settingsToggle.width}px;
  text-align: center;
  vertical-align: middle;
`;

const StyledInner = styled(props => (
  <Box {...props} pad={{ horizontal: 'small' }} />
))``;

const MenuOpen = styled(Menu)`
  transform: rotate(90deg);
`;

const WrapControl = styled(props => <Box justify="evenly" {...props} />)``;

// const StyledRangeInput = styled(RangeInput)``;

const BasemapToggle = styled(props => <Box {...props} direction="row" />)``;
const BasemapButton = styled(props => <Button plain {...props} />)`
  border-radius: 30px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  padding: ${({ theme }) => theme.global.edgeSize.hair}
    ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme, active }) =>
    theme.global.colors[active ? 'dark-1' : 'white']};
  color: ${({ theme, active }) =>
    theme.global.colors.text[active ? 'dark' : 'light']};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 1 !important;
`;

const LayerTitle = styled(Text)`
  font-weight: 600;
`;
const SettingTitle = styled(props => (
  <Text size="small" {...props} margin={{ vertical: 'xxsmall' }} />
))``;

export function Settings({
  group,
  fullscreen,
  basemap,
  onSetBasemap,
  opacity,
  onSetOpacity,
  country,
  onSetCountry,
  intl,
}) {
  useInjectReducer({ key: 'map', reducer });

  const [showSettings, setShowSettings] = useState(true);
  const { locale } = intl;

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled fs={fullscreen}>
          <SettingsToggle
            onClick={() => setShowSettings(!showSettings)}
            fs={fullscreen}
            label={
              <Box alignContent="start" justify="center" direction="row" fill>
                <IconWrap justify="center" direction="row" align="center">
                  {!showSettings && <Menu />}
                  {showSettings && <MenuOpen />}
                </IconWrap>
              </Box>
            }
          />
          {showSettings && (
            <StyledInner justify="evenly">
              {fullscreen && (
                <Box alignContent="center" pad={{ vertical: 'xsmall' }}>
                  <LayerTitle>{group.title[locale]}</LayerTitle>
                </Box>
              )}
              <Box direction="row" gap="medium">
                <WrapControl>
                  <SettingTitle>
                    <FormattedMessage {...commonMessages.occurrence} />
                  </SettingTitle>
                  <Box direction="row" gap="small">
                    {Object.keys(GROUP_LAYER_PROPERTIES.OCCURRENCE).map(key => (
                      <Box
                        direction="row"
                        align="center"
                        gap="xsmall"
                        key={key}
                      >
                        <KeyColor
                          color={GROUP_LAYER_PROPERTIES.OCCURRENCE[key].color}
                          opacity={opacity}
                        />
                        <Text>
                          <FormattedMessage
                            {...commonMessages[
                              `occurrence_${
                                GROUP_LAYER_PROPERTIES.OCCURRENCE[key].id
                              }`
                            ]}
                          />
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </WrapControl>
                {isMinSize(size, 'large') && (
                  <WrapControl>
                    <SettingTitle>
                      <FormattedMessage {...messages.settingOpacity} />
                    </SettingTitle>
                    <RangeInput
                      value={opacity}
                      onChange={event => onSetOpacity(event.target.value)}
                      min={0}
                      max={1}
                      step={0.05}
                    />
                  </WrapControl>
                )}
                {isMinSize(size, 'large') && (
                  <WrapControl>
                    <SettingTitle>
                      <FormattedMessage {...messages.settingCountries} />
                    </SettingTitle>
                    <CheckBox
                      checked={country}
                      label={
                        <FormattedMessage {...messages.settingCountriesShow} />
                      }
                      onChange={() => onSetCountry(!country)}
                    />
                  </WrapControl>
                )}
                {isMinSize(size, 'large') && (
                  <WrapControl>
                    <SettingTitle>
                      <FormattedMessage {...messages.settingBasemap} />
                    </SettingTitle>
                    <BasemapToggle>
                      <BasemapButton
                        active={basemap === 'light'}
                        disabled={basemap === 'light'}
                        onClick={() => onSetBasemap('light')}
                        label={
                          <FormattedMessage {...messages.settingBasemapLight} />
                        }
                      />
                      <BasemapButton
                        active={basemap === 'satellite'}
                        disabled={basemap === 'satellite'}
                        onClick={() => onSetBasemap('satellite')}
                        label={
                          <FormattedMessage {...messages.settingBasemapSat} />
                        }
                      />
                    </BasemapToggle>
                  </WrapControl>
                )}
              </Box>
            </StyledInner>
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

Settings.propTypes = {
  group: PropTypes.object,
  fullscreen: PropTypes.bool,
  basemap: PropTypes.string,
  locale: PropTypes.string,
  opacity: PropTypes.number,
  country: PropTypes.bool,
  intl: intlShape.isRequired,
  onSetOpacity: PropTypes.func,
  onSetBasemap: PropTypes.func,
  onSetCountry: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  opacity: state => selectOpacity(state),
  basemap: state => selectBasemap(state),
  country: state => selectCountry(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onSetBasemap: value => dispatch(setBasemap(value)),
    onSetOpacity: value => dispatch(setOpacity(value)),
    onSetCountry: value => dispatch(setCountry(value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(Settings));
