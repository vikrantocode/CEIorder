import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import { adminRoot } from '../../constants/defaultValues'
import { NotificationManager } from '../../components/common/react-notifications';

import axios  from "axios"
const Register = ({ history }) => {
  const [formData, setformData] = useState({})
  //VALIDATE PASSWORD
  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your password';
    } else if (value.length < 8) {
      error = 'Value must be longer than 8 characters';
    }
    return error;
  };
  // SUBMIT FORM HANDLER
  const onUserRegister = (e) => {
    e.preventDefault()
    const data = formData
    axios.post("/api/signup", data).then((result => {
      console.log(result.data);
      if (result.data.error) {
        NotificationManager.warning(
          result.data.error,
          'Registeration error',
          3000,
          null,
          null,
          ''
        );
      }
      else {
        history.push("/user/login")
        
      }

    }))

  }


  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
          <div style={{fontSize:'2.5rem'}}>BUY SUPPLY APP</div>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Form>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="Firstname" />
                </Label>
                <Input  type="name" onChange={(e) => {
                    setformData({ ...formData, firstName: e.target.value });
                  }} />
              </FormGroup>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="LastName" />
                </Label>
                <Input type="name" onChange={(e) => {
                    setformData({ ...formData, lastName: e.target.value });
                  }} />
              </FormGroup>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.email" />
                </Label>
                <Input
                  type="email"
                  onChange={(e) => {
                    setformData({ ...formData, email: e.target.value });
                  }}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.password" />
                </Label>
                <Input validate={validatePassword} type="password" onChange={(e) => {
                    setformData({ ...formData, password: e.target.value });
                  }}/>
              </FormGroup>

              <div className="d-flex justify-content-end align-items-center">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={onUserRegister}
                >
                  <IntlMessages id="user.register-button" />
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = () => { };

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
