import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { forgotPassword } from '../../redux/actions';
import { NotificationManager } from '../../components/common/react-notifications';
import axios from "axios"
import { reset } from 'mousetrap';

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const ForgotPassword = ({
  history,
  forgotUserMail,
  loading,
  error,
  forgotPasswordAction,
}) => {
  const [response, setResponse] = useState({})
  const [formData, setformData] = useState({})
const styles = {
  border:{
    border:"2px solid green"
  }
}

  // SEND THE OTP
  const SendOtp = () => {
    console.log(formData);
    axios.post("/api/send-OTP", formData).then(res => {
      console.log(res.data);
      if (res.data.success) {
        setResponse({ email: res.data.email, otp: res.data.otp, expiration: res.data.expiration })
        NotificationManager.success(res.data.success, 'Password Error', 3000, null, null, '');
      }
      else if (res.data.error) {
        NotificationManager.warning(res.data.error, 'Password Error', 3000, null, null, '');
      }

    })
  }
const Reset =(e)=>{
  e.preventDefault()
  if(!response.verified){
    localStorage.setItem("userEmail", response.email);
  window.location.href ="/user/reset-password"
  }
  else{
    NotificationManager.warning("OTP not verified", 'OTP error', 3000, null, null, '');
  }
}

// console.log(timenow);
// if (response.expiration) {
//   const exp = new Date(response.expiration)
//   console.log(exp);
//   if (exp.getTime() < timenow.getTime()) {
//     console.log(true);
//   }
//   console.log(false);
// }
// RESEND THE PASSWORD
const resend = (e) => {
  const timenow = new Date()
  console.log(timenow);
  const exp = new Date(response.expiration)
  // IF EXPIRY TIME HAS NOT CROSSED, THEN ERROR
  if (exp.getTime() > timenow.getTime()) {
    NotificationManager.warning(
      "OTP is still valid ",
      'OTP error',
      3000,
      null,
      null,
      ''
    );
    console.log(formData);
  } else {
    // ELSE, RESEND INITIATED
    console.log(formData);
    axios.post("/send-OTP", formData).then(res => {
      console.log(res.data);
      if (res.data.success) {
        setResponse({ email: res.data.email, otp: res.data.otp, expiration: res.data.expiration })
        NotificationManager.warning(
          res.data.success,
          'Success',
          3000,
          null,
          null,
          ''
        );
      }
      else if (res.data.error) {
        NotificationManager.warning(
          res.data.error,
          'Error',
          3000,
          null,
          null,
          ''
        );
      }

    })
  }
}




  // useEffect(() => {
  //   if (error) {
  //     NotificationManager.warning(
  //       error,
  //       'Forgot Password Error',
  //       3000,
  //       null,
  //       null,
  //       ''
  //     );
  //   } else if (!loading && forgotUserMail === 'success')
  //     NotificationManager.success(
  //       'Please check your email.',
  //       'Forgot Password Success',
  //       3000,
  //       null,
  //       null,
  //       ''
  //     );
  // }, [error, forgotUserMail, loading]);


  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your e-mail to reset your password. <br />
              If you are not a member, please{' '}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.forgot-password" />
            </CardTitle>

            <Formik>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                      onChange={(e) => {
                        setformData({ email: e.target.value })
                      }}
                    />

                  </FormGroup>
                  {response.otp ? <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="OTP" />
                    </Label>
                    <Field
                      className="form-control"
                      name="Otp"
                      validate={validateEmail}
                      onChange={(e) => {
                        if (e.target.value == response.otp) {
                          setResponse({ ...response, verified: false })
                          NotificationManager.success("OTP verified", 'Success', 3000, null, null, '');
                        }
                        else if (e.target.value.length == 4 && e.target.value != response.otp) {
                          setResponse({ ...response, verified: true })
                          NotificationManager.warning("Incorrect OTP", 'Error', 3000, null, null, '');

                        }
                      }}
                    />

                  </FormGroup> : ""}

                  <div className="d-flex justify-content-between align-items-center">
                    {response.otp ? <div style={{cursor:'pointer'}} onClick={resend}>Resend</div> : ""}
                    {response.otp ? <Button
                      onClick={Reset}
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${loading ? 'show-spinner' : ''
                        }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        Reset
                      </span>
                    </Button> : <Button
                      onClick={SendOtp}
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${loading ? 'show-spinner' : ''
                        }`}
                      size="lg"
                    >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          Send OTP
                      </span>
                      </Button>}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(mapStateToProps, {
  forgotPasswordAction: forgotPassword,
})(ForgotPassword);


