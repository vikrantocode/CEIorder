import React, { useState, useEffect } from 'react';
import { Row, Button, Col, Label, Input, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import { FaEye } from 'react-icons/fa';
import { useHistory } from 'react-router';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import IntlMessages from '../../../../helpers/IntlMessages';
import { NotificationManager } from '../../../../components/common/react-notifications';

const orderSources = [
  { value: 'eBayOrder', label: 'eBayOrder' },
  { value: 'Amazon', label: 'Amazon' },
];

const statusOptions = [
  { value: 'InProgress', label: 'InProgress' },
  { value: 'Cancelled', label: 'Cancelled' },
  { value: 'Delivered', label: 'Delivered' },
];

//! Temporary Dummy Data
const operationOptions = [
  { label: '', value: '' },
  { label: 'Override Shipping Delivery Status', value: 'Move to Order Group' },
  { label: 'Save Searches', value: 'Save Searches' },
  { label: 'Add to Order Group', value: 'Add to Order Group' },
  { label: 'Remove from Order Group', value: 'Remove from Order Group' },
  { label: 'Manage Payments', value: 'Move to Order Group' },
  { label: 'Set Final Sale', value: 'Move to Order Group' },
  { label: 'Split Order', value: 'Move to Order Group' },
  { label: 'Create Duplicate Order', value: 'Move to Order Group' },
  { label: 'Create Related Order', value: 'Move to Order Group' },
  { label: 'Create Replacement Order', value: 'Move to Order Group' },
  { label: 'Manage Serial Numbers', value: 'Move to Order Group' },
  { label: 'Refresh Status from FBA', value: 'Move to Order Group' },
];

const dummyCurrency = [
  { label: 'INR : Indian Rupee', value: 'INR' },
  { label: 'USD : United States Dollar', value: 'USD' },
  { label: 'UKD : United Kingdom Dollar', value: 'UKD' },
  { label: 'JY : Japeneese Yen', value: 'JY' },
  { label: 'EA : Euro', value: 'EA' },
  { label: 'AED : Arab Emirates Dinar', value: 'AED' },
];

const dummyMasters = [
  { label: 'Rachael', value: 'Rachael' },
  { label: 'Pietro', value: 'Pietro' },
  { label: 'Johnathan', value: 'Johnathan' },
  { label: 'Benekee', value: 'Benekee' },
];

const dummyPriceLists = [
  { label: 'Wholesale', value: 'Wholesale' },
  { label: 'Retail', value: 'Retail' },
  { label: 'Stock', value: 'Stock' },
];

const dummyBillOptions = [
  { label: 'Tax Inclusive', value: 'Tax Inclusive' },
  { label: 'Tax Exclusive', value: 'Tax Exclusive' },
  { label: 'N/A', value: 'N/A' },
];

const dummyItems = [
  { key: 1, id: 1, label: 'Paid', value: 'Paid' },
  { key: 2, id: 2, label: 'Pending', value: 'Pending' },
  { key: 3, id: 3, label: 'Partially Paid', value: 'Partially Paid' },
  { key: 4, id: 4, label: 'EMI', value: 'EMI' },
  { key: 5, id: 5, label: 'Check / DD', value: 'Check / DD' },
];

const dummyShipping = [
  { key: 2, id: 2, label: 'Packed', value: 'Packed' },
  { key: 1, id: 1, label: 'Shipped', value: 'Shipped' },
  { key: 3, id: 3, label: 'Delivered', value: 'Delivered' },
  { key: 4, id: 4, label: 'Returned', value: 'Returned' },
];

const AddOrder = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [customer, setCustomer] = useState({});
  const [customers, setCustomers] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({});
  const [subTotal, setSubTotal] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [taxTotal, setTaxTotal] = useState();
  const [shippingCost, setShippingCost] = useState();

  const history = useHistory();

  useEffect(() => {
    let price = 0;
    if (orderItems)
      orderItems.map((item) => {
        item.qty = item.qty || 0;
        price += item.qty * item.listPrice;
      });
    else price = 0;
    setSubTotal(price);
    let totalPrice = 0;
    let tempTaxTotal = 0;
    let tempShippingTotal = 0;
    if (taxTotal) {
      tempTaxTotal = parseFloat(taxTotal);
    } else {
      tempTaxTotal = 0;
    }
    if (shippingCost) {
      tempShippingTotal = parseFloat(shippingCost);
    } else {
      tempShippingTotal = 0;
    }
    totalPrice = price + tempTaxTotal + tempShippingTotal;
    setGrandTotal(totalPrice);
    setFormData({
      ...formData,
      grandTotal: totalPrice,
      subTotal: price,
      taxTotal: tempTaxTotal,
      shippingCost: tempShippingTotal,
    });
  }, [orderItems, shippingCost, taxTotal]);

  //? Method
  const handleProductSearch = async (e) => {
    if (e.keyCode === 13) {
      const searchItem = e.target.value;
      const { data: products } = await axios.get(
        `/api/inventory/search-products-minimal?searchItem=${searchItem}`
      );
      const data = products.map((item) => {
        const tempItem = {};
        tempItem.label = `${item.itemNumber} :: ${item.upc.UPCRetail} :: ${item.description25Char}`;
        tempItem.value = item.id;
        tempItem.listPrice = item.pricesAndCost.listPrice;
        tempItem.costColumn1Price = item.pricesAndCost.costColumn1Price;
        tempItem.unitOfMeasure = item.pricesAndCost.unitOfMeasure;
        tempItem.UPCRetail = item.upc.UPCRetail;
        return tempItem;
      });
      setProducts(data);
    }
  };

  const handleCustomerSearch = async (e) => {
    if (e.keyCode === 13) {
      const searchItem = e.target.value;
      const { data: customers } = await axios.get(
        `/api/customers/search?searchItem=${searchItem}`
      );
      const data = customers.map((customer) => {
        const tempCustomer = {};
        tempCustomer.label = `${customer.firstName} ${customer.lastName}`;
        tempCustomer.value = customer.id;
        tempCustomer.phone = customer.phone;
        tempCustomer.email = customer.email;
        return tempCustomer;
      });
      setCustomers(data);
    }
  };

  const handleAddClick = () => {
    setOrderItems([
      ...orderItems,
      {
        label: '',
        value: '',
        listPrice: '',
        costColumn1Price: '',
        unitOfMeasure: '',
        UPCRetail: '',
        qty: 1,
      },
    ]);
  };

  const handleRemoveClick = (i) => {
    let tempOrderItems = [...orderItems];
    tempOrderItems.splice(i, 1);
    setOrderItems(tempOrderItems);
  };

  const handleSave = async () => {

    if (!formData.customerId){
      return NotificationManager.error(
        'Customer is Required.',
        'Warning',
        3000
      );
    }
    if (!formData.timeOfOrder){
      return NotificationManager.error(
        'Issue Date is Required.',
        'Warning',
        3000
      );
    }
    if (orderItems.length <= 0){
      return NotificationManager.error(
        'Item Details is Required.',
        'Warning',
        3000
      );
    } 
    
    
    for (let item of orderItems) {
      if (!item.qty) {
        return NotificationManager.warning(
          'Enter Valid Qty for Each Item.',
          'Warning',
          3000
        );
      }
    }
    formData.orderItems = orderItems;
    console.log(formData);
    try {
      await axios.post(`/api/orders`, formData);
      history.push('/app/orders/orders');
      return NotificationManager.success(
        'Order Added Successfully',
        'Success',
        3000
      );
    } catch (error) {
      console.log(error);
      return NotificationManager.error('Something went wrong', 'Error', 3000);
    }
  };

  return isLoading ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading={'Add Order'} match={match} />
          <div className="text-zero">{'  '}</div>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  options={operationOptions}
                  onChange={(e) => {}}
                />
              </div>
              <div style={{ flex: 0 }} className="ml-1">
                <Button>Go</Button>
              </div>
            </Col>
          </Row>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <div className="d-flex flex-column">
        <Row className="mb-4">
          <Colxx xxs="9">
            <Card>
              <CardBody>
                <Colxx xxs="12" className="mb-5">
                  <h3 className="mb-4">Add Order Form</h3>
                  <Row className="mt-3">
                    <Col>
                      <Label>
                        <IntlMessages id="Customer" />
                      </Label>
                      <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                          <Select
                            placeholder="Type Keyword and Hit Enter"
                            components={{
                              Input: (inputProps) => (
                                <CustomSelectInput
                                  {...inputProps}
                                  onKeyUp={handleCustomerSearch}
                                />
                              ),
                            }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={customers}
                            onChange={(e) => {
                              setCustomer(e);
                              console.log(e.value);
                              setFormData({ ...formData, customerId: e.value });
                            }}
                          />
                        </div>
                        <Button
                          style={{ flex: 0 }}
                          className="ml-1"
                          color="secondary"
                          outline
                          onClick={() => {
                            // setCustomerModel(true);
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Email" />
                      </Label>
                      <Input value={customer.email} disabled />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Phone" />
                      </Label>
                      <Input
                        type="number"
                        disabled
                        defaultValue={customer.phone}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            customerPhone: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Label>
                        <IntlMessages id="Issue Date" />
                      </Label>
                      <Input
                        type="date"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            timeOfOrder: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Shipment Date" />
                      </Label>
                      <Input
                        type="date"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            shipmentDate: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Currency" />
                      </Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        options={dummyCurrency}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            orderCurrency: e.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Label>
                        <IntlMessages id="Price List" />
                      </Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        options={dummyPriceLists}
                        onChange={(e) => {
                          setFormData({ ...formData, priceList: e.value });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Totals Are" />
                      </Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        options={dummyBillOptions}
                        onChange={(e) => {
                          setFormData({ ...formData, totalsAre: e.value });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Assigned To" />
                      </Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        options={dummyMasters}
                        onChange={(e) => {
                          setFormData({ ...formData, assignedTo: e.value });
                        }}
                      />
                    </Col>
                  </Row>
                  <div style={{ padding: '20px 0px', margin: '20px 0px' }}>
                    <h3>Item Details : </h3>
                    {orderItems.map((item, i) => {
                      return (
                        <div style={{ display: 'flex' }}>
                          <div style={{ flex: 1 }}>
                            <Row>
                              <Colxx xxs="6">
                                <Label className="mt-4">
                                  <IntlMessages id="Select Item" />
                                </Label>
                                <Select
                                  placeholder="Type Keyword and Hit Enter"
                                  components={{
                                    Input: (inputProps) => (
                                      <CustomSelectInput
                                        {...inputProps}
                                        onKeyUp={handleProductSearch}
                                      />
                                    ),
                                  }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="form-field-name"
                                  options={products}
                                  onChange={(e) => {
                                    const tempOrderItems = [...orderItems];
                                    tempOrderItems[i] = e;
                                    tempOrderItems[i].qty = 1;
                                    setOrderItems(tempOrderItems);
                                  }}
                                />
                              </Colxx>
                              <Colxx xxs="2">
                                <Label className="mt-4">
                                  <IntlMessages id="Item Qty" />
                                </Label>
                                <Input
                                  type="number"
                                  defaultValue={item.qty}
                                  onChange={(e) => {
                                    const tempOrderItems = [...orderItems];
                                    tempOrderItems[i].qty = parseInt(
                                      e.target.value
                                    );
                                    setOrderItems(tempOrderItems);
                                  }}
                                />
                              </Colxx>
                              <Colxx xxs="2">
                                <Label className="mt-4">
                                  <IntlMessages id="Item Price" />
                                </Label>
                                <Input
                                  defaultValue={item.listPrice}
                                  onChange={(e) => {
                                    let values = [...orderItems];
                                    values[i] = e.target.value;
                                    setOrderItems(values);
                                  }}
                                />
                              </Colxx>
                              <Colxx xxs="2" className="mt-5">
                                {orderItems.length !== 0 && (
                                  <Button
                                    color="secondary"
                                    outline
                                    onClick={() => {
                                      handleRemoveClick(i);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                )}
                              </Colxx>
                            </Row>
                          </div>
                          <div
                            style={{ flex: 0, marginLeft: 25 }}
                            className="mt-5"
                          >
                            <FaEye
                              onClick={() =>
                                window.open(
                                  `/app/inventory/products/detail/${item.value}`
                                )
                              }
                              style={{
                                cursor: 'pointer',
                                height: 25,
                                width: 25,
                              }}
                              className="list-item-heading mt-2 text-warning"
                            />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      color="secondary"
                      onClick={() => {
                        handleAddClick();
                      }}
                      className="mt-3"
                    >
                      Add More
                    </Button>
                  </div>
                </Colxx>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="3">
            <Card>
              <CardBody>
                <div className="h5">Order Highlights</div>
                <hr />
                <h6>Order # : {order.id}</h6>
                <h6>Date : {order.timeOfOrder?.split('T')[0]}</h6>
                <Col className="mt-2 p-0">
                  <Label>
                    <IntlMessages id="Order Source" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    options={orderSources}
                    onChange={(e) => {
                      setFormData({ ...formData, orderSource: e.value });
                    }}
                  />
                </Col>
                <Col className="mt-2 p-0">
                  <Label>
                    <IntlMessages id="Status" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    options={statusOptions}
                    onChange={(e) => {
                      setFormData({ ...formData, status: e.value });
                    }}
                  />
                </Col>
                <Col className="mt-2 p-0">
                  <Label>
                    <IntlMessages id="Payment Status" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    options={dummyItems}
                    onChange={(e) => {
                      setFormData({ ...formData, payementStatus: e.value });
                    }}
                  />
                </Col>
                <Col className="mt-2 p-0">
                  <Label>
                    <IntlMessages id="Shipping Status" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    options={dummyShipping}
                    onChange={(e) => {
                      setFormData({ ...formData, shippingStatus: e.value });
                    }}
                  />
                </Col>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" className="mt-3">
            <Card>
              <CardBody>
                <Colxx xxs="12">
                  <div>
                    <h3>Billing Details : </h3>
                    <Row className="mt-3">
                      <Col>
                        <Label>
                          <IntlMessages id="Billing First Name" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              billingFirstName: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col>
                        <Label>
                          <IntlMessages id="Billing Last Name" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              billingLastName: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Label>
                          <IntlMessages id="Billing Company Name" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              billingCompanyName: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col>
                        <Label>
                          <IntlMessages id="Billing Address 1" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              billingAddress1: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col>
                        <Label>
                          <IntlMessages id="Billing Address 2" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              billingAddress2: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Label>
                          <IntlMessages id="Billing City" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              billingCity: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col>
                        <Label>
                          <IntlMessages id="Billing State" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              billingState: e.target.value,
                            });
                          }}
                        />
                      </Col>

                      <Col>
                        <Label>
                          <IntlMessages id="Billing Zip Code" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              billingZipCode: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Label>
                          <IntlMessages id="Billing Country" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              billingCountry: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col>
                        <Label>
                          <IntlMessages id="Billing Phone Number" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              billingPhoneNumber: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-4">
                    <h3>Shipping Details : </h3>
                    <Row className="mt-3">
                      <Col>
                        <Label>
                          <IntlMessages id="Ship First Name" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shipFirstName: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col>
                        <Label>
                          <IntlMessages id="Shipping Last Name" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shippingLastName: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Label>
                          <IntlMessages id="Ship Company Name" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shipCompanyName: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col>
                        <Label>
                          <IntlMessages id="Ship Address 1" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shipAddress1: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col>
                        <Label>
                          <IntlMessages id="Ship Address 2" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shipAddress2: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Label>
                          <IntlMessages id="Ship City" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shipCity: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col>
                        <Label>
                          <IntlMessages id="Ship State" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shipState: e.target.value,
                            });
                          }}
                        />
                      </Col>

                      <Col>
                        <Label>
                          <IntlMessages id="Ship Zip Code" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shipZipCode: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Label>
                          <IntlMessages id="Ship Country" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shipCountry: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Col>
                        <Label>
                          <IntlMessages id="Ship Phone Number" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shipPhoneNumber: e.target.value,
                            });
                          }}
                        />
                      </Col>

                      <Col>
                        <Label>
                          <IntlMessages id="Shipping Method Selected" />
                        </Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              shippingMethodSelected: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </div>

                  <div className="h5 my-4">Payment Details : </div>
                  <Row className="mt-4">
                    <Col>
                      <Label>
                        <IntlMessages id="Payment Status" />
                      </Label>
                      <Input
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            paymentStatus: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Payment Date" />
                      </Label>
                      <Input
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            payementDate: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Payment Reference Number" />
                      </Label>
                      <Input
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            paymentReferenceNumber: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Label>
                        <IntlMessages id="Payment Method" />
                      </Label>
                      <Input
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            paymentMethod: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Order Currency" />
                      </Label>
                      <Input
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            orderCurrency: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Order Discounts Total" />
                      </Label>
                      <Input
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            orderDiscountsTotal: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Label>
                        <IntlMessages id="Insurance Total" />
                      </Label>
                      <Input
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            insuranceTotal: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Sub Total" />
                      </Label>
                      <Input
                        disabled
                        value={subTotal}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            subTotal: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Grand Total" />
                      </Label>
                      <Input
                        disabled
                        value={grandTotal}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            grandTotal: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Label>
                        <IntlMessages id="Tax Rate" />
                      </Label>
                      <Input
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            taxRate: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Tax Total" />
                      </Label>
                      <Input
                        defaultValue={taxTotal}
                        onChange={(e) => {
                          setTaxTotal(e.target.value);
                          setFormData({
                            ...formData,
                            taxTotal: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Line Total" />
                      </Label>
                      <Input
                        disabled
                        value={subTotal}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            lineTotal: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Label>
                        <IntlMessages id="Final Value Total" />
                      </Label>
                      <Input
                        defaultValue={order.paymentDetail?.finalValueTotal}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            finalValueTotal: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Posting Fee Total" />
                      </Label>
                      <Input
                        defaultValue={order.paymentDetail?.postingFeeTotal}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            postingFeeTotal: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Label>
                        <IntlMessages id="PayPal Fee Total" />
                      </Label>
                      <Input
                        defaultValue={order.paymentDetail?.payPalFeeTotal}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            payPalFeeTotal: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Order Source Total" />
                      </Label>
                      <Input
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            orderSourceTotal: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Label>Shipping Cost</Label>
                      <Input
                        value={shippingCost}
                        onChange={(e) => {
                          setShippingCost(e.target.value);
                          setFormData({
                            ...formData,
                            shippingTotal: e.target.value,
                          });
                        }}
                      />
                      <Input
                        type="textarea"
                        placeholder="Message to Customer"
                        className="mt-3"
                      />
                    </Col>
                    <Col></Col>
                  </Row>
                  <div className="mt-3">
                    <Button
                      className="mr-2"
                      color="secondary"
                      outline
                      onClick={() => {
                        history.push('/app/orders');
                      }}
                    >
                      <IntlMessages id="Cancel" />
                    </Button>
                    <Button color="primary" onClick={handleSave}>
                      <IntlMessages id="Add Order" />
                    </Button>
                  </div>
                </Colxx>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    </>
  );
};

export default AddOrder;
