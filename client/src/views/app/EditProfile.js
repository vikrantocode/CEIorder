import IntlMessages from '../../helpers/IntlMessages';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { NotificationManager } from '../../components/common/react-notifications';
import { UserContext } from '../../Context/UserContext';
import {
  Row,
  Card,
  CardBody,
  Input,
  FormGroup,
  Label,
  Button,
  Form,
} from 'reactstrap';
// import { injectIntl } from 'react-intl';

const EditProfile = ({ match }) => {
  const [formData, setformData] = useState({});
  const [user, setUser] = useContext(UserContext);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const baseUrl = 'https://cdn.linqusacorp.com';

  const styles = {
    active: {
      color: 'green',
    },
    inactive: {
      color: 'red',
    },
    profileImg: {
      height: '6rem',
      width: '6rem',
      borderRadius: '50%',
    },
    editprofileImage: {
      height: '5rem',
      width: '5rem',
      borderRadius: '50%',
    },
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log('picture: ', e.target.files);
      setPicture(e.target.files[0]);
      console.log(picture);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // FORM   SUBMIT HANDLER
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (formData.password) {
      if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          formData.password
        )
      )
        return NotificationManager.warning(
          'Password Must Contain 1 digit, 1 Uppercase, 1 Lowercase, 1 Special Charcter, and 8 Character Long!!!',
          'Error',
          3000,
          null,
          null,
          ''
        );
      if (!formData.confirmPassword)
        return NotificationManager.warning(
          "Confirm Password Can't Be Empty",
          'Error',
          3000,
          null,
          null,
          ''
        );
      else if (formData.password !== formData.confirmPassword)
        return NotificationManager.warning(
          "Password & Confirm Password didn't match!!!",
          'Error',
          3000,
          null,
          null,
          ''
        );
      data.append('password', formData.password);
    }
    if (formData.firstName) {
      data.append('firstName', formData.firstName);
    }
    if (formData.lastName) {
      data.append('lastName', formData.lastName);
    }
    if (formData.email) {
      data.append('email', formData.email);
    }
    if (formData.phone) {
      data.append('phone', formData.phone);
    }
    if (formData.role) {
      data.append('role', formData.role);
    }
    if (formData.address) {
      data.append('address', formData.address);
    }
    if (formData.company) {
      data.append('company', formData.company);
    }
    if (formData.city) {
      data.append('city', formData.city);
    }
    if (formData.state) {
      data.append('state', formData.state);
    }
    if (formData.country) {
      data.append('country', formData.country);
    }
    if (formData.zip) {
      data.append('zip', formData.zip);
    }
    if (picture) {
      data.append('profileImage', picture);
    }
    axios
      .post('/api/edit-profile', data, { params: { id: user.id } })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.data);
        NotificationManager.success(
          'Profile Updated Successfully',
          'Success',
          3000,
          null,
          null,
          ''
        );
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.success(
          'Profile Updated Successfully',
          'Success',
          3000,
          null,
          null,
          ''
        );
      });
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Edit Profile" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <div className="d-flex flex-column">
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                {/* <CardTitle>
                <IntlMessages id="Edit" />
              </CardTitle> */}
                <Form>
                  <FormGroup className="justify-content-center d-flex flex-column align-items-center">
                    {imgData ? (
                      <img style={styles.profileImg} src={imgData} alt="" />
                    ) : (
                      <img
                        style={styles.profileImg}
                        src={
                          user.profileImage
                            ? 'http://d3o5w1w6u67fah.cloudfront.net/' +
                              user.profileImage
                            : 'http://d3o5w1w6u67fah.cloudfront.net/userImages/user.png'
                        }
                        alt=""
                      />
                    )}
                    <Label
                      className="font-weight-bold edit-profile"
                      for="profile"
                    >
                      <IntlMessages id="Change Profile Picture" />
                    </Label>
                    <Input
                      onChange={onChangePicture}
                      style={{ display: 'none' }}
                      type="file"
                      id="profile"
                    />
                  </FormGroup>
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="exampleEmailGrid">
                          <IntlMessages id="First Name" />
                        </Label>
                        <Input
                          type="text"
                          defaultValue={user.firstName}
                          name="exampleEmailGrid"
                          id="exampleEmailGrid"
                          placeholder="First Name"
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              firstName: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="examplePasswordGrid">
                          <IntlMessages id="Last Name" />
                        </Label>
                        <Input
                          type="text"
                          defaultValue={user.lastName}
                          // name="examplePasswordGrid"
                          // id="examplePasswordGrid"
                          placeholder="Last Name"
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              lastName: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="exampleEmailGrid">
                          <IntlMessages id="forms.email" />
                        </Label>
                        <Input
                          defaultValue={user.email}
                          type="email"
                          name="exampleEmailGrid"
                          id="exampleEmailGrid"
                          placeholder="Email"
                          onChange={(e) => {
                            setformData({ ...formData, email: e.target.value });
                          }}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="examplePasswordGrid">
                          <IntlMessages id="Phone" />
                        </Label>
                        <Input
                          defaultValue={user.phone}
                          type="text"
                          name="examplePasswordGrid"
                          id="examplePasswordGrid"
                          placeholder="Phone"
                          onChange={(e) => {
                            setformData({ ...formData, phone: e.target.value });
                          }}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <FormGroup>
                        <Label for="exampleAddressGrid">
                          <IntlMessages id="Company Name" />
                        </Label>
                        <Input
                          defaultValue={user.company}
                          type="text"
                          name="exampleAddressGrid"
                          id="exampleAddressGrid"
                          placeholder="Company Name"
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              company: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Label for="exampleAddressGrid">
                          <IntlMessages id="forms.address" />
                        </Label>
                        <Input
                          defaultValue={user.address}
                          type="text"
                          name="exampleAddressGrid"
                          id="exampleAddressGrid"
                          placeholder="Address"
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              address: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={4}>
                      <FormGroup>
                        <Label for="exampleAddress2Grid">
                          <IntlMessages id="City" />
                        </Label>
                        <Input
                          defaultValue={user.city}
                          type="text"
                          name="exampleAddress2Grid"
                          id="exampleAddress2Grid"
                          placeholder="City"
                          onChange={(e) => {
                            setformData({ ...formData, city: e.target.value });
                          }}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="exampleAddress2Grid">
                          <IntlMessages id="State" />
                        </Label>
                        <Input
                          defaultValue={user.state}
                          type="text"
                          name="exampleAddress2Grid"
                          id="exampleAddress2Grid"
                          placeholder="State"
                          onChange={(e) => {
                            setformData({ ...formData, state: e.target.value });
                          }}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={3}>
                      <FormGroup>
                        <Label>
                          <IntlMessages id="Country" />
                        </Label>
                        {/* <Input defaultValue={user.country} type="select" onChange={(e) => {
                                                    setformData({ ...formData, country: e.target.value });
                                                }}>

                                                    <option>Select</option>
                                                    {countries.map(item => {
                                                        return (<option>{item}</option>)
                                                    })}

                                                </Input> */}
                        {/* <select value={user.country} onChange={(e) => {
                                                    setformData({ ...formData, country: e.target.value })
                                                }}>
                                                <option>Select</option>
                                                    {countries.map(item => {
                                                        return (<option>{item}</option>)
                                                    })}
                                                </select> */}
                        <Input
                          defaultValue={user.country}
                          type="text"
                          name="exampleAddress2Grid"
                          id="exampleAddress2Grid"
                          placeholder="State"
                          onChange={(e) => {
                            setformData({ ...formData, state: e.target.value });
                          }}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={2}>
                      <FormGroup>
                        <Label for="exampleZipGrid">
                          <IntlMessages id="forms.zip" />
                        </Label>
                        <Input
                          defaultValue={user.zipcode}
                          type="text"
                          name="exampleZipGrid"
                          id="exampleZipGrid"
                          placeholder="Zip"
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              zipcode: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="exampleZipGrid">
                          <IntlMessages id="NewPassword" />
                        </Label>
                        <Input
                          defaultValue=""
                          type="password"
                          name="exampleZipGrid"
                          id="exampleZipGrid"
                          placeholder="New Password"
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              password: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="exampleZipGrid">
                          <IntlMessages id="Confirm Password" />
                        </Label>
                        <Input
                          defaultValue=""
                          type="password"
                          name="exampleZipGrid"
                          id="exampleZipGrid"
                          placeholder="Confirm Password"
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              confirmPassword: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Colxx>
                  </FormGroup>

                  <Button onClick={submit} color="primary">
                    <IntlMessages id="Save Changes" />
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    </>
  );
};

export default EditProfile;
