import React, { useState, useEffect, use } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications';

import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

// const validatePassword = (value) => {
//   let error;
//   if (!value) {
//     error = 'Please enter your password';
//   } else if (value.length < 8) {
//     error = 'Value must be longer than 8 characters';
//   }
//   return error;
// };
const styles = {
  divStyle: {
    margin: '1rem',
  },
};
function InvalidMsg(textbox) {
  if (textbox.value.length < 8) {
    textbox.setCustomValidity('Password should be minimum 8 characters');
  } else {
    textbox.setCustomValidity('');
  }
  return true;
}
const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction }) => {
  const [formData, setformData] = useState({});

  // WHEN GOOGLE LOGIN IS SUCCESSFULL
  const onSuccessGoogle = (response) => {
    console.log(response);
    axios
      .post('/api/googleLogin', { tokenId: response.tokenId })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('auth-token', response.data.token);
          // setAlert({ success: response.data.success })
          history.push('/app');
        } else if (response.data.error) {
          console.log(response.data.error);
          // setAlert({ error: response.data.error })
          // setOpen(true)
        }
      });
  };
  // IF GOOGLE LOGIN IS NOT SUCCESSFUL

  const onFailureGoogle = (response) => {
    console.log(response);
  };

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  // const onUserLogin = (values) => {
  //   if (!loading) {
  //     if (values.email !== '' && values.password !== '') {
  //       loginUserAction(values, history);
  //     }
  //   }
  // };
  //LOGIN HANDLER
  const onUserLogin = (e) => {
    e.preventDefault();
    const data = formData;
    axios.post('/api/login', data).then((response) => {
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('auth-token', response.data.token);
        history.push('/app');
      } else if (response.data.error) {
        NotificationManager.warning(
          response.data.error,
          'Login Error',
          3000,
          null,
          null,
          ''
        );
      }
    });
  };
  // const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <div style={{ fontSize: '2.5rem' }}>BUY SUPPLY APP</div>
            {/* </NavLink> */}
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik>
              {/* {({ errors, touched }) => ( */}
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
                      setformData({ ...formData, email: e.target.value });
                    }}
                  />
                  {/* {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )} */}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="user.password" />
                  </Label>
                  <Field
                    onChange={(e) => {
                      setformData({ ...formData, password: e.target.value });
                    }}
                    className="form-control"
                    type="password"
                    name="password"
                    oninput={() => InvalidMsg(this)}
                    onvalid={() => InvalidMsg(this)}
                  />
                  {/* {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )} */}
                </FormGroup>
                <div
                  style={styles.divStyle}
                  className="d-flex justify-content-center align-items-center"
                >
                  OR
                </div>
                <div
                  style={styles.divStyle}
                  className="d-flex justify-content-center align-items-center"
                >
                  <GoogleLogin
                    clientId="501516992284-icth2bhte5iu6fpskcd97hcia62f9qdd.apps.googleusercontent.com"
                    // render={renderProps => (
                    //   <button onClick={renderProps.onClick} style={{background:'red',height:'2rem',width:'8rem'}}>Login with google</button>
                    // )}
                    buttonText="Login with Google"
                    onSuccess={onSuccessGoogle}
                    onFailure={onFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to="/user/forgot-password">
                    <IntlMessages id="user.forgot-password-question" />
                  </NavLink>
                  <NavLink to="/user/register">
                    <IntlMessages id="Create an Account" />
                  </NavLink>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    onClick={onUserLogin}
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${
                      loading ? 'show-spinner' : ''
                    }`}
                    size="lg"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="user.login-button" />
                    </span>
                  </Button>
                </div>
              </Form>
              {/* )} */}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
