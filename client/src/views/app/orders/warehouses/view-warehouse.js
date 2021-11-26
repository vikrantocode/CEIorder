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
import IntlMessages from '../../../../helpers/IntlMessages';
import Table from 'reactstrap/lib/Table';

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
  { label: 'Active', value: 'active' },
  { label: 'In Active', value: 'inactive' },
];

const ViewWarehouse = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [warehouse, setWarehouse] = useState({});
  const [vendor, setVendor] = useState({});

  const history = useHistory();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/orders/warehouses/details/${match.params.id}`
      );
      setWarehouse(data);
      if (!data.vendorId) return setIsLoading(false);
      try {
        const { data: vendor } = await axios.get(
          `/api/inventory/only-vendor?id=${data.vendorId}`
        );
        console.log(vendor);
        setVendor(vendor.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb
            heading={`${warehouse.id} : ${warehouse.name}`}
            match={match}
          />
          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              outline
              className="top-right-button"
              onClick={() => {
                history.push('/app/orders/warehouses');
              }}
            >
              <IntlMessages id="Back" />
            </Button>
            {'  '}
          </div>
          <div className="text-zero">{'  '}</div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <div className="my-4 h4">Warehouse Details : -</div>
                  <Table hover>
                    <tbody>
                      {warehouse.name && (
                        <tr>
                          <th scope="row">Name</th>
                          <td>{warehouse.name}</td>
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
                      {warehouse.quickBooksName && (
                        <tr>
                          <th scope="row">Quick Books Name</th>
                          <td>{warehouse.quickBooksName}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  {warehouse.fbaShippmentAllow && (
                    <div className="badge badge-pill badge-primary mx-1">
                      FBA Shipment Allowed
                    </div>
                  )}
                  {warehouse.sellable && (
                    <div className="badge badge-pill badge-primary mx-1">
                      Sellable
                    </div>
                  )}
                  {warehouse.isDefault && (
                    <div className="badge badge-pill badge-primary mx-1">
                      Default
                    </div>
                  )}
                  {warehouse.inventoryReportExclude && (
                    <div className="badge badge-pill badge-primary mx-1">
                      Inventory Report Exclude
                    </div>
                  )}
                </Col>
                <Col>
                  <div className="my-4 h4">Vendor Details : -</div>
                  <Table hover>
                    <tbody>
                      {vendor.name && (
                        <tr>
                          <th scope="row">Name</th>
                          <td
                            onClick={() =>
                              history.push(
                                `/app/inventory/vendors/detail/${vendor.id}`
                              )
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            {vendor.name}
                          </td>
                        </tr>
                      )}
                      {vendor.email && (
                        <tr>
                          <th scope="row">Email</th>
                          <td>{vendor.email}</td>
                        </tr>
                      )}
                      {vendor.accountNumber && (
                        <tr>
                          <th scope="row">Account Number</th>
                          <td>{vendor.accountNumber}</td>
                        </tr>
                      )}
                      <tr></tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="my-4 h4">Contact Person Details : -</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table hover>
                    <tbody>
                      {warehouse.firstName && (
                        <tr>
                          <th scope="row">First Name</th>
                          <td>{warehouse.firstName}</td>
                        </tr>
                      )}
                      {warehouse.middleName && (
                        <tr>
                          <th scope="row">Middle Name</th>
                          <td>{warehouse.middleName}</td>
                        </tr>
                      )}
                      {warehouse.lastName && (
                        <tr>
                          <th scope="row">Last Name</th>
                          <td>{warehouse.lastName}</td>
                        </tr>
                      )}
                      {warehouse.address1 && (
                        <tr>
                          <th scope="row">Address 1</th>
                          <td>{warehouse.address1}</td>
                        </tr>
                      )}
                      {warehouse.address2 && (
                        <tr>
                          <th scope="row">Address 2</th>
                          <td>{warehouse.address2}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Col>
                <Col>
                  <Table hover>
                    <tbody>
                      {warehouse.city && (
                        <tr>
                          <th scope="row">City</th>
                          <td>{warehouse.city}</td>
                        </tr>
                      )}
                      {warehouse.state && (
                        <tr>
                          <th scope="row">State</th>
                          <td>{warehouse.state}</td>
                        </tr>
                      )}
                      {warehouse.zipCode && (
                        <tr>
                          <th scope="row">Zip Code</th>
                          <td>{warehouse.zipCode}</td>
                        </tr>
                      )}
                      {warehouse.country && (
                        <tr>
                          <th scope="row">Country</th>
                          <td>{warehouse.country}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewWarehouse;
