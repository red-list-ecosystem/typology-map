/**
 *
 * ExploreBiome
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
  selectGroupsForBiome,
} from 'containers/App/selectors';
import { loadContent, navigateTypology } from 'containers/App/actions';

import HTMLWrapper from 'components/HTMLWrapper';

export function ExploreBiome({
  typology,
  onLoadContent,
  content,
  groups,
  navGroup,
  navParent,
  locale,
}) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(typology.path);
  }, [typology]);
  return (
    <div>
      <Helmet>
        <title>ExploreBiome</title>
        <meta name="description" content="Description of ExploreBiome" />
      </Helmet>
      <div>Biome</div>
      <h1>{`${typology.id} ${typology.title[locale]}`}</h1>
      <Button
        onClick={() => navParent(typology.realm)}
        label={`Realm: ${typology.realm}`}
      />
      <div>{content && <HTMLWrapper innerhtml={content} />}</div>
      <h4>Groups</h4>
      <div>
        {groups &&
          groups
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map(g => (
              <div key={g.id}>
                <Button
                  onClick={() => navGroup(g.id)}
                  label={`${g.id} ${g.title[locale]}`}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

ExploreBiome.propTypes = {
  typology: PropTypes.object.isRequired,
  groups: PropTypes.array,
  locale: PropTypes.string,
  onLoadContent: PropTypes.func.isRequired,
  navGroup: PropTypes.func.isRequired,
  navParent: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  content: (state, { typology }) =>
    selectContentByKey(state, {
      contentType: 'biomes',
      key: typology.path,
    }),
  groups: (state, { typology }) => selectGroupsForBiome(state, typology.id),
  locale: state => selectLocale(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: path => {
      dispatch(loadContent('biomes', path));
    },
    navGroup: id => dispatch(navigateTypology('groups', id)),
    navParent: id => dispatch(navigateTypology('realms', id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExploreBiome);
