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

const EditWarehouse = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [vendors, setVendors] = useState([]);
  const [change, setChange] = useState(false);
  const [warehouse, setWarehouse] = useState({});

  const [type, setType] = useState({});
  const [sellable, setSellable] = useState({});
  const [vendor, setVendor] = useState({});
  const [isdefault, setIsdefault] = useState({});
  const [fbaShippmentAllow, setFbaShippmentAllow] = useState({});
  const [inventoryReportExclude, setInventoryReportExclude] = useState({});

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
  }, [change]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/orders/warehouses/details/${match.params.id}`
      );
      setWarehouse(data);
      setFormData({
        name: data.name,
        firstName: data.firstName,
        email: data.email,
        type: data.type,
      });
      setType({
        label: data.type,
        value: data.type,
      });
      setSellable({
        label: data.sellable ? 'Active' : 'Inactive',
        value: data.sellable,
      });
      setIsdefault({
        label: data.default ? 'Active' : 'Inactive',
        value: data.default,
      });
      setFbaShippmentAllow({
        label: data.fbaShippmentAllow ? 'Active' : 'Inactive',
        value: data.fbaShippmentAllow,
      });
      setInventoryReportExclude({
        label: data.inventoryReportExclude ? 'Active' : 'Inactive',
        value: data.inventoryReportExclude,
      });
      if (!data.vendorId) return setIsLoading(false);
      try {
        const { data: vendor } = await axios.get(
          `/api/inventory/only-vendor?id=${data.vendorId}`
        );
        setVendor({
          label: vendor.data.name,
          value: vendor.data.id,
        });
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
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
    try {
      await axios.post(
        `/api/orders/warehouses/update/${match.params.id}`,
        formData
      );
      NotificationManager.success(
        'Warehouse Updated Successfully.',
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
          <Breadcrumb heading={'Edit Warehouse'} match={match} />
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
                      defaultValue={warehouse.name}
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
                      defaultValue={type}
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
                      defaultValue={warehouse.quickBooksName}
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
                      defaultValue={warehouse.handlingTime}
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
                      defaultValue={vendor}
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
                      defaultValue={sellable}
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
                      defaultValue={isdefault}
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
                      defaultValue={fbaShippmentAllow}
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
                      defaultValue={inventoryReportExclude}
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
                      defaultValue={warehouse.firstName}
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
                      defaultValue={warehouse.middleName}
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
                      defaultValue={warehouse.lastName}
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
                      defaultValue={warehouse.email}
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
                      defaultValue={warehouse.phone}
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
                      defaultValue={warehouse.address1}
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
                      defaultValue={warehouse.address2}
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
                      defaultValue={warehouse.city}
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
                      defaultValue={warehouse.state}
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
                      defaultValue={warehouse.zipCode}
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
                      defaultValue={warehouse.country}
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
                    <IntlMessages id="Update Warehouse" />
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

export default EditWarehouse;
