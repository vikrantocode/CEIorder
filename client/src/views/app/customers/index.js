import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CustomersList = React.lazy(() =>
  import(/* webpackChunkName: "application-Product" */ './customers/Customers')
)
const AddCustomer = React.lazy(() =>
  import(/* webpackChunkName: "customers-add" */ './customers/AddCustomer')
)
const Customer = React.lazy(() =>
  import(/* webpackChunkName: "customers-add" */ './customers/Customer')
)

const Customers = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/customers`} />
      <Route
        path={`${match.url}/customers`}
        exact
        render={(props) => <CustomersList {...props} />}
      />
      <Route
        path={`${match.url}/add-customer`}
        exact
        render={(props) => <AddCustomer {...props} />}
      />
      <Route
        path={`${match.url}/edit-customer/:id`}
        exact
        render={(props) => <AddCustomer {...props} />}
      />
      <Route
        path={`${match.url}/view-customer/:id`}
        exact
        render={(props) => <Customer {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

export default Customers;
