import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  CardHeader,
  Table,
} from 'reactstrap';
import _, { ceil } from 'lodash';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import axios from 'axios';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {
  Separator,
  Colxx,
} from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { NotificationManager } from '../../../../components/common/react-notifications';
import VendorProductHeading from './VendorProductHeading';
import BrandPageListing from './VendorBrandView';
import VendorProductView from './VendorProductView';
import Button from 'reactstrap/lib/Button';

const VendorDetails = ({ match }) => {
  const [activeTab, setActiveTab] = useState('VENDORINFO');
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandPage, setBrandPage] = useState(1);
  const [brandsPageCount, setBrandsPageCount] = useState(1);
  const [brandCount, setbrandCount] = useState(0);
  const [change, setChange] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const Righticon = 'simple-icon-arrow-right-circle';
  const Lefticon = 'simple-icon-arrow-left-circle';
  const Leftposition = 'left';
  const Rightposition = 'Right';
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/inventory/get-vendor/${id}`)
      .then((res) => {
        console.log(res.data.vendor);
        setData(res.data.vendor);
        setItems(res.data.products);
        setTotalPage(ceil(res.data.productCount / 15));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(`Something Went Wrong`, `Error`, 3000);
        setIsLoading(false);
      });

    axios.get(`/api/inventory/vendor-brands/${id}`).then(({ data }) => {
      console.log(data);
      setBrands(data.data);
      setbrandCount(data.all);
      setBrandsPageCount(data.pageCount);
    });
  }, [change]);

  const onChangeBrandPage = (page) => {
    setBrandPage(page);
    axios
      .get(`/api/inventory/vendor-brands/${id}?page=${page}`)
      .then(({ data }) => {
        setBrands(data.data);
        setbrandCount(data.all);
        setBrandsPageCount(data.pageCount);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(`Something Went Wrong`, `Error`, 3000);
      });
    window.scrollTo(0, 0);
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
    axios
      .get(`/api/inventory/vendor-products/${id}/?page=${page}`)
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(`Something Went Wrong`, `Error`, 3000);
      });
    window.scrollTo(0, 0);
  };

  return isLoading ? (
    <div className="loading"></div>
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>{data.name}</h1>
          <div className="text-zero top-right-button-container">
            <UncontrolledDropdown>
              <Button
                color="primary"
                className="mr-2"
                onClick={() => history.push(`/app/inventory/vendors`)}
              >
                Back
              </Button>
            </UncontrolledDropdown>
          </div>

          <Breadcrumb match={match} />
          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'VENDORINFO',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('VENDORINFO')}
              >
                <IntlMessages id="VENDORINFO" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'ADDRESS',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('ADDRESS')}
              >
                <IntlMessages id="ADDRESS" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'PRODUCTS',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('PRODUCTS')}
              >
                <IntlMessages id="PRODUCTS" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'BRANDS',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('BRANDS')}
              >
                <IntlMessages id="BRANDS" />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="VENDORINFO">
              <Row>
                <Colxx xxs="12" lg="6" className="mb-4">
                  <Card className="mb-4">
                    <CardBody>
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="GENERAL" />
                      </p>
                      <Table>
                        <tbody>
                          {data.name && (
                            <tr>
                              <th scope="row">Vendor Name</th>
                              <td>{data.name}</td>
                            </tr>
                          )}
                          {data.alias && (
                            <tr>
                              <th scope="row">Vendor Alias</th>
                              <td>{data.alias}</td>
                            </tr>
                          )}
                          {data.accountNumber && (
                            <tr>
                              <th scope="row">Vendor Account Number</th>
                              <td>{data.accountNumber}</td>
                            </tr>
                          )}
                          {data.email && (
                            <tr>
                              <th scope="row">Vendor Email</th>
                              <td>{data.email}</td>
                            </tr>
                          )}
                          {data.emailCC && (
                            <tr>
                              <th scope="row">Vendor Email CC</th>
                              <td>{data.emailCC}</td>
                            </tr>
                          )}
                          {data.website && (
                            <tr>
                              <th scope="row">Vendor Website</th>
                              <td>{data.website}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-4">
                  <Card className="mb-4">
                    <CardBody>
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="PAYMENT" />
                      </p>
                      <i
                        className={Righticon}
                        style={{
                          float: Rightposition,
                          fontSize: 35,
                          color: '#922c88',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setActiveTab('ADDRESS');
                          window.scrollTo(0, 0);
                        }}
                      />
                      <Table>
                        <tbody>
                          {data.paymentTerm && (
                            <tr>
                              <th scope="row">Payment Term</th>
                              <td>{data.paymentTerm}</td>
                            </tr>
                          )}
                          {data.restockPast && (
                            <tr>
                              <th scope="row">Restock Past</th>
                              <td>{data.restockPast}</td>
                            </tr>
                          )}
                          {data.restockFuture && (
                            <tr>
                              <th scope="row">Restock Future</th>
                              <td>{data.restockFuture}</td>
                            </tr>
                          )}
                          {data.freeShippingOver && (
                            <tr>
                              <th scope="row">Free Shipping Over</th>
                              <td>{data.freeShippingOver}</td>
                            </tr>
                          )}
                          {data.smallOrderThreshold && (
                            <tr>
                              <th scope="row">Small Order Threshold</th>
                              <td>{data.smallOrderThreshold}</td>
                            </tr>
                          )}
                          {data.leadTimeToShip && (
                            <tr>
                              <th scope="row">Lead Time To Ship</th>
                              <td>{data.leadTimeToShip}</td>
                            </tr>
                          )}
                          {data.alias && (
                            <tr>
                              <th scope="row">Vendor Alias</th>
                              <td>{data.alias}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Colxx>
                {data.warehouses && (
                  <Colxx xxs="12" lg="6" className="mb-4">
                    <Card className="mb-4">
                      <CardBody>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="WAREHOUSES" />
                        </p>
                        {data.warehouses.map((warehouse, i) => (
                          <>
                            <p className="text-small mt-3">
                              <IntlMessages id={`WAREHOUSE : ${i + 1}`} />
                            </p>
                            <Table>
                              <tbody>
                                {warehouse.name && (
                                  <tr>
                                    <th scope="row">Warehouse Name</th>
                                    <td
                                      style={{ cursor: 'pointer' }}
                                      onClick={() =>
                                        history.push(
                                          `/app/orders/view-warehouse/${warehouse.id}`
                                        )
                                      }
                                    >
                                      {warehouse.name}
                                    </td>
                                  </tr>
                                )}
                                {warehouse.type && (
                                  <tr>
                                    <th scope="row">Warehouse Type</th>
                                    <td>{warehouse.type}</td>
                                  </tr>
                                )}
                                {warehouse.handlingTime && (
                                  <tr>
                                    <th scope="row">Handling Time (in Days)</th>
                                    <td>{warehouse.handlingTime}</td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </>
                        ))}
                      </CardBody>
                    </Card>
                  </Colxx>
                )}
              </Row>
            </TabPane>
            <TabPane tabId="ADDRESS">
              <Row>
                <Colxx xxs="12" lg="6" className="mb-4">
                  <Card className="mb-4">
                    <CardBody>
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="BILLING ADDRESS" />
                      </p>

                      <Table>
                        <tbody>
                          {data?.vendorAddress?.billingFirstName && (
                            <tr>
                              <th scope="row">Billing First Name</th>
                              <td>{data.vendorAddress.billingFirstName}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.billingLastName && (
                            <tr>
                              <th scope="row">Billing Last Name</th>
                              <td>{data.vendorAddress.billingLastName}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.billingBusiness && (
                            <tr>
                              <th scope="row">Billing Business</th>
                              <td>{data.vendorAddress.billingBusiness}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.billingCountry && (
                            <tr>
                              <th scope="row">Billing Country</th>
                              <td>{data.vendorAddress.billingCountry}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.billingAddress && (
                            <tr>
                              <th scope="row">Billing Adress</th>
                              <td>{data.vendorAddress.billingAddress}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.billingZipCode && (
                            <tr>
                              <th scope="row">Billing Zip Code</th>
                              <td>{data.vendorAddress.billingZipCode}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.billingCity && (
                            <tr>
                              <th scope="row">Billing City</th>
                              <td>{data.vendorAddress.billingCity}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.billingState && (
                            <tr>
                              <th scope="row">Billing State</th>
                              <td>{data.vendorAddress.billingState}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.billingPhone && (
                            <tr>
                              <th scope="row">Billing Phone</th>
                              <td>{data.vendorAddress.billingPhone}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.billingFax && (
                            <tr>
                              <th scope="row">Billing FAX</th>
                              <td>{data.vendorAddress.billingFax}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>

                      <i
                        className={Lefticon}
                        style={{
                          float: Leftposition,
                          fontSize: 35,
                          color: '#922c88',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setActiveTab('VENDORINFO');
                          window.scrollTo(0, 0);
                        }}
                      />
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-4">
                  <Card className="mb-4">
                    <CardBody>
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="SHIPPING ADDRESS" />
                      </p>

                      <Table>
                        <tbody>
                          {data?.vendorAddress?.shippingFirstName && (
                            <tr>
                              <th scope="row">Shipping First Name</th>
                              <td>{data.vendorAddress.shippingFirstName}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.shippingLastName && (
                            <tr>
                              <th scope="row">Shipping Last Name</th>
                              <td>{data.vendorAddress.shippingLastName}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.shippingBusiness && (
                            <tr>
                              <th scope="row">Shipping Business</th>
                              <td>{data.vendorAddress.shippingBusiness}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.shippingCountry && (
                            <tr>
                              <th scope="row">Shipping Country</th>
                              <td>{data.vendorAddress.shippingCountry}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.shippingAddress && (
                            <tr>
                              <th scope="row">Shipping Adress</th>
                              <td>{data.vendorAddress.shippingAddress}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.shippingZipCode && (
                            <tr>
                              <th scope="row">Shipping Zip Code</th>
                              <td>{data.vendorAddress.shippingZipCode}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.shippingCity && (
                            <tr>
                              <th scope="row">Shipping City</th>
                              <td>{data.vendorAddress.shippingCity}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.shippingState && (
                            <tr>
                              <th scope="row">Shipping State</th>
                              <td>{data.vendorAddress.shippingState}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.shippingPhone && (
                            <tr>
                              <th scope="row">Shipping Phone</th>
                              <td>{data.vendorAddress.shippingPhone}</td>
                            </tr>
                          )}
                          {data?.vendorAddress?.shippingFax && (
                            <tr>
                              <th scope="row">Shipping FAX</th>
                              <td>{data.vendorAddress.shippingFax}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>

                      <i
                        className={Righticon}
                        style={{
                          float: Rightposition,
                          fontSize: 35,
                          color: '#922c88',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setActiveTab('PRODUCTS');
                          window.scrollTo(0, 0);
                        }}
                      />
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </TabPane>
            <TabPane tabId="PRODUCTS">
              <Card>
                <CardBody style={{ display: 'grid', placeItems: 'center' }}>
                  {items.length ? (
                    <>
                      <h3 className="text-center mb-4 h2">
                        {' '}
                        Product(s) offered by this Vendor.{' '}
                      </h3>
                      <VendorProductView
                        items={items}
                        currentPage={currentPage}
                        onChangePage={onChangePage}
                        totalPage={totalPage}
                      />
                    </>
                  ) : (
                    <h3 className="text-center h2">
                      {' '}
                      There is No Product by this Vendor.{' '}
                    </h3>
                  )}
                </CardBody>
                <i
                  className={Lefticon}
                  style={{
                    float: Leftposition,
                    fontSize: 35,
                    color: '#922c88',
                    cursor: 'pointer',
                    margin: 10,
                  }}
                  onClick={() => {
                    setActiveTab('ADDRESS');
                    window.scrollTo(0, 0);
                  }}
                />
              </Card>
            </TabPane>
            <TabPane tabId="BRANDS">
              <Card>
                <CardBody style={{ display: 'grid', placeItems: 'center' }}>
                  {items.length ? (
                    <>
                      <h3 className="text-center mb-4 h2">
                        {' '}
                        Brand(s) offered by this Vendor.{' '}
                      </h3>
                      <BrandPageListing
                        items={brands}
                        currentPage={brandPage}
                        onChangePage={onChangeBrandPage}
                        totalPage={brandsPageCount}
                      />
                    </>
                  ) : (
                    <h3 className="text-center h2">
                      {' '}
                      There is No Brand by this Vendor.{' '}
                    </h3>
                  )}
                </CardBody>
                <i
                  className={Lefticon}
                  style={{
                    float: Leftposition,
                    fontSize: 35,
                    color: '#922c88',
                    cursor: 'pointer',
                    margin: 10,
                  }}
                  onClick={() => {
                    setActiveTab('ADDRESS');
                    window.scrollTo(0, 0);
                  }}
                />
              </Card>
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(VendorDetails);
