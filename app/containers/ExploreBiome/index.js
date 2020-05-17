/**
 *
 * ExploreBiome
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Box, Text, ResponsiveContext } from 'grommet';
import { Close } from 'grommet-icons';
import styled from 'styled-components';

import {
  selectLocale,
  selectRealm,
  selectContentByKey,
  selectGroupsForBiome,
} from 'containers/App/selectors';
import {
  loadContent,
  navigateTypology,
  navigate,
} from 'containers/App/actions';

import ColumnMain from 'components/ColumnMain';
import ColumnAside from 'components/ColumnAside';
import Breadcrumb from 'components/Breadcrumb';
import NavGridChildren from 'components/NavGridChildren';
import HTMLWrapper from 'components/HTMLWrapper';

import { isMinSize } from 'utils/responsive';

import commonMessages from 'messages';

const GroupButton = styled(props => <Button {...props} plain />)`
  padding: ${({ theme }) => theme.global.edgeSize.small};
  border-top: 1px solid;
  border-top-color: ${({ theme }) => theme.global.colors.border.light};
  &:last-child {
    border-bottom: 1px solid;
    border-bottom-color: ${({ theme }) => theme.global.colors.border.light};
  }
`;

export function ExploreBiome({
  typology,
  onLoadContent,
  content,
  groups,
  navGroup,
  navRealm,
  navExplore,
  locale,
  realm,
}) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(typology.path);
  }, [typology]);

  const sortedGroups =
    groups &&
    groups.sort((a, b) => {
      const aTrueId =
        a.id.indexOf('.') > -1 ? parseInt(a.id.split('.')[1], 0) : a.id;
      const bTrueId =
        b.id.indexOf('.') > -1 ? parseInt(b.id.split('.')[1], 0) : a.id;
      return aTrueId > bTrueId ? 1 : -1;
    });
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <Helmet>
            <title>ExploreBiome</title>
            <meta name="description" content="Description of ExploreBiome" />
          </Helmet>
          <Box direction="row" fill="horizontal">
            <ColumnMain hasAside={isMinSize(size, 'large')}>
              <Box margin={{ horizontal: 'medium', vertical: 'medium' }}>
                <Breadcrumb
                  level={1}
                  targets={[() => navRealm(typology.realm)]}
                />
                <h1>{`${typology.id} ${typology.title[locale]}`}</h1>
                <Box direction="row" gap="small">
                  <Text>
                    <FormattedMessage {...commonMessages.typology.realm} />
                    {`:`}
                  </Text>
                  {realm && (
                    <Button
                      plain
                      onClick={() => navRealm(typology.realm)}
                      label={`${realm.id} ${realm.title[locale]}`}
                    />
                  )}
                </Box>
                {content && groups && (
                  <>
                    <HTMLWrapper innerhtml={content} />
                    <NavGridChildren
                      items={sortedGroups}
                      type="groups"
                      itemClick={id => navGroup(id)}
                      locale={locale}
                      parent={typology}
                    />
                  </>
                )}
              </Box>
            </ColumnMain>
            {isMinSize(size, 'large') && (
              <ColumnAside>
                <Box margin={{ vertical: 'medium' }}>
                  <Text>
                    <FormattedMessage {...commonMessages.typology.realm} />
                  </Text>
                  {realm && (
                    <Box
                      direction="row"
                      justify="between"
                      pad={{ vertical: 'small', horizontal: 'medium' }}
                      border="horizontal"
                    >
                      <Button
                        plain
                        onClick={() => navRealm(typology.realm)}
                        label={`${realm.id} ${realm.title[locale]}`}
                      />
                      <Button
                        plain
                        onClick={() => navExplore()}
                        icon={<Close size="large" />}
                      />
                    </Box>
                  )}
                  <Text>
                    <FormattedMessage {...commonMessages.typology.biome} />
                  </Text>
                  <Box
                    direction="row"
                    justify="between"
                    pad={{ vertical: 'small', horizontal: 'medium' }}
                    background="light-2"
                    border="horizontal"
                  >
                    <Text>{`${typology.id} ${typology.title[locale]}`}</Text>
                    <Button
                      plain
                      onClick={() => navRealm(typology.realm)}
                      icon={<Close size="large" />}
                    />
                  </Box>
                  <Box margin={{ top: 'large' }}>
                    <Text size="small">Select Functional Group</Text>
                    {sortedGroups &&
                      sortedGroups.map(g => (
                        <GroupButton
                          plain
                          key={g.id}
                          onClick={() => navGroup(g.id)}
                          label={`${g.id} ${g.title[locale]}`}
                        />
                      ))}
                  </Box>
                </Box>
              </ColumnAside>
            )}
          </Box>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

ExploreBiome.propTypes = {
  typology: PropTypes.object.isRequired,
  realm: PropTypes.object,
  groups: PropTypes.array,
  locale: PropTypes.string,
  onLoadContent: PropTypes.func.isRequired,
  navGroup: PropTypes.func.isRequired,
  navRealm: PropTypes.func.isRequired,
  navExplore: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  content: (state, { typology }) =>
    selectContentByKey(state, {
      contentType: 'biomes',
      key: typology.path,
    }),
  realm: (state, { typology }) => selectRealm(state, typology.realm),
  groups: (state, { typology }) => selectGroupsForBiome(state, typology.id),
  locale: state => selectLocale(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: path => {
      dispatch(loadContent('biomes', path));
    },
    navGroup: id => dispatch(navigateTypology('groups', id)),
    navRealm: id => dispatch(navigateTypology('realms', id)),
    navExplore: () => dispatch(navigate('explore')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExploreBiome);
