/**
 *
 * ExploreGroup
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, ResponsiveContext } from 'grommet';

import {
  selectBiome,
  selectRealmForBiome,
  selectLocale,
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
import HTMLWrapper from 'components/HTMLWrapper';
import AsideNavSection from 'components/AsideNavSection';
import AsideNavLabel from 'components/AsideNavLabel';
import AsideNavTypologySelected from 'components/AsideNavTypologySelected';
import AsideNavTypologyList from 'components/AsideNavTypologyList';
import NavAncestor from 'components/NavAncestor';

import { isMinSize } from 'utils/responsive';

import commonMessages from 'messages';

// <h4>Sibling Groups</h4>
// <div>
//   {groups &&
//     groups.map(g => (
//       <div key={g.id}>
//         <Button
//           onClick={() => navGroup(g.id)}
//           label={`${g.id} ${g.title[locale]}`}
//           active={g.id === typology.id}
//         />
//       </div>
//     ))}
// </div>
// </>

export function ExploreGroup({
  typology,
  onLoadContent,
  content,
  groups,
  navGroup,
  navBiome,
  navRealm,
  navExplore,
  locale,
  biome,
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
            <title>ExploreGroup</title>
            <meta name="description" content="Description of ExploreGroup" />
          </Helmet>
          <Box direction="row" fill="horizontal">
            <ColumnMain hasAside={isMinSize(size, 'large')}>
              <Box margin={{ horizontal: 'medium', vertical: 'medium' }}>
                <Breadcrumb
                  level={2}
                  targets={[
                    () => navRealm(biome.realm),
                    () => navBiome(typology.biome),
                  ]}
                />
                <h1>{`${typology.id} ${typology.title[locale]}`}</h1>
                {realm && biome && (
                  <NavAncestor
                    type="realm"
                    onClick={() => navRealm(biome.realm)}
                    id={realm.id}
                    name={realm.title[locale]}
                  />
                )}
                {biome && (
                  <NavAncestor
                    type="biome"
                    onClick={() => navBiome(typology.biome)}
                    id={biome.id}
                    name={biome.title[locale]}
                  />
                )}
                {content && <HTMLWrapper innerhtml={content} />}
              </Box>
            </ColumnMain>
            {isMinSize(size, 'large') && (
              <ColumnAside>
                <AsideNavSection>
                  <AsideNavLabel
                    label={
                      <FormattedMessage {...commonMessages.typology.realm} />
                    }
                  />
                  {realm && biome && (
                    <AsideNavTypologySelected
                      level={0}
                      id={realm.id}
                      name={realm.title[locale]}
                      onDismiss={() => navExplore()}
                      onTypologyClick={() => navRealm(biome.realm)}
                    />
                  )}
                </AsideNavSection>
                <AsideNavSection>
                  <AsideNavLabel
                    label={
                      <FormattedMessage {...commonMessages.typology.biome} />
                    }
                  />
                  {biome && (
                    <AsideNavTypologySelected
                      level={1}
                      id={biome.id}
                      name={biome.title[locale]}
                      onDismiss={() => navRealm(biome.realm)}
                      onTypologyClick={() => navBiome(biome.id)}
                    />
                  )}
                </AsideNavSection>
                <AsideNavSection>
                  <AsideNavLabel
                    label={
                      <FormattedMessage {...commonMessages.nav.selectGroup} />
                    }
                  />
                  <AsideNavTypologyList
                    items={sortedGroups}
                    level={2}
                    locale={locale}
                    navItem={id => navGroup(id)}
                    navParent={() => navBiome(biome.id)}
                    activeId={typology.id}
                  />
                </AsideNavSection>
              </ColumnAside>
            )}
          </Box>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

ExploreGroup.propTypes = {
  typology: PropTypes.object.isRequired,
  biome: PropTypes.object,
  realm: PropTypes.object,
  groups: PropTypes.array,
  locale: PropTypes.string,
  onLoadContent: PropTypes.func.isRequired,
  navGroup: PropTypes.func.isRequired,
  navBiome: PropTypes.func.isRequired,
  navRealm: PropTypes.func.isRequired,
  navExplore: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  content: (state, { typology }) =>
    selectContentByKey(state, {
      contentType: 'groups',
      key: typology.path,
    }),
  realm: (state, { typology }) => selectRealmForBiome(state, typology.biome),
  biome: (state, { typology }) => selectBiome(state, typology.biome),
  groups: (state, { typology }) => selectGroupsForBiome(state, typology.biome),
  locale: state => selectLocale(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: path => {
      dispatch(loadContent('groups', path));
    },
    navGroup: id => dispatch(navigateTypology('groups', id)),
    navBiome: id => dispatch(navigateTypology('biomes', id)),
    navRealm: id => dispatch(navigateTypology('realms', id)),
    navExplore: () => dispatch(navigate('explore')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExploreGroup);
