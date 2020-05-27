/**
 *
 * ExploreGroup
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Box, ResponsiveContext, Button } from 'grommet';
import { Expand, Contract } from 'grommet-icons';

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

import Map from 'containers/Map';

import ColumnMain from 'components/ColumnMain';
import ColumnAside from 'components/ColumnAside';
import Breadcrumb from 'components/Breadcrumb';
import HTMLWrapper from 'components/HTMLWrapper';
import AsideNavSection from 'components/AsideNavSection';
import AsideNavLabel from 'components/AsideNavLabel';
import AsideNavTypologySelected from 'components/AsideNavTypologySelected';
import AsideNavTypologyList from 'components/AsideNavTypologyList';
import NavAncestor from 'components/NavAncestor';
import IconRealm from 'components/IconRealm';

import { isMinSize, getHeaderHeight } from 'utils/responsive';

import commonMessages from 'messages';

const FSButtonWrapper = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.global.edgeSize.small};
  top: ${({ theme }) => theme.global.edgeSize.small};
  z-index: 401;
`;
const FSButton = styled(props => <Button plain {...props} />)`
  border-radius: 9999px;
  padding: ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme }) => theme.global.colors['light-2']};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const MapWrapper = styled.div`
  position: ${({ isFS }) => (isFS ? 'absolute' : 'relative')};
  height: ${({ isFS }) => (isFS ? 'auto' : '400px')};
  top: ${({ isFS }) => (isFS ? '0' : 'auto')};
  bottom: ${({ isFS }) => (isFS ? '0' : 'auto')};
  right: ${({ isFS }) => (isFS ? '0' : 'auto')};
  left: ${({ isFS }) => (isFS ? '0' : 'auto')};
`;

const Styled = styled.div`
  position: ${({ isFS }) => (isFS ? 'absolute' : 'relative')};
  top: ${({ isFS, size }) => (isFS ? `${getHeaderHeight(size)}px` : 'auto')};
  bottom: ${({ isFS }) => (isFS ? '0' : 'auto')};
  right: ${({ isFS }) => (isFS ? '0' : 'auto')};
  left: ${({ isFS }) => (isFS ? '0' : 'auto')};
`;
//
// {isMapExpanded && (
//   <MapWrapperFS size={size}>
//     {map}
//     <FSButtonWrapper>
//       <FSButton
//         icon={<Contract />}
//         onClick={() => setIsMapExpanded(false)}
//       />
//     </FSButtonWrapper>
//   </MapWrapperFS>
// )}

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

  const [isMapExpanded, setIsMapExpanded] = useState(false);

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
        <Styled isFS={isMapExpanded} size={size}>
          <Helmet>
            <title>ExploreGroup</title>
            <meta name="description" content="Description of ExploreGroup" />
          </Helmet>
          <Box direction="row" fill="horizontal">
            <ColumnMain
              hasAside={isMinSize(size, 'large')}
              style={{
                position: isMapExpanded ? 'static' : 'relative',
                minHeight: isMapExpanded ? 'auto' : '100vh',
              }}
            >
              <MapWrapper isFS={isMapExpanded} size={size}>
                <Map group={typology} fullscreen={isMapExpanded} />
                <FSButtonWrapper>
                  <FSButton
                    icon={isMapExpanded ? <Contract /> : <Expand />}
                    onClick={() => setIsMapExpanded(!isMapExpanded)}
                  />
                </FSButtonWrapper>
              </MapWrapper>
              {!isMapExpanded && (
                <Box margin={{ horizontal: 'medium', vertical: 'medium' }}>
                  <Breadcrumb
                    level={2}
                    targets={[
                      () => navRealm(biome.realm),
                      () => navBiome(typology.biome),
                    ]}
                  />
                  <IconRealm realmId={realm.id} />
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
              )}
            </ColumnMain>
            {isMinSize(size, 'large') && !isMapExpanded && (
              <ColumnAside>
                <AsideNavSection>
                  <AsideNavLabel
                    label={<FormattedMessage {...commonMessages.realm} />}
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
                    label={<FormattedMessage {...commonMessages.biome} />}
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
                    label={<FormattedMessage {...commonMessages.groupSelect} />}
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
        </Styled>
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
