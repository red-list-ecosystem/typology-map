/**
 *
 * ExploreRealm
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'grommet';

import {
  selectLocale,
  selectContentByKey,
  selectBiomesForRealmWithStats,
} from 'containers/App/selectors';
import { loadContent, navigateTypology } from 'containers/App/actions';

import HTMLWrapper from 'components/HTMLWrapper';

export function ExploreRealm({
  typology,
  onLoadContent,
  content,
  biomes,
  navBiome,
  locale,
}) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(typology.path);
  }, [typology]);
  return (
    <div>
      <Helmet>
        <title>ExploreRealm</title>
        <meta name="description" content="Description of ExploreRealm" />
      </Helmet>
      <div>Realm</div>
      <h1>{`${typology.id} ${typology.title[locale]}`}</h1>
      {content && (
        <>
          <HTMLWrapper innerhtml={content} />
          <h4>Biomes</h4>
          <div>
            {biomes &&
              biomes
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map(b => (
                  <div key={b.id}>
                    <Button
                      onClick={() => navBiome(b.id)}
                      label={`${b.id} ${b.title[locale]}`}
                    />
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
}

ExploreRealm.propTypes = {
  typology: PropTypes.object.isRequired,
  biomes: PropTypes.array,
  locale: PropTypes.string,
  onLoadContent: PropTypes.func.isRequired,
  navBiome: PropTypes.func.isRequired,
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExploreRealm);
