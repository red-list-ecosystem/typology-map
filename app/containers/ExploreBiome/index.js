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
import { Box, ResponsiveContext } from 'grommet';

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
import ColumnMainContent from 'components/ColumnMainContent';
import ColumnAside from 'components/ColumnAside';
import NavGridChildren from 'components/NavGridChildren';
import HTMLWrapper from 'components/HTMLWrapper';
import AsideNavSection from 'components/AsideNavSection';
import AsideNavLabel from 'components/AsideNavLabel';
import AsideNavTypologySelected from 'components/AsideNavTypologySelected';
import AsideNavTypologyList from 'components/AsideNavTypologyList';
import TypologyHeader from 'components/TypologyHeader';
import TopGraphic from 'components/TopGraphic';
import TypologyImage from 'components/TypologyImage';
import TypologyContent from 'components/TypologyContent';

import { isMinSize } from 'utils/responsive';

import commonMessages from 'messages';

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
              <TopGraphic direction="row">
                <TypologyImage typology={typology} locale={locale} />
              </TopGraphic>
              <ColumnMainContent>
                <TypologyContent>
                  <TypologyHeader
                    typology={typology}
                    locale={locale}
                    ancestors={[
                      {
                        ...realm,
                        typologyType: 'realm',
                        nav: () => navRealm(realm.id),
                      },
                    ]}
                  />
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
                </TypologyContent>
              </ColumnMainContent>
            </ColumnMain>
            {isMinSize(size, 'large') && (
              <ColumnAside>
                <AsideNavSection>
                  <AsideNavLabel
                    label={<FormattedMessage {...commonMessages.realm} />}
                  />
                  {realm && (
                    <AsideNavTypologySelected
                      level={0}
                      id={realm.id}
                      name={realm.title[locale]}
                      onDismiss={() => navExplore()}
                      onTypologyClick={() => navRealm(typology.realm)}
                    />
                  )}
                </AsideNavSection>
                <AsideNavSection>
                  <AsideNavLabel
                    label={<FormattedMessage {...commonMessages.biome} />}
                  />
                  <AsideNavTypologySelected
                    level={1}
                    id={typology.id}
                    name={typology.title[locale]}
                    onDismiss={() => navRealm(typology.realm)}
                    active
                  />
                </AsideNavSection>
                <AsideNavSection>
                  <AsideNavLabel
                    label={<FormattedMessage {...commonMessages.groupSelect} />}
                  />
                  <AsideNavTypologyList
                    items={sortedGroups}
                    level={2}
                    locale={locale}
                    navItem={id => navGroup(id)}
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
