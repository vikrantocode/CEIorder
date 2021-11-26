import React, { useEffect, useState } from 'react';
import {
  Row,
  Button,
  Col,
  Input,
  Label,
  Card,
  CardBody,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';
import { NotificationManager } from '../../../../components/common/react-notifications';

const AddCustomer = ({ match }) => {
  const [formData, setFormData] = useState({});
  const [customerModel, setCustomerModel] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [data, setData] = useState({});
  const [change, setChange] = useState(false);
  const [id, setId] = useState(0);
  const history = useHistory();

  const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateUsername = (username) => {
    let usernameRegex = /^(?=.*[!@#$%_^&*]).{8,64}$/;
    return usernameRegex.test(username);
  };

  const validate = (formData) => {
    if (!formData.username)
      return NotificationManager.warning(
        'Username is Mandatory',
        'Validation Error',
        3000
      );
    else if (!validateUsername(formData.username))
      return NotificationManager.warning(
        'Valid Username Must have Special Character in it and 8 letters Long.',
        'Validation Error',
        6000
      );
    if (!formData.firstName)
      return NotificationManager.warning(
        'FirstName is Mandatory',
        'Validation Error',
        3000
      );
    else if (formData.firstName.length < 3)
      return NotificationManager.warning(
        'FirstName must be At least 3 Characters Long',
        'Validation Error',
        3000
      );
    if (!formData.email) {
      return NotificationManager.warning(
        'Email is Mandatory',
        'Validation Error',
        3000
      );
    } else {
      if (!validateEmail(formData.email))
        return NotificationManager.warning(
          'Please Enter a Valid Email',
          'Validation Error',
          3000
        );
    }
    if (formData.emailCC) {
      if (!validateEmail(formData.emailCC))
        return NotificationManager.warning(
          'Please Enter a Valid Email CC',
          'Validation Error',
          3000
        );
    }
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (id) {
      if (formData.username === undefined) formData.username = data.username;
      if (formData.email === undefined) formData.email = data.email;
      if (formData.firstName === undefined) formData.firstName = data.firstName;
      if (!validate(formData)) return;
      try {
        await axios.post(`/api/customers/update/${id}`, formData);
        NotificationManager.success(
          'Customer Updated Successfully.',
          'Success',
          3000
        );
        history.push('/app/customers');
      } catch (err) {
        console.log(JSON.stringify(err.response, null, 4));
        if (err.response.status < 500)
          NotificationManager.error(
            `${
              err.response.data.field[0].toUpperCase() +
              err.response.data.field.slice(1)
            } is Already Taken.`,
            'Error',
            3000
          );
        else {
          NotificationManager.error('Something Went Wrong!!!', 'Error', 3000);
        }
      }
    } else {
      if (!validate(formData)) return;
      try {
        await axios.post(`/api/customers/`, formData);
        NotificationManager.success(
          'Customer Created Successfully.',
          'Success',
          3000
        );
        history.push('/app/customers');
      } catch (err) {
        console.log(JSON.stringify(err.response, null, 4));
        if (err.response.status < 500)
          NotificationManager.error(
            `${
              err.response.data.field[0].toUpperCase() +
              err.response.data.field.slice(1)
            } is Already Taken.`,
            'Error',
            3000
          );
        else {
          NotificationManager.error('Something Went Wrong!!!', 'Error', 3000);
        }
      }
    }
  };

  useEffect(() => {
    if (match.params.id) {
      setIsLoaded(false);
      setId(match.params.id);
      axios
        .get(`/api/customers/details/${match.params.id}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data.customer);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log(err.response);
          return NotificationManager.error(
            'Something Went Wrong!!!',
            'Error',
            3000
          );
        });
    }
  }, [change]);

  return !isLoaded ? (
    <div className="loading"></div>
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb
            heading={id ? 'Edit Customer' : 'Add Customer'}
            match={match}
          />
          <div className="text-zero top-right-button-container">
            <Button
              color="danger"
              size="lg"
              outline
              className="top-right-button"
              onClick={() => {
                history.push('/app/customers');
              }}
            >
              <IntlMessages id="Cancel" />
            </Button>
            {'  '}
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <div className="d-flex flex-column">
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <Colxx xxs="12" className="mb-5">
                  <h3 className="mb-4">
                    {id ? `Edit Customer Form` : `Create Customer Form`}
                  </h3>
                  <Form>
                    <FormGroup>
                      <Row className="mt-3">
                        <Col>
                          <Label>
                            <IntlMessages id="Username" />
                          </Label>
                          <Input
                            defaultValue={data.username}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                username: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        <Col>
                          <Label>
                            <IntlMessages id="First Name" />
                          </Label>
                          <Input
                            defaultValue={data.firstName}
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
                            <IntlMessages id="Last Name" />
                          </Label>
                          <Input
                            defaultValue={data.lastName}
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
                            <IntlMessages id="Email" />
                          </Label>
                          <Input
                            defaultValue={data.email}
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
                            <IntlMessages id="Email CC" />
                          </Label>
                          <Input
                            defaultValue={data.emailCC}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                emailCC: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        <Col>
                          <Label>
                            <IntlMessages id="Phone" />
                          </Label>
                          <Input
                            defaultValue={data.phone}
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
                            <IntlMessages id="Business Name" />
                          </Label>
                          <Input
                            defaultValue={data.businessName}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                businessName: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        <Col>
                          <Label>
                            <IntlMessages id="Credit Term" />
                          </Label>
                          <Input
                            defaultValue={data.creditTerm}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                creditTerm: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        <Col>
                          <Label>
                            <IntlMessages id="Credit Limit" />
                          </Label>
                          <Input
                            defaultValue={data.creditLimit}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                creditLimit: e.target.value,
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Label>
                            <IntlMessages id="User Phone 1" />
                          </Label>
                          <Input
                            defaultValue={data.userPhone1}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                userPhone1: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        <Col>
                          <Label>
                            <IntlMessages id="User Phone 2" />
                          </Label>
                          <Input
                            defaultValue={data.userPhone2}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                userPhone2: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        <Col>
                          <Label>
                            <IntlMessages id="User Phone 3" />
                          </Label>
                          <Input
                            defaultValue={data.userPhone3}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                userPhone3: e.target.value,
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
                            defaultValue={data.address1}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                address1: e.target.value,
                              });
                            }}
                            type="textarea"
                          />
                        </Col>
                        <Col>
                          <Label>
                            <IntlMessages id="Address 2" />
                          </Label>
                          <Input
                            defaultValue={data.address2}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                address2: e.target.value,
                              });
                            }}
                            type="textarea"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Label>
                            <IntlMessages id="City" />
                          </Label>
                          <Input
                            defaultValue={data.city}
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
                            defaultValue={data.state}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                state: e.target.value,
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Label>
                            <IntlMessages id="Country" />
                          </Label>
                          <Input
                            defaultValue={data.country}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                country: e.target.value,
                              });
                            }}
                          />
                        </Col>
                        <Col>
                          <Label>
                            <IntlMessages id="Zip Code" />
                          </Label>
                          <Input
                            defaultValue={data.zipCode}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                zipCode: e.target.value,
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <div className="mt-3">
                      <Button
                        className="mr-2"
                        color="secondary"
                        outline
                        onClick={() => {
                          history.push('/app/customers');
                        }}
                      >
                        <IntlMessages id="Cancel" />
                      </Button>
                      <Button color="primary" onClick={handleSave}>
                        <IntlMessages
                          id={id ? 'Update Customer' : 'Create Customer'}
                        />
                      </Button>
                    </div>
                  </Form>
                </Colxx>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
      <Modal isOpen={customerModel}>
        <ModalHeader>Add New Customer</ModalHeader>
        <ModalBody>Body</ModalBody>
        <ModalFooter>
          <Button
            className="mr-2"
            color="secondary"
            outline
            onClick={() => {
              setCustomerModel(false);
            }}
          >
            <IntlMessages id="Cancel" />
          </Button>
          <Button color="primary">
            <IntlMessages id="Create Customer" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddCustomer;
