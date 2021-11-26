import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Row,
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Table,
  TabPane,
  Button,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Separator,
  Colxx,
} from '../../../../components/common/CustomBootstrap';

const dummyItems = [
  { key: 1, id: 1, name: 'Laptop', label: 'Laptop', price: 45000, qty: 7 },
  { key: 2, id: 2, name: 'Mobile', label: 'Mobile', price: 15000, qty: 3 },
  { key: 3, id: 3, name: 'Watch', label: 'Watch', price: 2000, qty: 2 },
  { key: 4, id: 4, name: 'Desktop', label: 'Desktop', price: 25000, qty: 7 },
  { key: 5, id: 5, name: 'Paper Set', label: 'Paper Set', price: 200, qty: 5 },
];

const Order = ({ match }) => {
  const history = useHistory();
  const [id, setId] = useState(0);
  const [activeTab, setActiveTab] = useState('basic');
  const [data, setData] = useState({});
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [giftWrapCharge, setGiftWrapCharge] = useState();
  const [handlingFee, setHandlingFee] = useState();

  useEffect(() => {
    setId(match.params.id);
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/orders/details/${match.params.id}`
      );
      setOrder(data);
      console.log(data);
      setOrderItems(data.orderItems);
      const { data: customer } = await axios.get(
        `/api/customers/details/${data.customerId}`
      );
      setCustomer(customer.customer);
      setIsLoading(false);
    })();
    const handlingFee = 0;
    const giftWrapCharge = 0;
    for (let item of orderItems) {
      handlingFee += item.handlingFee;
      giftWrapCharge += item.giftWrapCharge;
    }
    setGiftWrapCharge(giftWrapCharge);
    setHandlingFee(handlingFee);
    setData({ items: dummyItems });
  }, []);
  console.log(order, "------------------------------order-----------------------------")
  console.log(order?.paymentDetail?.orderDiscountsTotal,"---------------orderDiscountsTotal---------------")
  return isLoading ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading={`Order Id : ${id}`} match={match} />
          <div className="text-zero top-right-button-container">
            <Button
              color="info"
              size="lg"
              outline
              className="top-right-button"
              onClick={() => {
                history.push('/app/orders');
              }}
            >
              <IntlMessages id="Back" />
            </Button>
            {'  '}
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Card className="mb-4">
        <CardHeader>
          <Nav tabs className="card-header-tabs ">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'basic',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('basic')}
                to="#"
                location={{}}
              >
                <IntlMessages id="Basic" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'Customer',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('Customer')}
                to="#"
                location={{}}
              >
                <IntlMessages id="Customer" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'Items',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('Items')}
                to="#"
                location={{}}
              >
                <IntlMessages id="Items" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'Addresses',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('Addresses')}
                to="#"
                location={{}}
              >
                <IntlMessages id="Addresses" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'Payment',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('Payment')}
                to="#"
                location={{}}
              >
                <IntlMessages id="Payment" />
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="basic">
            <Row>
              <Colxx sm="12">
                <CardBody>
                  <h4 className="mb-5">Basic Details</h4>
                  <Row>
                    <Colxx sm="12" xl="6">
                      <Table hover>
                        <tbody>
                          {order.orderSource && (
                            <tr>
                              <th scope="row">Order Source</th>
                              <td>{order.orderSource}</td>
                            </tr>
                          )}
                          {order.orderSourceOrderId && (
                            <tr>
                              <th scope="row">Order Source Order Id</th>
                              <td>{order.orderSourceOrderId}</td>
                            </tr>
                          )}
                          <tr>
                            <th scope="row">Dropship</th>
                            <td>
                              {order.dropShip
                                ? order.dropShip
                                : 'Not Specified'}
                            </td>
                          </tr>
                          {order.packageType && (
                            <tr>
                              <th scope="row">Package Type</th>
                              <td>{order.packageType}</td>
                            </tr>
                          )}
                          {order.deliveryDate && (
                            <tr>
                              <th scope="row">Delivery Date</th>
                              <td>{order.deliveryDate}</td>
                            </tr>
                          )}
                          {order?.status && (
                            <tr>
                              <th scope="row">Status</th>
                              <td>{order?.status}</td>
                            </tr>
                          )}
                          {order.eBaySalesRecordNumber && (
                            <tr>
                              <th scope="row">eBay Sales Record Number</th>
                              <td>{order.eBaySalesRecordNumber}</td>
                            </tr>
                          )}
                          {order?.serialNumber && (
                            <tr>
                              <th scope="row">Serial Number</th>
                              <td>{order?.serialNumber}</td>
                            </tr>
                          )}
                          {order.trackingNumber && (
                            <tr>
                              <th scope="row">Tracking Number</th>
                              <td>{order.trackingNumber}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      {order.isRushOrder && (
                        <div className="badge badge-pill badge-danger">
                          Rush Order
                        </div>
                      )}
                    </Colxx>
                    <Colxx sm="12" xl="6">
                      <Table>
                        <tbody>
                          {order.disputeStartedOn && (
                            <tr>
                              <th scope="row">Dispute Started On</th>
                              <td>{order.disputeStartedOn}</td>
                            </tr>
                          )}
                          {order.isInDispute && (
                            <tr>
                              <th scope="row">Is In Dispute</th>
                              <td>{order.isInDispute}</td>
                            </tr>
                          )}
                          {order.locationNotes && (
                            <tr>
                              <th scope="row">Location Notes</th>
                              <td>{order.locationNotes}</td>
                            </tr>
                          )}
                          {order?.siteCode && (
                            <tr>
                              <th scope="row">Site Code</th>
                              <td>{order?.siteCode}</td>
                            </tr>
                          )}
                          {order.googleOrderNumber && (
                            <tr>
                              <th scope="row">Google Order Number</th>
                              <td>{order.googleOrderNumber}</td>
                            </tr>
                          )}
                          {order.customerServiceStatus && (
                            <tr>
                              <th scope="row">Customer Service Status</th>
                              <td>{order.customerServiceStatus}</td>
                            </tr>
                          )}
                          {order.invoicePrinted && (
                            <tr>
                              <th scope="row">Invoice Printed</th>
                              <td>{order.invoicePrinted}</td>
                            </tr>
                          )}
                          {order.invoicePrintedDate && (
                            <tr>
                              <th scope="row">Invoice Printed Date</th>
                              <td>{order.invoicePrintedDate}</td>
                            </tr>
                          )}

                          {order.timeOfOrder && (
                            <tr>
                              <th scope="row">Time Of Order</th>
                              <td>
                                {order.timeOfOrder?.substr(
                                  0,
                                  order.timeOfOrder.indexOf('T')
                                )}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Colxx>
                  </Row>
                </CardBody>
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="Customer">
            <Row>
              <Colxx sm="12">
                <CardBody>
                  <h4 className="mb-5">Customer Details</h4>
                  <Row>
                    <Colxx sm="12" xl="12">
                      <Table hover>
                        <tbody>
                          {customer.id && (
                            <tr>
                              <th scope="row">Customer Id</th>
                              <td>{customer.id}</td>
                            </tr>
                          )}
                          {customer.firstName && (
                            <tr>
                              <th scope="row">Customer Name</th>
                              <td>{`${customer.firstName} ${customer.lastName}`}</td>
                            </tr>
                          )}
                          {customer.email && (
                            <tr>
                              <th scope="row">Customer Email</th>
                              <td>{customer.email}</td>
                            </tr>
                          )}
                          {customer.phone && (
                            <tr>
                              <th scope="row">Customer Contact Number</th>
                              <td> {customer.phone}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Colxx>
                  </Row>
                </CardBody>
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="Items">
            <Row>
              <Colxx sm="12">
                <CardBody>
                  <h4 className="mb-5">Items Details</h4>
                  <Row>
                    <Colxx xs="12" xl="12">
                      <Table>
                        <tbody>
                          {orderItems.map((item, i) => (
                            <tr key={item.id}>
                              <th scope="row">Id</th>
                              <td>{item.id}</td>
                              <th scope="row">Name</th>
                              <td
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                  window.open(
                                    `/app/inventory/products/detail/${item.id}`,
                                    '_blank'
                                  )
                                }
                              >
                                {order.products[i].description25Char}
                              </td>
                              <th scope="row">Price</th>
                              <td>{item.adjustedUnitPrice}</td>
                              <th scope="row">Quantity</th>
                              <td>{item.qty}</td>
                              <th scope="row">Item Total</th>
                              <td>{item.adjustedUnitPrice * item.qty}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Colxx>
                  </Row>
                </CardBody>
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="Addresses">
            <Row>
              <Colxx sm="12">
                <CardBody>
                  <Row>
                    <Colxx sm="12" xl="6">
                      <h4 className="my-4">Billing Address</h4>
                      <Table hover>
                        <tbody>
                          {order?.billingDetail?.billingTotal && (
                            <tr>
                              <th scope="row">Billing Total</th>
                              <td>{order?.billingDetail?.billingTotal}</td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingDiscountsTotal && (
                            <tr>
                              <th scope="row">Billing Discounts Total</th>
                              <td>
                                {order?.billingDetail?.billingDiscountsTotal}
                              </td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingDate && (
                            <tr>
                              <th scope="row">Billing Date</th>
                              <td>{order?.billingDetail?.billingDate}</td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingFirstName && (
                            <tr>
                              <th scope="row">Billing First Name</th>
                              <td>{order?.billingDetail?.billingFirstName}</td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingLastName && (
                            <tr>
                              <th scope="row">Billing Last Name</th>
                              <td>{order?.billingDetail?.billingLastName}</td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingCompanyName && (
                            <tr>
                              <th scope="row">Billing Company Name</th>
                              <td>
                                {order?.billingDetail?.billingCompanyName}
                              </td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingAddress1 && (
                            <tr>
                              <th scope="row">Billing Address 1</th>
                              <td>{order?.billingDetail?.billingAddress1}</td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingAddress2 && (
                            <tr>
                              <th scope="row">Billing Address 2</th>
                              <td>{order?.billingDetail?.billingAddress2}</td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingCity && (
                            <tr>
                              <th scope="row">Billing City</th>
                              <td>{order?.billingDetail?.billingCity}</td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingState && (
                            <tr>
                              <th scope="row">Billing State</th>
                              <td>{order?.billingDetail?.billingState}</td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingZipCode && (
                            <tr>
                              <th scope="row">Billing Zip Code</th>
                              <td>{order?.billingDetail?.billingZipCode}</td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingCountry && (
                            <tr>
                              <th scope="row">Billing Country</th>
                              <td>{order?.billingDetail?.billingCountry}</td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingPhoneNumber && (
                            <tr>
                              <th scope="row">Billing Phone Number</th>
                              <td>
                                {order?.billingDetail?.billingPhoneNumber}
                              </td>
                            </tr>
                          )}
                          {order?.billingDetail?.billingMethodSelected && (
                            <tr>
                              <th scope="row">Billing Method Selected</th>
                              <td>
                                {order?.billingDetail?.billingMethodSelected}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Colxx>
                    <Colxx sm="12" xl="6">
                      <h4 className="my-4">Shipping Address</h4>
                      <Table>
                        <tbody>
                          {order?.shippingDetail?.shippingTotal && (
                            <tr>
                              <th scope="row">Shipping Total</th>
                              <td>{order?.shippingDetail?.shippingTotal}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shippingDiscountsTotal && (
                            <tr>
                              <th scope="row">Shipping Discounts Total</th>
                              <td>
                                {order?.shippingDetail?.shippingDiscountsTotal}
                              </td>
                            </tr>
                          )}
                          {order?.shippingDetail?.dropShipFeeTotal && (
                            <tr>
                              <th scope="row">Drop Ship Fee Total</th>
                              <td>{order?.shippingDetail?.dropShipFeeTotal}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shippingDate && (
                            <tr>
                              <th scope="row">Shipping Date</th>
                              <td>{order?.shippingDetail?.shippingDate}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shipFirstName && (
                            <tr>
                              <th scope="row">Ship First Name</th>
                              <td>{order?.shippingDetail?.shipFirstName}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shippingLastName && (
                            <tr>
                              <th scope="row">Shipping Last Name</th>
                              <td>{order?.shippingDetail?.shippingLastName}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shipCompanyName && (
                            <tr>
                              <th scope="row">Ship Company Name</th>
                              <td>{order?.shippingDetail?.shipCompanyName}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shipAddress1 && (
                            <tr>
                              <th scope="row">Ship Address 1</th>
                              <td>{order?.shippingDetail?.shipAddress1}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shipAddress2 && (
                            <tr>
                              <th scope="row">Ship Address 2</th>
                              <td>{order?.shippingDetail?.shipAddress2}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shipCity && (
                            <tr>
                              <th scope="row">Ship City</th>
                              <td>{order?.shippingDetail?.shipCity}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shipState && (
                            <tr>
                              <th scope="row">Ship State</th>
                              <td>{order?.shippingDetail?.shipState}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shipZipCode && (
                            <tr>
                              <th scope="row">Ship Zip Code</th>
                              <td>{order?.shippingDetail?.shipZipCode}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shipCountry && (
                            <tr>
                              <th scope="row">Ship Country</th>
                              <td>{order?.shippingDetail?.shipCountry}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shipPhoneNumber && (
                            <tr>
                              <th scope="row">Ship Phone Number</th>
                              <td>{order?.shippingDetail?.shipPhoneNumber}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shippingMethodSelected && (
                            <tr>
                              <th scope="row">Shipping Method Selected</th>
                              <td>
                                {order?.shippingDetail?.shippingMethodSelected}
                              </td>
                            </tr>
                          )}
                          {order?.shippingDetail?.companyId && (
                            <tr>
                              <th scope="row">Company Id</th>
                              <td>{order?.shippingDetail?.companyId}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shippingCarrier && (
                            <tr>
                              <th scope="row">Shipping Carrier</th>
                              <td>{order?.shippingDetail?.shippingCarrier}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shippedBy && (
                            <tr>
                              <th scope="row">Shipped By</th>
                              <td>{order?.shippingDetail?.shippedBy}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shipFromWarehouse && (
                            <tr>
                              <th scope="row">Ship From Warehouse</th>
                              <td>
                                {order?.shippingDetail?.shipFromWarehouse}
                              </td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shippingFee && (
                            <tr>
                              <th scope="row">Shipping Fee</th>
                              <td>{order?.shippingDetail?.shippingFee}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.originalShippingCost && (
                            <tr>
                              <th scope="row">Original Shipping Cost</th>
                              <td>
                                {order?.shippingDetail?.originalShippingCost}
                              </td>
                            </tr>
                          )}
                          {order?.shippingDetail?.adjustedShippingCost && (
                            <tr>
                              <th scope="row">Adjusted Shipping Cost</th>
                              <td>
                                {order?.shippingDetail?.adjustedShippingCost}
                              </td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shippingWeightTotalOz && (
                            <tr>
                              <th scope="row">Shipping Weight Total Oz</th>
                              <td>
                                {order?.shippingDetail?.shippingWeightTotalOz}
                              </td>
                            </tr>
                          )}
                          {order?.shippingDetail?.shippingStatus && (
                            <tr>
                              <th scope="row">Shipping Status</th>
                              <td>{order?.shippingDetail?.shippingStatus}</td>
                            </tr>
                          )}
                          {order?.shippingDetail?.stationId && (
                            <tr>
                              <th scope="row">Station Id</th>
                              <td>{order?.shippingDetail?.stationId}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Colxx>
                  </Row>
                </CardBody>
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="Payment">
            <Row>
              <Colxx sm="12">
                <CardBody>
                  <h4 className="mb-5">Payment Details</h4>
                  <Row>
                    <Colxx xs="12" xl="12">
                      <Table>
                        <tbody>
                          {order?.paymentDetail?.paymentStatus && (
                            <tr>
                              <th scope="row">Payment Status</th>
                              <td>{order?.paymentDetail?.paymentStatus}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.payementDate && (
                            <tr>
                              <th scope="row">Payement Date</th>
                              <td>{order?.paymentDetail?.payementDate}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.paymentReferenceNumber && (
                            <tr>
                              <th scope="row">Payment Reference Number</th>
                              <td>
                                {order?.paymentDetail?.paymentReferenceNumber}
                              </td>
                            </tr>
                          )}
                          {order?.paymentDetail?.paymentMethod && (
                            <tr>
                              <th scope="row">Payment Method</th>
                              <td>{order?.paymentDetail?.paymentMethod}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.orderCurrency && (
                            <tr>
                              <th scope="row">Order Currency</th>
                              <td>{order?.paymentDetail?.orderCurrency}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.orderDiscountsTotal && (
                            <tr>
                              <th scope="row">Order Discounts Total</th>
                              <td>
                                {order?.paymentDetail?.orderDiscountsTotal}
                              </td>
                            </tr>
                          )}
                          {order?.paymentDetail?.insuranceTotal && (
                            <tr>
                              <th scope="row">Insurance Total</th>
                              <td>{order?.paymentDetail?.insuranceTotal}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.subTotal && (
                            <tr>
                              <th scope="row">Sub Total</th>
                              <td>{order?.paymentDetail?.subTotal}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.grandTotal && (
                            <tr>
                              <th scope="row">Grand Total</th>
                              <td>{order?.paymentDetail?.grandTotal}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.taxRate && (
                            <tr>
                              <th scope="row">Tax Rate</th>
                              <td>{order?.paymentDetail?.taxRate}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.taxTotal && (
                            <tr>
                              <th scope="row">Tax Total</th>
                              <td>{order?.paymentDetail?.taxTotal}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.lineTotal && (
                            <tr>
                              <th scope="row">Line Total</th>
                              <td>{order?.paymentDetail?.lineTotal}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.finalValueTotal && (
                            <tr>
                              <th scope="row">Final Value Total</th>
                              <td>{order?.paymentDetail?.finalValueTotal}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.postingFeeTotal && (
                            <tr>
                              <th scope="row">Posting Fee Total</th>
                              <td>{order?.paymentDetail?.postingFeeTotal}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.payPalFeeTotal && (
                            <tr>
                              <th scope="row">PayPal Fee Total</th>
                              <td>{order?.paymentDetail?.payPalFeeTotal}</td>
                            </tr>
                          )}
                          {order?.paymentDetail?.orderSourceTotal && (
                            <tr>
                              <th scope="row">Order Source Total</th>
                              <td>{order?.paymentDetail?.orderSourceTotal}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      <Table className="mt-4">
                        <tbody>
                          <tr>
                            <th scope="row">Id</th>
                            <th scope="row">Name</th>
                            <th scope="row">Price</th>
                            <th scope="row">Quantity</th>
                            <th scope="row">Item Total</th>
                          </tr>
                          {orderItems.map((item, i) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{order.products[i].description25Char}</td>
                              <td>{item.adjustedUnitPrice}</td>
                              <td>{item.qty}</td>
                              <td>{item.adjustedUnitPrice * item.qty}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Colxx>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <Table>
                        <tbody>
                          <tr>
                            <th>Sub Total : </th>
                            <td>
                              ${' '}
                              {order?.paymentDetail?.subTotal
                                ? order?.paymentDetail?.subTotal
                                : '0.00'}{' '}
                            </td>
                          </tr>
                          <tr>
                            <th>Discount : </th>
                            <td>
                              ${' '}
                              {order?.paymentDetail?.orderDiscountsTotal
                                ? order?.paymentDetail?.orderDiscountsTotal
                                : '0.00'}
                            </td>
                          </tr>
                          <tr>
                            <th>Shipping Discount : </th>
                            <td>
                              ${' '}
                              {order?.shippingDetail?.shippingDiscountsTotal
                                ? order?.shippingDetail?.shippingDiscountsTotal
                                : '0.00'}
                            </td>
                          </tr>
                          <tr>
                            <th>Tax : </th>
                            <td>
                              ${' '}
                              {order?.paymentDetail?.taxTotal
                                ? order?.paymentDetail?.taxTotal
                                : '0.00'}
                            </td>
                          </tr>
                          <tr>
                            <th>Shipping : </th>
                            <td>
                              ${' '}
                              {order?.shippingDetail?.shippingTotal
                                ? order?.shippingDetail?.shippingTotal
                                : '0.00'}
                            </td>
                          </tr>
                          <tr>
                            <th>Handling Fee: </th>
                            <td> $ {handlingFee ? handlingFee : '0.00'}</td>
                          </tr>
                          <tr>
                            <th>Insurance : </th>
                            <td>
                              ${' '}
                              {order?.paymentDetail?.insuranceTotal
                                ? order?.paymentDetail?.insuranceTotal
                                : '0.00'}
                            </td>
                          </tr>
                          <tr>
                            <th>Gift Wrap: </th>
                            <td>
                              {' '}
                              $ {giftWrapCharge ? giftWrapCharge : '0.00'}
                            </td>
                          </tr>
                          <tr style={{ borderTop: '3px solid black' }}>
                            <th>Grand Total</th>
                            <td>
                              ${' '}
                              {order?.paymentDetail?.grandTotal
                                ? order?.paymentDetail?.grandTotal
                                : '0.00'}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Colxx>
            </Row>
          </TabPane>
        </TabContent>
      </Card>
    </>
  );
};

export default Order;
