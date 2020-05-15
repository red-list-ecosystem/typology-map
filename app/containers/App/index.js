/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { Grommet } from 'grommet';
import theme from 'theme';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
import { loadTypologyConfig } from 'containers/App/actions';

import RouteHome from 'containers/RouteHome/Loadable';
import RoutePage from 'containers/RoutePage/Loadable';
import RouteExploreOverview from 'containers/RouteExploreOverview/Loadable';
import RouteExplore from 'containers/RouteExplore/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'containers/Header';
import Footer from 'components/Footer';

import { ROUTES } from 'config';
import GlobalStyle from 'global-styles';
import { appLocales } from 'i18n';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100%;
`;

function App({ onLoadTypology }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'default', saga });
  // kick off loading of typology configuration files
  useEffect(() => {
    onLoadTypology();
  }, []);
  return (
    <Grommet theme={theme}>
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Global Ecosystem Typology"
          defaultTitle="Global Ecosystem Typology"
        >
          <meta name="description" content="" />
        </Helmet>
        <Header />
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
              `/:locale(${appLocales.join('|')})/${ROUTES.EXPLORE}/:level/:id`,
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
        <Footer />
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
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTypology: () => {
      dispatch(loadTypologyConfig('realms'));
      dispatch(loadTypologyConfig('biomes'));
      dispatch(loadTypologyConfig('groups'));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
