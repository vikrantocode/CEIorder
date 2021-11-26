import React, { useState, useEffect } from 'react';
import {
  Row,
  Button,
  Col,
  Label,
  Input,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
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
import CustomInput from 'reactstrap/lib/CustomInput';
import { replace } from 'lodash-contrib';

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
  { label: 'Add to Order Group', value: '3' },
  { label: 'Remove from Order Group', value: '4' },
  { label: 'Remove from All Group', value: '5' },
  { label: 'Manage Payments', value: '6' },
  { label: 'Set Final Sale', value: '7' },
  { label: 'Set NON Final Sale', value: '8' },
  { label: 'Split Order', value: '9' },
  { label: 'Create Duplicate Order', value: '10' },
  { label: 'Create Replacement Order', value: '11' },
  { label: 'Set Rush Order', value: '12' },
  { label: 'Set NON Rush Order', value: '13' },
  { label: 'Manage Serial Numbers', value: '14' },
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

const shippingOptions = [
  { label: 'Packed', value: 'Packed' },
  { label: 'Shipped', value: 'Shipped' },
  { label: 'Out for Delivery', value: 'Out' },
  { label: 'Delivered', value: 'Delivered' },
  { label: 'Returned', value: 'Returned' },
  { label: 'Cancelled', value: 'Cancelled' },
];

const paymentOptions = [
  { label: 'Paid', value: 'Paid' },
  { label: 'Pending', value: 'Pending' },
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
  { key: 1, id: 1, name: 'Laptop', label: 'Laptop', price: 45000 },
  { key: 2, id: 2, name: 'Mobile', label: 'Mobile', price: 15000 },
  { key: 3, id: 3, name: 'Watch', label: 'Watch', price: 2000 },
  { key: 4, id: 4, name: 'Desktop', label: 'Desktop', price: 25000 },
  { key: 5, id: 5, name: 'Paper Set', label: 'Paper Set', price: 200 },
];

const EditOrder = ({ match }) => {
  const [id, setId] = useState();
  const [change, setChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [order, setOrder] = useState({});
  const [customer, setCustomer] = useState({});
  const [customers, setCustomers] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [replacementItems, setReplacementItems] = useState([]);

  const [formData, setFormData] = useState({});
  const [serialFormData, setSerialFormData] = useState({});
  const [subTotal, setSubTotal] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [taxTotal, setTaxTotal] = useState();
  const [shippingCost, setShippingCost] = useState();
  const [orderGroupId, setOrderGroupId] = useState();

  //? Dropdowns
  const [action, setAction] = useState('');
  const [orderSource, setOrderSource] = useState({});
  const [status, setStatus] = useState({});
  const [paymentStatus, setPaymentStatus] = useState({});
  const [shippingStatus, setShippingStatus] = useState({});
  const [splitOrderItems, setSplitOrderItems] = useState([]);

  //? Modals
  const [removeModal, setRemoveModal] = useState(false);
  const [removeAllModal, setRemoveAllModal] = useState(false);
  const [splitModal, setSplitModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [serialModal, setSerialModal] = useState(false);
  const [replacementModal, setReplacementModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const { data } = await axios.get(
        `/api/orders/groups/fetch/${match.params.id}`
      );
      const groups = data.map((item) => {
        const group = {};
        group.label = item.name;
        group.value = item.id;
        return group;
      });
      setGroups(groups);
      setIsFetching(false);
    })();
  }, [change]);

  useEffect(() => {
    setId(match.params.id);
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/orders/details/${match.params.id}`
      );
      setOrder(data);
      setOrderItems(data.products);
      setOrderSource({
        label: data.orderSource,
        value: data.orderSource,
        key: 0,
      });
      setStatus({
        label: data.status,
        value: data.status,
        key: 0,
      });
      setPaymentStatus({
        label: data.paymentDetail.paymentStatus,
        value: data.status,
        key: 0,
      });
      setShippingStatus({
        label: data.shippingDetail.shippingStatus,
        value: data.shippingDetail.shippingStatus,
        key: 0,
      });
      const {data: customer }  = await axios.get(
        `/api/customers/details/${data.customerId}`
      );
      
      setShippingCost(data.shippingDetail.shippingTotal);
      setSubTotal(data.paymentDetail.subTotal);
      setGrandTotal(data.paymentDetail.grandTotal);
      setTaxTotal(data.paymentDetail.taxTotal);
      
      setCustomer({
        ...customer,
        label: `${customer.customer.firstName} ${customer.customer.lastName}`,
        value: customer.customer.id,
        email: customer.customer.email,
        phone : customer.customer.phone
      });
      setIsLoading(false);
    })();
  }, [change]);

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

  const sub = (x, y) => {
    const myArray = x.filter(function (el) {
      return y.indexOf(el) < 0;
    });
    return myArray;
  };

  const handleRemove = async () => {
    if (!orderGroupId)
      return NotificationManager.warning(
        'Select Group to Remove',
        'Warning',
        3000
      );
    try {
      await axios.post(`/api/orders/groups/remove/${id}`, { orderGroupId });
      setOrderGroupId('');
      NotificationManager.success('Removed from Group', 'Success', 3000);
      setRemoveModal(false);
      setChange(true);
    } catch (error) {
      console.log(error);
      NotificationManager.error('Something went wrong', 'Error', 3000);
    }
  };

  const handleRemoveAll = async () => {
    if (!groups.length) {
      console.log('Request Came');
      return NotificationManager.warning(
        "Order Doesn't Belong to Any Group",
        'Warning',
        3000
      );
    }
    try {
      await axios.post(`/api/orders/groups/remove/${id}`, {
        orderGroupId: 'all',
      });
      NotificationManager.success(
        'Removed from All Groups Successfully',
        'Success',
        3000
      );
      setRemoveAllModal(false);
      setChange(true);
    } catch (error) {
      console.log(error);
      NotificationManager.error('Something went wrong', 'Error', 3000);
    }
  };

  const handleReplacement = async () => {
    const items = replacementItems.filter((item) => item.value !== '');
    if (!items.length)
      return NotificationManager.warning(
        'Select Replacement Items First',
        'Warning',
        3000
      );
    let price = 0;
    items.map((item) => {
      item.qty = item.qty || 0;
      price += item.qty * item.listPrice;
    });
    const totalPrice = price + taxTotal + shippingCost;
    if (!(price === subTotal))
      NotificationManager.warning(
        'Selected Items have Different Price than Before',
        'Warning',
        3000
      );
    const formData = {
      orderItems: items,
      taxTotal,
      shippingCost,
      subtotal: price,
      grandTotal: totalPrice,
    };
    try {
      const { data } = await axios.post(`/api/orders/replace/${id}`, formData);
      NotificationManager.success('Replacement Processed', 'Success', 3000);
      return history.push(`/app/orders/view-order/${data.id}`);
    } catch (err) {
      console.log(err);
      return NotificationManager.error('Something went wrong', 'Error', 3000);
    }
  };

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

  const duplicateOrder = async () => {
    try {
      const { data } = await axios.post(`/api/orders/duplicate/${id}`);
      return NotificationManager.success(
        `Duplicated Order Has Been Created with Id : ${data.id}`,
        'Success',
        5000
      );
    } catch (error) {
      console.log(error);
      return NotificationManager.error('Something went wrong', 'Error', 3000);
    }
  };

  const handleSerialSave = async () => {
    try {
      await axios.post(`/api/orders/update/${id}`, serialFormData);
      setSerialModal(false);
      setChange(true);
      return NotificationManager.success(
        'Order Details Updated Successfully.',
        'Success',
        3000
      );
    } catch (e) {
      console.log(e);
      return NotificationManager.error('Something went wrong', 'Error', 3000);
    }
  };

  const onCheckItem = (item) => {
    console.log(item);
    let tempSplitOrderItems = [...splitOrderItems];
    if (tempSplitOrderItems.includes(item))
      tempSplitOrderItems = tempSplitOrderItems.filter(
        (x) => x.value !== item.value
      );
    else {
      tempSplitOrderItems.push(item);
    }
    setSplitOrderItems(tempSplitOrderItems);
  };

  const handleSplit = async () => {
    if (!splitOrderItems.length)
      return NotificationManager.warning(
        'Please Select Items to Split Orders.',
        'Warning',
        3000
      );
    else if (splitOrderItems.length === orderItems.length)
      return NotificationManager.warning(
        "Can't split Orders with 0 Order Item in Current Order.",
        'Warning',
        3000
      );
    else {
      let newSubTotal = 0.0;
      for (let orderItem of splitOrderItems) {
        console.log(orderItem);
        newSubTotal =
          newSubTotal +
          parseFloat(orderItem.listPrice) * parseInt(orderItem.qty);
      }
      console.log(newSubTotal);
      const totalTax = taxTotal / orderItems.length;
      const shipCost = shippingCost / orderItems.length;
      const total = newSubTotal + (taxTotal + shippingCost) / orderItems.length;
      const formData = {
        items: [...splitOrderItems],
        newOrder: { subTotal: newSubTotal, totalTax, shipCost, total },
        oldOrder: {
          taxTotal: taxTotal - totalTax,
          grandTotal: grandTotal - total,
          shippingCost: shippingCost - shipCost,
          subTotal: subTotal - newSubTotal,
        },
      };
      const res = await axios.post(`/api/orders/split/${id}`, formData);
      setChange(true);
      setSplitModal(false);
      return NotificationManager.success('Order Splitted.', 'Success', 3000);
    }
  };
  const setFinalSale = async (finalSale) => {
    try {
      await axios.post(`/api/orders/update/${id}`, { finalSale });
      if (finalSale)
        return NotificationManager.success(
          "Order Set to Final Sale and Can't be Returned.",
          'Success',
          3000
        );
      NotificationManager.success(
        'Order Set to Non Final Sale and Can be Returned.',
        'Success',
        3000
      );
    } catch (e) {
      console.log(e);
      return NotificationManager.error('Something went wrong', 'Error', 3000);
    }
  };
  const setRushOrder = async (isRushOrder) => {
    try {
      await axios.post(`/api/orders/update/${id}`, { isRushOrder });
      if (isRushOrder)
        return NotificationManager.success(
          'Order Set to Rush Order.',
          'Success',
          3000
        );
      NotificationManager.success(
        'Order Set to NON Rush Order.',
        'Success',
        3000
      );
    } catch (e) {
      console.log(e);
      return NotificationManager.error('Something went wrong', 'Error', 3000);
    }
  };

  const handleAction = async () => {
    if (action === '')
      return NotificationManager.warning(
        'Select Action to Perform...',
        'Warning',
        3000
      );
    switch (action) {
      case '1':
        console.log(1);
        break;
      case '2':
        console.log(2);
        break;
      case '3':
        history.push(`/app/orders/edit-order/assign-group/${id}`);
        break;
      case '4':
        setRemoveModal(true);
        break;
      case '5':
        setRemoveAllModal(true);
        break;
      case '6':
        setPaymentModal(true);
        break;
      case '7':
        setFinalSale(true);
        break;
      case '8':
        setFinalSale(false);
        break;
      case '9':
        if (orderItems.length <= 1)
          return NotificationManager.warning(
            "Order doesn't have 2 or More items to Split.",
            'Warning',
            3000
          );
        setSplitModal(true);
        break;
      case '10':
        duplicateOrder();
        break;
      case '11':
        if (shippingStatus.value === 'Replaced')
          return NotificationManager.warning(
            'This Order Has been Already Replaced.',
            'Warning',
            3000
          );
        setReplacementModal(true);
        break;
      case '12':
        setRushOrder(true);
        break;
      case '13':
        setRushOrder(false);
        break;
      case '14':
        setSerialModal(true);
        break;
      default:
        console.log('default');
        break;
    }
  };

  const handleSave = async (e) => {
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
      await axios.post(`/api/orders/update/${id}`, formData);
      history.push(`/app/orders/edit-order/${id}`);
      return NotificationManager.success(
        'Order Updated Successfully',
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
          <Breadcrumb heading={'Edit Order'} match={match} />
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
                  onChange={(e) => {
                    setAction(e.value);
                  }}
                />
              </div>
              <div style={{ flex: 0 }} className="ml-1">
                <Button onClick={handleAction}>Go</Button>
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
                  <h3 className="mb-4">Edit Order Form</h3>
                  <Row className="mt-3">
                    <Col>
                      <Label>
                        <IntlMessages id="Customer" />
                      </Label>
                      <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                          <Select
                            placeholder="Type Keyword and Hit Enter"
                            defaultValue={customer}
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
                            shipPhoneNumber: e.target.value,
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
                        defaultValue={order.timeOfOrder?.substr(
                          0,
                          order.timeOfOrder?.indexOf('T')
                        )}
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
                        defaultValue={order?.shippingDetail?.shippingDate?.substr(
                          0,
                          order.shippingDetail.shippingDate?.indexOf('T')
                        )}
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
                        defaultValue={{
                          label: order.paymentDetail?.orderCurrency,
                          value: order.paymentDetail?.orderCurrency,
                          key: 0,
                        }}
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
                          setFormData({ ...formData, ptype: e.value });
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
                          setFormData({ ...formData, ptype: e.value });
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
                                  defaultValue={
                                    item.itemNumber && {
                                      label: `${item.itemNumber} :: ${item.UPCRetail} :: ${item.description25Char}`,
                                      value: item.basicProductDetailId,
                                    }
                                  }
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
                <h6>Source : {order.orderSource}</h6>
                <Col className="mt-2 p-0">
                  <Label>
                    <IntlMessages id="Status" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    defaultValue={status}
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
                    options={paymentOptions}
                    defaultValue={paymentStatus}
                    onChange={(e) => {
                      setFormData({ ...formData, paymentStatus: e.value });
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
                    defaultValue={shippingStatus}
                    classNamePrefix="react-select"
                    name="form-field-name"
                    options={shippingOptions}
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
                          defaultValue={order.billingDetail?.billingFirstName}
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
                          defaultValue={order.billingDetail?.billingLastName}
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
                          defaultValue={order.billingDetail?.billingCompanyName}
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
                          defaultValue={order.billingDetail?.billingAddress1}
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
                          defaultValue={order.billingDetail?.billingAddress2}
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
                          defaultValue={order.billingDetail?.billingCity}
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
                          defaultValue={order.billingDetail?.billingState}
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
                          defaultValue={order.billingDetail?.billingZipCode}
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
                          defaultValue={order.billingDetail?.billingCountry}
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
                          defaultValue={order.billingDetail?.billingPhoneNumber}
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
                          defaultValue={order.shippingDetail?.shipFirstName}
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
                          defaultValue={order.shippingDetail?.shippingLastName}
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
                          defaultValue={order.shippingDetail?.shipCompanyName}
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
                          defaultValue={order.shippingDetail?.shipAddress1}
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
                          defaultValue={order.shippingDetail?.shipAddress2}
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
                          defaultValue={order.shippingDetail?.shipCity}
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
                          defaultValue={order.shippingDetail?.shipState}
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
                          defaultValue={order.shippingDetail?.shipZipCode}
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
                          defaultValue={order.shippingDetail?.shipCountry}
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
                          defaultValue={order.shippingDetail?.shipPhoneNumber}
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
                          defaultValue={
                            order.shippingDetail?.shippingMethodSelected
                          }
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
                      <IntlMessages id="Update Order" />
                    </Button>
                  </div>
                </Colxx>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>

      {/* Models */}
      {/* ReMove Group Modal */}
      <Modal isOpen={removeModal} toggle={() => setRemoveModal(!removeModal)}>
        <ModalHeader>
          <IntlMessages id="Remove From Group" />
        </ModalHeader>
        <ModalBody>
          {isFetching ? (
            <div className="loading"></div>
          ) : (
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  options={groups}
                  onChange={(e) => {
                    setOrderGroupId(e.value);
                  }}
                />
              </div>
              <div style={{ flex: 0, marginLeft: 5 }}>
                <Button onClick={handleRemove}>Remove</Button>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
      {/* Remove All Group Modal */}
      <Modal
        isOpen={removeAllModal}
        toggle={() => setRemoveAllModal(!removeAllModal)}
      >
        <ModalHeader>
          <IntlMessages id="Remove From All Group" />
        </ModalHeader>
        <ModalBody>
          <h4>Are You Sure You Want to Remove Order from All Groups?</h4>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setRemoveAllModal(false)}>
            No
          </Button>
          <Button color="danger" onClick={handleRemoveAll}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
      {/* Split Order Modal */}
      <Modal
        isOpen={splitModal}
        size="lg"
        toggle={() => setSplitModal(!splitModal)}
      >
        <ModalHeader>
          <IntlMessages id="Split Order" />
        </ModalHeader>
        <ModalBody>
          <h4>Select Order Items to Split.</h4>
          <Card
            style={{ height: '4rem' }}
            className="d-flex flex-row align-self-center mt-3"
          >
            <div className="custom-control custom-checkbox mx-3 w-10 h5 align-self-center"></div>
            <div className="h6 align-self-center w-60 mx-3 font-weight-bold">
              Item Name
            </div>
            <div className="h6 align-self-center w-20 mx-3 font-weight-bold">
              Item UPC
            </div>
          </Card>
          {orderItems.map((item) => {
            return (
              <Card
                style={{ height: '4rem' }}
                className="d-flex flex-row align-self-center mt-3"
              >
                <div
                  className="custom-control custom-checkbox mx-3 w-10 h5 align-self-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onCheckItem(item)}
                >
                  <CustomInput
                    className="item-check mb-0"
                    type="checkbox"
                    id={`check_${item.value}`}
                    checked={splitOrderItems.includes(item)}
                    onChange={() => {}}
                    label=""
                  />
                </div>
                <div className="h6 align-self-center w-60 mx-3">
                  {item.description25Char}
                </div>
                <div className="h6 align-self-center w-20 mx-3">
                  {item.UPCRetail}
                </div>
              </Card>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" outline onClick={() => setSplitModal(false)}>
            Cancel
          </Button>
          <Button color="success" onClick={handleSplit}>
            Split Order
          </Button>
        </ModalFooter>
      </Modal>

      {/* Payment Details Modal */}
      <Modal
        isOpen={paymentModal}
        size="lg"
        toggle={() => setPaymentModal(!paymentModal)}
      >
        <ModalHeader>
          <IntlMessages id="Manage Payment Details" />
        </ModalHeader>
        <ModalBody>
          <div className="h5 my-4">Payment Details : </div>
          <Row className="mt-4">
            <Col>
              <Label>
                <IntlMessages id="Payment Status" />
              </Label>
              <Input
                defaultValue={order.paymentDetail?.paymentStatus}
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
                defaultValue={order.paymentDetail?.payementDate}
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
                defaultValue={order.paymentDetail?.paymentReferenceNumber}
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
                defaultValue={order.paymentDetail?.paymentMethod}
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
                defaultValue={order.paymentDetail?.orderCurrency}
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
                defaultValue={order.paymentDetail?.orderDiscountsTotal}
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
                defaultValue={order.paymentDetail?.insuranceTotal}
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
                defaultValue={order.paymentDetail?.taxRate}
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
                defaultValue={order.paymentDetail?.orderSourceTotal}
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
              color="danger"
              outline
              onClick={() => {
                setPaymentModal(false);
              }}
            >
              <IntlMessages id="Cancel" />
            </Button>
            <Button color="primary" onClick={handleSave}>
              <IntlMessages id="Update Payment Details" />
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {/* Serial Number Managing Modal */}
      <Modal
        isOpen={serialModal}
        size="lg"
        toggle={() => setSerialModal(!serialModal)}
      >
        <ModalHeader>
          <IntlMessages id="Manage Serial Numbers" />
        </ModalHeader>
        <ModalBody>
          <div className="h5 my-4">Order Details : </div>
          <Row className="mt-4">
            <Col>
              <Label>
                <IntlMessages id="Order Source Order Id" />
              </Label>
              <Input
                defaultValue={order.orderSourceOrderId}
                onChange={(e) => {
                  setSerialFormData({
                    ...serialFormData,
                    orderSourceOrderId: e.target.value,
                  });
                }}
              />
            </Col>
            <Col>
              <Label>
                <IntlMessages id="e Bay Sales Record Number" />
              </Label>
              <Input
                defaultValue={order.eBaySalesRecordNumber}
                onChange={(e) => {
                  setSerialFormData({
                    ...serialFormData,
                    eBaySalesRecordNumber: e.target.value,
                  });
                }}
              />
            </Col>
            <Col>
              <Label>
                <IntlMessages id="Serial Number" />
              </Label>
              <Input
                defaultValue={order.serialNumber}
                onChange={(e) => {
                  setSerialFormData({
                    ...serialFormData,
                    serialNumber: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Label>
                <IntlMessages id="Tracking Number" />
              </Label>
              <Input
                defaultValue={order.trackingNumber}
                onChange={(e) => {
                  setSerialFormData({
                    ...serialFormData,
                    trackingNumber: e.target.value,
                  });
                }}
              />
            </Col>
            <Col>
              <Label>
                <IntlMessages id="Google Order Number" />
              </Label>
              <Input
                defaultValue={order.googleOrderNumber}
                onChange={(e) => {
                  setSerialFormData({
                    ...serialFormData,
                    googleOrderNumber: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <div className="mt-3">
            <Button
              className="mr-2"
              color="danger"
              outline
              onClick={() => {
                setSerialModal(!serialModal);
              }}
            >
              <IntlMessages id="Cancel" />
            </Button>
            <Button color="primary" onClick={handleSerialSave}>
              <IntlMessages id="Update Serial Numbers" />
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {/* Replacement Modal */}
      <Modal
        isOpen={replacementModal}
        size="lg"
        toggle={() => setReplacementModal(!replacementModal)}
      >
        <ModalHeader>
          <IntlMessages id="Create Replacement Order" />
        </ModalHeader>
        <ModalBody>
          <div className="h5 mt-4">Select Order Items : </div>
          <div>
            {replacementItems.map((item, i) => {
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
                          defaultValue={
                            item.itemNumber && {
                              label: `${item.itemNumber} :: ${item.UPCRetail} :: ${item.description25Char}`,
                              value: item.basicProductDetailId,
                            }
                          }
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
                            const tempReplacementItems = [...replacementItems];
                            tempReplacementItems[i] = e;
                            tempReplacementItems[i].qty = 1;
                            setReplacementItems(tempReplacementItems);
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
                            const tempReplacementItems = [...replacementItems];
                            tempReplacementItems[i].qty = parseInt(
                              e.target.value
                            );
                            setReplacementItems(tempReplacementItems);
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
                            let values = [...replacementItems];
                            values[i] = e.target.value;
                            setReplacementItems(values);
                          }}
                        />
                      </Colxx>
                      <Colxx xxs="2" className="mt-5">
                        {replacementItems.length !== 0 && (
                          <Button
                            color="secondary"
                            outline
                            onClick={() => {
                              let tempReplacementItems = [...replacementItems];
                              tempReplacementItems.splice(i, 1);
                              setReplacementItems(tempReplacementItems);
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </Colxx>
                    </Row>
                  </div>
                  <div style={{ flex: 0, marginLeft: 25 }} className="mt-5">
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
                setReplacementItems([
                  ...replacementItems,
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
              }}
              className="mt-3"
            >
              Add More
            </Button>
          </div>
          <div className="mt-3">
            <Button
              className="mr-2"
              color="danger"
              outline
              onClick={() => {
                setReplacementModal(!replacementModal);
              }}
            >
              <IntlMessages id="Cancel" />
            </Button>
            <Button color="primary" onClick={handleReplacement}>
              <IntlMessages id="Create Replacement" />
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditOrder;
