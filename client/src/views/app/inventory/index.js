import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import EditProduct from './Products/EditProduct';
import VendorDetails from './vendor/VendorDetails';

const Products = React.lazy(() =>
  import(/* webpackChunkName: "application-Product" */ './Products/Products')
);
const Product = React.lazy(() =>
  import(/* webpackChunkName: "application-Product" */ './Products/Product')
);
const ProductType = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './ProductTypes/ProductType')
);
const Variant = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './Variants/Variant')
);
const Category = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './Categories/Category')
);
const ProductGroups = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './ProductGroups/ProductGroups')
);
// const SurveyDetail = React.lazy(() =>
//   import(/* webpackChunkName: "application-survey-detail" */ './survey-detail')
// );
// const Chat = React.lazy(() =>
//   import(/* webpackChunkName: "application-chat" */ './chat')
// );
const Newproduct = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './Products/CreateNewProduct')
);
const NewType = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './ProductTypes/CreateNewType')
);
const UploadImg = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './Products/uploadProductImage')
);
const Vendor = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './vendor/vendor')
);
const AddVendor = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './vendor/AddNewVendor')
);
const VendorProductList = React.lazy(() =>
  import(/* webpackChunkName: "application-Product" */ './vendor/vendorProductList')
);
const Brand = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './brands/brand')
);
const ArchiveProducts = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './ArchiveProducts/ArchiveProducts')
);

const Inventory = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/products`} />
      <Route
        path={`${match.url}/products`}
        exact
        render={(props) => <Products {...props} />}
      />
      <Route
        path={`${match.url}/products/detail/:id`}
        exact
        render={(props) => <Product {...props} />}
      />
      <Route
        path={`${match.url}/products/edit`}
        render={(props) => <EditProduct {...props} />}
      />
      <Route
        path={`${match.url}/add-new-product`}
        render={(props) => <Newproduct {...props} />}
      />
      {/* <Route
        path={`${match.url}/survey/:surveyid`}
        render={(props) => <SurveyDetail {...props} />}
        isExact
      /> */}
      <Route
        path={`${match.url}/archive-products`}
        render={(props) => <ArchiveProducts {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/product-types`}
        render={(props) => <ProductType {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/add-new-type`}
        render={(props) => <NewType {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/variants`}
        render={(props) => <Variant {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/categories`}
        render={(props) => <Category {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/product-groups`}
        render={(props) => <ProductGroups {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/upload_img`}
        render={(props) => <UploadImg {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/vendors/detail/:id`}
        render={(props) => <VendorDetails {...props} />}
        isExact={true}
      />
      <Route
        path={`${match.url}/vendors`}
        render={(props) => <Vendor {...props} />}
        isExact={true}
      />
      <Route
        path={`${match.url}/add-new-vendor`}
        render={(props) => <AddVendor {...props} />}
        isExact={true}
      />
      <Route
        path={`${match.url}/edit-vendor/:id`}
        render={(props) => <AddVendor {...props} />}
        isExact={true}
      />
      <Route
        path={`${match.url}/brands`}
        render={(props) => <Brand {...props} />}
        isExact
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Inventory;
