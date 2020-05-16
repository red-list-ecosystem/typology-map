/**
 *
 * ExploreGroup
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

export function ExploreGroup({
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
        <title>ExploreGroup</title>
        <meta name="description" content="Description of ExploreGroup" />
      </Helmet>
      <div>Ecological Functional Group</div>
      <h1>{`${typology.id} ${typology.title[locale]}`}</h1>
      <Button
        onClick={() => navParent(typology.biome)}
        label={`Biome: ${typology.biome}`}
      />
      {content && (
        <>
          <HTMLWrapper innerhtml={content} />
          <h4>Sibling Groups</h4>
          <div>
            {groups &&
              groups.map(g => (
                <div key={g.id}>
                  <Button
                    onClick={() => navGroup(g.id)}
                    label={`${g.id} ${g.title[locale]}`}
                    active={g.id === typology.id}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

ExploreGroup.propTypes = {
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
      contentType: 'groups',
      key: typology.path,
    }),
  groups: (state, { typology }) => selectGroupsForBiome(state, typology.biome),
  locale: state => selectLocale(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: path => {
      dispatch(loadContent('groups', path));
    },
    navGroup: id => dispatch(navigateTypology('groups', id)),
    navParent: id => dispatch(navigateTypology('biomes', id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExploreGroup);
