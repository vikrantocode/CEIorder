import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { resetPassword } from '../../redux/actions';
import { NotificationManager } from '../../components/common/react-notifications';
import axios from "axios"

const validateNewPassword = (values) => {
  const { newPassword, newPasswordAgain } = values;
  const errors = {};
  if (newPasswordAgain && newPassword !== newPasswordAgain) {
    errors.newPasswordAgain = 'Please check your new password';
  }
  return errors;
};



const ResetPassword = ({
  location,
  history,
  loading,
  error,
  resetPasswordAction,
}) => {
  const [formData, setformData] = useState({})
  const userEmail = () => {
    const email = localStorage.getItem("userEmail")
    return email
  }
  console.log(userEmail());
  useEffect(()=>{
    if(userEmail()){
      console.log("hi");
    }
    else{
      window.location.href="/user/login"
    }
  })
  // CHANGE PASSWORD REQUEST
  const changePassword = (e) => {
    // WHILE EXPIRATION TIME IS GREATER THAN CURRENT TIME
    if (formData.password == formData.ConfirmPassword) {
      axios.post("/api/change-password", formData).then(res => {
        console.log(res.data);
        if (res.data.success) {
          NotificationManager.success(res.data.success, 'Success', 3000, null, null, '');
          setformData({})
          localStorage.removeItem("userEmail");
        }
        else if (res.data.error) {
          NotificationManager.warning(res.data.error, 'Error', 3000, null, null, '');
        }
      })
    }
    // IF PASSWORD AND CONFIRM PASSWORD DO NOT MATCH
    else {
      NotificationManager.warning("Password do not match", 'Error', 3000, null, null, '');
    }


    // }
    // else {
    //   NotificationManager.warning("OTP expired", 'OTP Error', 3000, null, null, '');
    // }

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
  //   } else if (!loading && newPassword === 'success')
  //     NotificationManager.success(
  //       'Please login with your new password.',
  //       'Reset Password Success',
  //       3000,
  //       null,
  //       null,
  //       ''
  //     );
  // }, [error, loading, newPassword]);

  // const onResetPassword = (values) => {
  //   if (!loading) {
  //     const params = new URLSearchParams(location.search);
  //     const oobCode = params.get('oobCode');
  //     if (oobCode) {
  //       if (values.newPassword !== '') {
  //         resetPasswordAction({
  //           newPassword: values.newPassword,
  //           resetPasswordCode: oobCode,
  //           history,
  //         });
  //       }
  //     } else {
  //       NotificationManager.warning(
  //         'Please check your email url.',
  //         'Reset Password Error',
  //         3000,
  //         null,
  //         null,
  //         ''
  //       );
  //     }
  //   }
  // };


  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your e-mail to reset your password. <br />
              If you are not a member, please{' '}
              <NavLink to="/register" className="white">
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
              <IntlMessages id="user.reset-password" />
            </CardTitle>

            <Formik>

              <Form className="av-tooltip tooltip-label-bottom">
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="user.new-password" />
                  </Label>
                  <Field
                    onChange={(e) => {
                      setformData({ ...formData, password: e.target.value ,email:userEmail()})
                    }}
                    className="form-control"
                    name="newPassword"
                    type="password"
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="user.new-password-again" />
                  </Label>
                  <Field
                    className="form-control"
                    name="newPasswordAgain"
                    type="password"
                    onChange={(e) => { setformData({ ...formData, ConfirmPassword: e.target.value }) }}

                  />

                </FormGroup>

                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to="/user/login">
                    <IntlMessages id="user.login-title" />
                  </NavLink>
                  <Button
                    onClick={changePassword}
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
                      <IntlMessages id="user.reset-password-button" />
                    </span>
                  </Button>
                </div>
              </Form>

            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { newPassword, resetPasswordCode, loading, error } = authUser;
  return { newPassword, resetPasswordCode, loading, error };
};

export default connect(mapStateToProps, {
  resetPasswordAction: resetPassword,
})(ResetPassword);
