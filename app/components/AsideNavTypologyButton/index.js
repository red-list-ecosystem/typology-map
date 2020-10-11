/**
 *
 * AsideNavTypologyButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text } from 'grommet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { formatNumber } from 'utils/numbers';

import { GROUP_LAYER_PROPERTIES } from 'config';
import rootMessages from 'messages';
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
`;
const BarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 12px;
`;
const Bar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 12px;
  width: ${({ percentage }) => percentage}%;
  background: ${({ color }) => color};
`;

function AsideNavTypologyButton({
  id,
  name,
  level,
  stats,
  showAreas,
  intl,
  ...rest
}) {
  /* eslint-disable react/no-danger */
  return (
    <StyledButton
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
                  const { area } = stats.occurrences[key];
                  const oid = stats.occurrences[key].id;
                  if (area) {
                    return (
                      <div key={key}>
                        <BarWrapper>
                          <Bar
                            color={GROUP_LAYER_PROPERTIES.OCCURRENCE[key].color}
                            percentage={(area / stats.maxOverall) * 100}
                          />
                        </BarWrapper>
                        <div>
                          <Text size="xsmall">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: intl.formatMessage(messages.area, {
                                  type: intl.formatMessage(
                                    rootMessages[`occurrence_${oid}`],
                                  ),
                                  value: formatNumber(area, intl),
                                  unit: 'km<sup>2</sup>',
                                }),
                              }}
                            />
                          </Text>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              {!stats && (
                <Text size="xxsmall">
                  <FormattedMessage {...messages.not_available} />
                </Text>
              )}
            </Stats>
          )}
        </div>
      }
      {...rest}
    />
  );
  /* eslint-enable react/no-danger */
}

AsideNavTypologyButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  level: PropTypes.number,
  hasInfo: PropTypes.bool,
  stats: PropTypes.object,
  showAreas: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(AsideNavTypologyButton);
