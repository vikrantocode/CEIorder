import React, { useState, useEffect } from 'react';
import { Row, Button, Col, Label, Input, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import { useHistory } from 'react-router';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import IntlMessages from '../../../../helpers/IntlMessages';
import { NotificationManager } from '../../../../components/common/react-notifications';

const typeOptions = [
  { label: 'Normal', value: 'Normal' },
  { label: 'FBA', value: 'FBA' },
  { label: 'Dropship', value: 'Dropship' },
  { label: 'Interim', value: 'Interim' },
  { label: 'Un Tested', value: 'Un Tested' },
  { label: 'New Egg', value: 'New Egg' },
  { label: 'C Discount', value: 'C Discount' },
  { label: 'WFS', value: 'WFS' },
];

const activeOptions = [
  { label: 'Active', value: true },
  { label: 'Inactive', value: false },
];

const AddWarehouse = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [vendors, setVendors] = useState([]);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/inventory/get-each-vendor');
      const vendors = data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setVendors(vendors);
    })();
  }, []);

  const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    console.log(formData);
    //? Perform Validation
    if (formData.name === '' || formData.name === undefined)
      return NotificationManager.warning(
        'Warehouse Name is Mandatory.',
        'Warning',
        3000
      );
    else if (formData.type === '' || formData.type === undefined)
      return NotificationManager.warning(
        'Warehouse Type is Mandatory.',
        'Warning',
        3000
      );
    else if (formData.firstName === '' || formData.firstName === undefined)
      return NotificationManager.warning(
        "Warehouse Contact Person's Name is Mandatory.",
        'Warning',
        3000
      );
    else if (formData.email === '' || formData.email === undefined)
      return NotificationManager.warning(
        "Warehouse Contact Person's Email is Mandatory",
        'Warning',
        3000
      );
    else if (!validateEmail(formData.email))
      return NotificationManager.warning(
        'Please Enter a Valid Email Address.',
        'Warning',
        3000
      );
    //? Everything Right Perform AXIOS CALL
    const id = localStorage.getItem('userId');
    formData.userId = id;
    try {
      await axios.post(`/api/orders/warehouses`, formData);
      NotificationManager.success(
        'Warehouse Created Successfully.',
        'Success',
        3000
      );
      return history.push('/app/orders/warehouses');
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
          <Breadcrumb heading={'Add Warehouse'} match={match} />
          <div className="text-zero">{'  '}</div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <Colxx xxs="12" className="mb-5">
                <div className="my-3 h5">Warehouse Details : -</div>
                <Row>
                  <Col>
                    <Label>
                      <IntlMessages id="Warehouse Name" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="Type" />
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={typeOptions}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          type: e.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Label>
                      <IntlMessages id="Quick Books Name" />
                    </Label>
                    <Input
                      type="textarea"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          quickBooksName: e.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Label>
                      <IntlMessages id="Handling Time(in Days)" />
                    </Label>
                    <Input
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          handlingTime: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="Vendor" />
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={vendors}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          vendorId: e.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Label>
                      <IntlMessages id="Sellable" />
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={activeOptions}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          sellable: e.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="Is Default" />
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={activeOptions}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          isDefault: e.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="FBA Shipment Allow" />
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={activeOptions}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          fbaShipmentAllow: e.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="Inventory Report Exclude" />
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={activeOptions}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          inventoryReportExclude: e.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <div className="mt-3 h5">Contact Person Details : -</div>
                <Row className="mt-3">
                  <Col>
                    <Label>
                      <IntlMessages id="First Name" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="Middle Name" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          middleName: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="Last Name" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          lastName: e.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Label>
                      <IntlMessages id="Email Address" />
                    </Label>
                    <Input
                      type="email"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="Phone" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Label>
                      <IntlMessages id="Address 1" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          address1: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="Address 2" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          address2: e.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Label>
                      <IntlMessages id="City" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          city: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="State" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          state: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="Zip Code" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          zipCode: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Label>
                      <IntlMessages id="Country" />
                    </Label>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          country: e.target.value,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <div className="mt-3">
                  <Button
                    className="mr-2"
                    color="secondary"
                    outline
                    onClick={() => {
                      history.push('/app/orders/warehouses');
                    }}
                  >
                    <IntlMessages id="Cancel" />
                  </Button>
                  <Button color="primary" onClick={handleSubmit}>
                    <IntlMessages id="Add Warehouse" />
                  </Button>
                </div>
              </Colxx>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddWarehouse;
