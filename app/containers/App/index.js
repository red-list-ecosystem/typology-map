/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Grommet } from 'grommet';
import theme from 'theme';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import {
  loadTypologyConfig,
  dismissDisclaimer,
  navigatePage,
} from 'containers/App/actions';
import {
  selectShowDisclaimer,
  selectRouterPathNamed,
  selectFullscreenImage,
} from 'containers/App/selectors';

import RouteHome from 'containers/RouteHome/Loadable';
import RoutePage from 'containers/RoutePage/Loadable';
import RouteExploreOverview from 'containers/RouteExploreOverview/Loadable';
import RouteExplore from 'containers/RouteExplore';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import MapContainer from 'containers/MapContainer';
import Header from 'containers/Header';
import FullscreenImage from 'containers/FullscreenImage';
import Disclaimer from 'components/Disclaimer';
import { getHeaderHeight } from 'utils/responsive';

import { ROUTES, PAGES } from 'config';
import GlobalStyle from 'global-styles';
import { appLocales } from 'i18n';

import commonMessages from 'messages';

import ScrollToTop from './ScrollToTop';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100%;
`;

const Content = styled.div`
  position: relative;
  padding-top: ${getHeaderHeight('small')}px;
  @media (min-width: ${props => props.theme.sizes.medium.minpx}) {
    padding-top: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${props => props.theme.sizes.large.minpx}) {
    padding-top: ${getHeaderHeight('large')}px;
  }
  @media (min-width: ${props => props.theme.sizes.xlarge.minpx}) {
    padding-top: ${getHeaderHeight('xlarge')}px;
  }
  @media (min-width: ${props => props.theme.sizes.xxlarge.minpx}) {
    padding-top: ${getHeaderHeight('xxlarge')}px;
  }
`;

function App({
  onLoadTypology,
  showDisclaimer,
  onDismissDisclaimer,
  onNavigateAbout,
  fullscreenImage,
  path,
  intl,
}) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'default', saga });
  // kick off loading of typology configuration files
  useEffect(() => {
    onLoadTypology();
  }, []);
  const groupId =
    path.route === ROUTES.EXPLORE && path.level === 'groups' ? path.id : null;

  return (
    <Grommet theme={theme}>
      <AppWrapper>
        <Helmet
          titleTemplate={`%s - ${intl.formatMessage(commonMessages.appTitle)}`}
          defaultTitle={intl.formatMessage(commonMessages.appTitle)}
        >
          <meta
            name="description"
            content={intl.formatMessage(commonMessages.metaDescription)}
          />
        </Helmet>
        {showDisclaimer && (
          <Disclaimer
            onDismiss={() => onDismissDisclaimer()}
            onMore={() => onNavigateAbout()}
          />
        )}
        <Header />
        <Content>
          <MapContainer groupId={groupId} />
          <ScrollToTop>
            <Switch>
              <Route
                exact
                path={[`/${ROUTES.HOME}`, `/:locale(${appLocales.join('|')})`]}
                component={RouteHome}
              />
              <Route
                exact
                path={[
                  `/${ROUTES.EXPLORE}`,
                  `/:locale(${appLocales.join('|')})/${ROUTES.EXPLORE}`,
                ]}
                component={RouteExploreOverview}
              />
              <Route
                exact
                path={[
                  `/${ROUTES.EXPLORE}/:level/:id`,
                  `/:locale(${appLocales.join('|')})/${
                    ROUTES.EXPLORE
                  }/:level/:id`,
                ]}
                component={RouteExplore}
              />
              <Route
                path={[
                  `/${ROUTES.PAGE}/:id`,
                  `/:locale(${appLocales.join('|')})/${ROUTES.PAGE}/:id`,
                ]}
                component={RoutePage}
              />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </ScrollToTop>
          {fullscreenImage && <FullscreenImage config={fullscreenImage} />}
        </Content>
        <GlobalStyle />
      </AppWrapper>
    </Grommet>
  );
}

// App.propTypes = {
//   intl: intlShape.isRequired,
// };

// export default injectIntl(App);
// export default App;

App.propTypes = {
  onLoadTypology: PropTypes.func,
  onDismissDisclaimer: PropTypes.func,
  onNavigateAbout: PropTypes.func,
  showDisclaimer: PropTypes.bool,
  path: PropTypes.object,
  fullscreenImage: PropTypes.object,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  showDisclaimer: state => selectShowDisclaimer(state),
  path: state => selectRouterPathNamed(state),
  fullscreenImage: state => selectFullscreenImage(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTypology: () => {
      dispatch(loadTypologyConfig('realms'));
      dispatch(loadTypologyConfig('biomes'));
      dispatch(loadTypologyConfig('groups'));
    },
    onDismissDisclaimer: () => dispatch(dismissDisclaimer()),
    onNavigateAbout: () => dispatch(navigatePage(PAGES.about.path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(App));
