/**
 *
 * ExploreRealm
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
  selectContentByKey,
  selectBiomesForRealmWithStats,
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
import AsideNavSection from 'components/AsideNavSection';
import AsideNavLabel from 'components/AsideNavLabel';
import AsideNavTypologySelected from 'components/AsideNavTypologySelected';
import AsideNavTypologyList from 'components/AsideNavTypologyList';
import IconRealm from 'components/IconRealm';
import { isMinSize } from 'utils/responsive';

import commonMessages from 'messages';

export function ExploreRealm({
  typology,
  onLoadContent,
  content,
  biomes,
  navBiome,
  navExplore,
  locale,
}) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(typology.path);
  }, [typology]);

  const sortedBiomes = biomes && biomes.sort((a, b) => (a.id > b.id ? 1 : -1));
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <Helmet>
            <title>ExploreRealm</title>
            <meta name="description" content="Description of ExploreRealm" />
          </Helmet>
          <Box direction="row" fill="horizontal">
            <ColumnMain hasAside={isMinSize(size, 'large')}>
              <Box margin={{ horizontal: 'medium', vertical: 'medium' }}>
                <Breadcrumb level={0} />
                <IconRealm realmId={typology.id} />
                <h1>{`${typology.id} ${typology.title[locale]}`}</h1>
                {content && biomes && (
                  <>
                    <HTMLWrapper innerhtml={content} />
                    <NavGridChildren
                      items={sortedBiomes}
                      type="biomes"
                      itemClick={id => navBiome(id)}
                      locale={locale}
                      parent={typology}
                    />
                  </>
                )}
              </Box>
            </ColumnMain>
            {isMinSize(size, 'large') && (
              <ColumnAside>
                <AsideNavSection>
                  <AsideNavLabel
                    label={<FormattedMessage {...commonMessages.realm} />}
                  />
                  <AsideNavTypologySelected
                    level={0}
                    id={typology.id}
                    name={typology.title[locale]}
                    onDismiss={() => navExplore()}
                    active
                  />
                </AsideNavSection>
                <AsideNavSection>
                  <AsideNavLabel
                    label={<FormattedMessage {...commonMessages.biomeSelect} />}
                  />
                  <AsideNavTypologyList
                    items={sortedBiomes}
                    level={1}
                    locale={locale}
                    navItem={id => navBiome(id)}
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

ExploreRealm.propTypes = {
  typology: PropTypes.object.isRequired,
  biomes: PropTypes.array,
  locale: PropTypes.string,
  onLoadContent: PropTypes.func.isRequired,
  navBiome: PropTypes.func.isRequired,
  navExplore: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  content: (state, { typology }) =>
    selectContentByKey(state, {
      contentType: 'realms',
      key: typology.path,
    }),
  biomes: (state, { typology }) =>
    selectBiomesForRealmWithStats(state, typology.id),
  locale: state => selectLocale(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: path => {
      dispatch(loadContent('realms', path));
    },
    navBiome: id => dispatch(navigateTypology('biomes', id)),
    navExplore: () => dispatch(navigate('explore')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExploreRealm);
