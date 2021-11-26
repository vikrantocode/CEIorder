import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import Level2Route from './protected-routes/level2-route';
import Level1Route from './protected-routes/level1-route';
import Level3Route from './protected-routes/level3-route';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);
const Inventory = React.lazy(() =>
  import(/* webpackChunkName: "inventory" */ './inventory')
);
const Orders = React.lazy(() =>
  import(/* webpackChunkName: "order"*/ './orders')
);
const Customers = React.lazy(() =>
  import(/* webpackChunkName: "order"*/ './customers')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);
const EditProfile = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './EditProfile')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Level2Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Level2Route
              path={`${match.url}/inventory`}
              render={(props) => <Inventory {...props} />}
            />
            <Level1Route
              path={`${match.url}/orders`}
              render={(props) => <Orders {...props} />}
            />
            <Level1Route
              path={`${match.url}/customers`}
              render={(props) => <Customers {...props} />}
            />

            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Level3Route
              path={`${match.url}/edit-profile`}
              render={(props) => <EditProfile {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
