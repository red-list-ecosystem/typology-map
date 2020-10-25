/**
 *
 * AsideNavTypologyButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text } from 'grommet';
import { injectIntl, intlShape } from 'react-intl';

import { formatNumber } from 'utils/numbers';

import { GROUP_LAYER_PROPERTIES } from 'config';
import messages from './messages';

const getSize = level => {
  if (level === 0) return 'xlarge';
  if (level === 1) return 'large';
  return 'medium';
};

// prettier-ignore
const StyledButton = styled(props => <Button {...props} plain />)`
  padding-top: ${({ theme }) => theme.global.edgeSize.small};
  padding-bottom: ${({ theme }) => theme.global.edgeSize.small};
  padding-right: ${({ theme, hasInfo }) => hasInfo ? '40px' : theme.global.edgeSize.small};
  padding-left: ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme, active }) =>
    active ? theme.global.colors['light-2'] : 'transparent'};
  &:hover {
    background: ${({ theme, active }) =>
    active ? theme.global.colors['light-2'] : theme.global.colors['light-1']};
  }
  &:focus {
    background: ${({ theme, active }) =>
    active ? theme.global.colors['light-2'] : theme.global.colors['light-1']};
  }
`;

const Stats = styled.div`
  margin-top: 3px;
  margin-right: 50px;
`;
const BarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 15px;
  margin-bottom: 3px;
  background: ${({ theme, active }) =>
    theme.global.colors[active ? 'light-4' : 'light-3']};
`;
const Bar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 15px;
  width: ${({ percentage }) => percentage}%;
  min-width: ${({ hasArea }) => (hasArea ? 1 : 0)}px;
  background: ${({ color }) => color};
`;

const BarLabel = styled(p => <Text size="xxsmall" {...p} color="dark" />)`
  position: absolute;
  left: 100%;
  top: 2px;
  padding-left: 5px;
  width: 50px;
`;

function AsideNavTypologyButton({
  id,
  name,
  level,
  stats,
  showAreas,
  intl,
  active,
  ...rest
}) {
  /* eslint-disable react/no-danger */
  return (
    <StyledButton
      active={active}
      label={
        <div>
          <div>
            <Text size={getSize(level)}>{`${id} ${name}`}</Text>
          </div>
          {showAreas && (
            <Stats>
              {stats &&
                stats.occurrences &&
                Object.keys(stats.occurrences).map(key => {
                  const areaRelative = stats.occurrences[key].area_relative;
                  // const oid = stats.occurrences[key].id;
                  return (
                    <div key={key}>
                      <BarWrapper active={active}>
                        <Bar
                          color={GROUP_LAYER_PROPERTIES.OCCURRENCE[key].color}
                          percentage={(areaRelative || 0) * 100}
                          hasArea={areaRelative > 0}
                        />
                        <BarLabel>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: intl.formatMessage(messages.area, {
                                value: formatNumber(
                                  areaRelative * 100,
                                  intl,
                                  areaRelative < 0.01 ? 2 : 1,
                                ),
                                unit: '%',
                              }),
                            }}
                          />
                        </BarLabel>
                      </BarWrapper>
                    </div>
                  );
                })}
            </Stats>
          )}
        </div>
      }
      {...rest}
    />
  );
  /* eslint-enable react/no-danger */
}
// {!stats && (
//   <Text size="xxsmall">
//   <FormattedMessage {...messages.not_available} />
//   </Text>
// )}

AsideNavTypologyButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  level: PropTypes.number,
  hasInfo: PropTypes.bool,
  stats: PropTypes.object,
  showAreas: PropTypes.bool,
  active: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(AsideNavTypologyButton);
