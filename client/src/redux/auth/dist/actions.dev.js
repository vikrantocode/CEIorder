"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutUser = exports.registerUserError = exports.registerUserSuccess = exports.registerUser = exports.resetPasswordError = exports.resetPasswordSuccess = exports.resetPassword = exports.forgotPasswordError = exports.forgotPasswordSuccess = exports.forgotPassword = exports.loginUserError = exports.loginUserSuccess = exports.loginUser = void 0;

var _actions = require("../actions");

var loginUser = function loginUser(user, history) {
  return {
    type: _actions.LOGIN_USER,
    payload: {
      user: user,
      history: history
    }
  };
};

exports.loginUser = loginUser;

var loginUserSuccess = function loginUserSuccess(user) {
  return {
    type: _actions.LOGIN_USER_SUCCESS,
    payload: user
  };
};

exports.loginUserSuccess = loginUserSuccess;

var loginUserError = function loginUserError(message) {
  return {
    type: _actions.LOGIN_USER_ERROR,
    payload: {
      message: message
    }
  };
};

exports.loginUserError = loginUserError;

var forgotPassword = function forgotPassword(forgotUserMail, history) {
  return {
    type: _actions.FORGOT_PASSWORD,
    payload: {
      forgotUserMail: forgotUserMail,
      history: history
    }
  };
};

exports.forgotPassword = forgotPassword;

var forgotPasswordSuccess = function forgotPasswordSuccess(forgotUserMail) {
  return {
    type: _actions.FORGOT_PASSWORD_SUCCESS,
    payload: forgotUserMail
  };
};

exports.forgotPasswordSuccess = forgotPasswordSuccess;

var forgotPasswordError = function forgotPasswordError(message) {
  return {
    type: _actions.FORGOT_PASSWORD_ERROR,
    payload: {
      message: message
    }
  };
};

exports.forgotPasswordError = forgotPasswordError;

var resetPassword = function resetPassword(_ref) {
  var resetPasswordCode = _ref.resetPasswordCode,
      newPassword = _ref.newPassword,
      history = _ref.history;
  return {
    type: _actions.RESET_PASSWORD,
    payload: {
      resetPasswordCode: resetPasswordCode,
      newPassword: newPassword,
      history: history
    }
  };
};

exports.resetPassword = resetPassword;

var resetPasswordSuccess = function resetPasswordSuccess(newPassword) {
  return {
    type: _actions.RESET_PASSWORD_SUCCESS,
    payload: newPassword
  };
};

exports.resetPasswordSuccess = resetPasswordSuccess;

var resetPasswordError = function resetPasswordError(message) {
  return {
    type: _actions.RESET_PASSWORD_ERROR,
    payload: {
      message: message
    }
  };
};

exports.resetPasswordError = resetPasswordError;

var registerUser = function registerUser(user, history) {
  return {
    type: _actions.REGISTER_USER,
    payload: {
      user: user,
      history: history
    }
  };
};

exports.registerUser = registerUser;

var registerUserSuccess = function registerUserSuccess(user) {
  return {
    type: _actions.REGISTER_USER_SUCCESS,
    payload: user
  };
};

exports.registerUserSuccess = registerUserSuccess;

var registerUserError = function registerUserError(message) {
  return {
    type: _actions.REGISTER_USER_ERROR,
    payload: {
      message: message
    }
  };
};

exports.registerUserError = registerUserError;

var logoutUser = function logoutUser(history) {
  return {
    type: _actions.LOGOUT_USER,
    payload: {
      history: history
    }
  };
};

exports.logoutUser = logoutUser;