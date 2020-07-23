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

const PanelToggle = styled(props => <Button plain {...props} />)`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  width: ${({ theme }) => theme.dimensions.panelToggle.width}px;
  background: rgba(255, 255, 255, 0.85);
  height: ${({ theme, fs }) =>
    theme.dimensions.settings.height[fs ? 'large' : 'small']}px;
  &:hover {
    background: ${({ theme }) => theme.global.colors.white};
  }
`;
const SettingsToggle = styled(props => <Button plain {...props} />)`
  box-shadow: 2 0 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: ${({ theme }) => theme.dimensions.settingsToggle.width}px;
  background: ${({ theme }) => theme.global.colors['light-grey-transparent']};
  height: ${({ theme, fs }) =>
    theme.dimensions.settings.height[fs ? 'large' : 'small']}px;
  &:hover {
    background: ${({ theme }) => theme.global.colors['light-grey']};
  }
`;

const KeyColor = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 2px 0;
  background: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
`;

const IconWrap = styled(Box)`
  width: ${({ theme }) => theme.dimensions.panelToggle.width}px;
  height: ${({ theme }) => theme.dimensions.panelToggle.width}px;
  text-align: center;
  vertical-align: middle;
`;

const StyledInner = styled(props => (
  <Box {...props} pad={{ horizontal: 'small' }} />
))`
  margin: 0 1px;
  background: ${({ theme }) => theme.global.colors['light-grey-transparent']};
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

const Id = styled(LayerTitle)``;

const SettingTitle = styled(props => (
  <Text size="xsmall" {...props} margin={{ bottom: 'xsmall' }} />
))`
  font-weight: 600;
`;
const TextLabel = styled(props => <Text size="xsmall" {...props} />)``;

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

  const [showPanel, setShowPanel] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const { locale } = intl;
  const satellite = basemap === 'satellite';
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled fs={fullscreen}>
          <PanelToggle
            onClick={() => setShowPanel(!showPanel)}
            fs={fullscreen}
            label={
              <Box alignContent="start" justify="center" direction="row" fill>
                <IconWrap justify="center" direction="row" align="center">
                  {!showPanel && <Menu color="black" />}
                  {showPanel && <MenuOpen color="black" />}
                </IconWrap>
              </Box>
            }
          />
          {showPanel && (
            <StyledInner>
              {fullscreen && (
                <Box
                  alignContent="center"
                  pad={{ vertical: 'xsmall' }}
                  direction="row"
                  gap="xsmall"
                  margin={{
                    top: 'xsmall',
                    bottom: 'xsmall',
                  }}
                >
                  <Id>{group.id}</Id>
                  <LayerTitle>{group.title[locale]}</LayerTitle>
                </Box>
              )}
              <Box
                direction="row"
                gap="medium"
                margin={{
                  top: !fullscreen ? 'small' : 0,
                }}
              >
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
                        <TextLabel>
                          <FormattedMessage
                            {...commonMessages[
                              `occurrence_${
                                GROUP_LAYER_PROPERTIES.OCCURRENCE[key].id
                              }`
                            ]}
                          />
                        </TextLabel>
                      </Box>
                    ))}
                  </Box>
                </WrapControl>
                {isMinSize(size, 'large') && (fullscreen || showSettings) && (
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
                {isMinSize(size, 'large') && (fullscreen || showSettings) && (
                  <WrapControl>
                    <SettingTitle>
                      <FormattedMessage {...messages.settingBasemap} />
                    </SettingTitle>
                    <CheckBox
                      toggle
                      checked={satellite}
                      label={
                        <TextLabel>
                          {intl.formatMessage(
                            messages[satellite ? 'settingOn' : 'settingOff'],
                          )}
                        </TextLabel>
                      }
                      onChange={() =>
                        onSetBasemap(satellite ? 'light' : 'satellite')
                      }
                    />
                  </WrapControl>
                )}
                {isMinSize(size, 'large') && (fullscreen || showSettings) && (
                  <WrapControl>
                    <SettingTitle>
                      <FormattedMessage {...messages.settingCountries} />
                    </SettingTitle>
                    <CheckBox
                      toggle
                      checked={country}
                      label={
                        <TextLabel>
                          {intl.formatMessage(
                            messages[country ? 'settingOn' : 'settingOff'],
                          )}
                        </TextLabel>
                      }
                      onChange={() => onSetCountry(!country)}
                    />
                  </WrapControl>
                )}
                {isMinSize(size, 'large') && (fullscreen || showSettings) && (
                  <WrapControl>
                    <SettingTitle>
                      <FormattedMessage {...messages.settingZoomToBounds} />
                    </SettingTitle>
                    <CheckBox
                      toggle
                      checked={zoomToBounds}
                      label={
                        <TextLabel>
                          {intl.formatMessage(
                            messages[zoomToBounds ? 'settingOn' : 'settingOff'],
                          )}
                        </TextLabel>
                      }
                      onChange={() => onSetZoomToBounds(!zoomToBounds)}
                    />
                  </WrapControl>
                )}
              </Box>
            </StyledInner>
          )}
          {showPanel && isMinSize(size, 'large') && !fullscreen && (
            <SettingsToggle
              onClick={() => setShowSettings(!showSettings)}
              label={
                <Text size="xsmall" color="secondary">
                  {intl.formatMessage(
                    messages[showSettings ? 'settingsHide' : 'settingsShow'],
                  )}
                </Text>
              }
            />
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
