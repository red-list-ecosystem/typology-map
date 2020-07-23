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
import {
  selectBasemap,
  selectOpacity,
  selectCountry,
  selectZoomToBounds,
} from './selectors';
import { setOpacity, setBasemap, setCountry, setZoomToBounds } from './actions';

import messages from './messages';

const Styled = styled(props => <Box direction="row" {...props} />)`
  position: absolute;
  z-index: 401;
  bottom: ${({ theme }) => theme.global.edgeSize.xsmall};
  left: ${({ theme }) => theme.global.edgeSize.xsmall};
  height: ${({ theme, fs }) =>
    theme.dimensions.settings.height[fs ? 'large' : 'small']}px;
`;

// background: ${({ theme }) => theme.global.colors['brand-2']};
const SettingsToggle = styled(props => <Button {...props} plain />)`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  width: ${({ theme }) => theme.dimensions.settingsToggle.width}px;
  background: rgba(255, 255, 255, 0.85);
  height: ${({ theme, fs }) =>
    theme.dimensions.settings.height[fs ? 'large' : 'small']}px;
  &:hover {
    background: ${({ theme }) => theme.global.colors.white};
  }
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
))`
  margin-left: 1px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const MenuOpen = styled(Menu)`
  transform: rotate(90deg);
`;

const WrapControl = styled(props => <Box justify="evenly" {...props} />)``;

// const StyledRangeInput = styled(RangeInput)``;

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
  zoomToBounds,
  onSetZoomToBounds,
  intl,
}) {
  useInjectReducer({ key: 'map', reducer });

  const [showSettings, setShowSettings] = useState(true);
  const { locale } = intl;
  const satellite = basemap === 'satellite';
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
                  {!showSettings && <Menu color="black" />}
                  {showSettings && <MenuOpen color="black" />}
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
                      <FormattedMessage {...messages.settingBasemap} />
                    </SettingTitle>
                    <CheckBox
                      toggle
                      checked={satellite}
                      label={intl.formatMessage(
                        messages[satellite ? 'settingOn' : 'settingOff'],
                      )}
                      onChange={() =>
                        onSetBasemap(satellite ? 'light' : 'satellite')
                      }
                    />
                  </WrapControl>
                )}
                {isMinSize(size, 'large') && (
                  <WrapControl>
                    <SettingTitle>
                      <FormattedMessage {...messages.settingCountries} />
                    </SettingTitle>
                    <CheckBox
                      toggle
                      checked={country}
                      label={intl.formatMessage(
                        messages[country ? 'settingOn' : 'settingOff'],
                      )}
                      onChange={() => onSetCountry(!country)}
                    />
                  </WrapControl>
                )}
                {isMinSize(size, 'large') && (
                  <WrapControl>
                    <SettingTitle>
                      <FormattedMessage {...messages.settingZoomToBounds} />
                    </SettingTitle>
                    <CheckBox
                      toggle
                      checked={zoomToBounds}
                      label={intl.formatMessage(
                        messages[zoomToBounds ? 'settingOn' : 'settingOff'],
                      )}
                      onChange={() => onSetZoomToBounds(!zoomToBounds)}
                    />
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
  zoomToBounds: PropTypes.bool,
  intl: intlShape.isRequired,
  onSetOpacity: PropTypes.func,
  onSetBasemap: PropTypes.func,
  onSetCountry: PropTypes.func,
  onSetZoomToBounds: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  opacity: state => selectOpacity(state),
  basemap: state => selectBasemap(state),
  country: state => selectCountry(state),
  zoomToBounds: state => selectZoomToBounds(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onSetBasemap: value => dispatch(setBasemap(value)),
    onSetOpacity: value => dispatch(setOpacity(value)),
    onSetCountry: value => dispatch(setCountry(value)),
    onSetZoomToBounds: value => dispatch(setZoomToBounds(value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(Settings));
