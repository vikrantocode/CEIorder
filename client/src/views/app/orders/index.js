import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AssignGroup from './orders/AssignGroup';
import AddWarehouse from './warehouses/add-warehouse';
import ViewWarehouse from './warehouses/view-warehouse';
import EditWarehouse from './warehouses/edit-warehouse';
import Warehouses from './warehouses/warehouses';

const OrdersList = React.lazy(() =>
  import(/* webpackChunkName: "application-Product" */ './orders/Orders')
);
const AddOrder = React.lazy(() => import('./orders/AddOrder'));

const ImportBulkOrder = React.lazy(() => import('./orders/ImportBulkOrder'));

const BulkOrderOptions = React.lazy(() => import('./orders/BulkOrderOptions'));

const EditOrder = React.lazy(() => import('./orders/EditOrder'));

const Order = React.lazy(() => import('./orders/Order'));

const Orders = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/orders`} />
      <Route
        path={`${match.url}/orders`}
        exact
        render={(props) => <OrdersList {...props} />}
      />
      <Route
        path={`${match.url}/add-order`}
        exact
        render={(props) => <AddOrder {...props} />}
      />
      <Route
        path={`${match.url}/edit-order/:id`}
        exact
        render={(props) => <EditOrder {...props} />}
      />
      <Route
        path={`${match.url}/edit-order/assign-group/:id`}
        exact
        render={(props) => <AssignGroup {...props} />}
      />
      <Route
        path={`${match.url}/view-order/:id`}
        exact
        render={(props) => <Order {...props} />}
      />
      <Route
        path={`${match.url}/import-bulk-order`}
        exact
        render={(props) => <ImportBulkOrder {...props} />}
      />
      <Route
        path={`${match.url}/import-bulk-orders`}
        exact
        render={(props) => <BulkOrderOptions {...props} />}
      />
      <Route
        path={`${match.url}/warehouses`}
        exact
        render={(props) => <Warehouses {...props} />}
      />
      <Route
        path={`${match.url}/add-warehouse`}
        exact
        render={(props) => <AddWarehouse {...props} />}
      />
      <Route
        path={`${match.url}/edit-warehouse/:id`}
        exact
        render={(props) => <EditWarehouse {...props} />}
      />
      <Route
        path={`${match.url}/view-warehouse/:id`}
        exact
        render={(props) => <ViewWarehouse {...props} />}
      />
      
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

export default Orders;
