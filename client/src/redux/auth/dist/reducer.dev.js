"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = require("../actions");

var _Utils = require("../../helpers/Utils");

var _defaultValues = require("../../constants/defaultValues");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INIT_STATE = {
  currentUser: _defaultValues.isAuthGuardActive ? _defaultValues.currentUser : (0, _Utils.getCurrentUser)(),
  forgotUserMail: '',
  newPassword: '',
  resetPasswordCode: '',
  loading: false,
  error: ''
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.LOGIN_USER:
      return _objectSpread({}, state, {
        loading: true,
        error: ''
      });

    case _actions.LOGIN_USER_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        currentUser: action.payload,
        error: ''
      });

    case _actions.LOGIN_USER_ERROR:
      return _objectSpread({}, state, {
        loading: false,
        currentUser: null,
        error: action.payload.message
      });

    case _actions.FORGOT_PASSWORD:
      return _objectSpread({}, state, {
        loading: true,
        error: ''
      });

    case _actions.FORGOT_PASSWORD_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        forgotUserMail: action.payload,
        error: ''
      });

    case _actions.FORGOT_PASSWORD_ERROR:
      return _objectSpread({}, state, {
        loading: false,
        forgotUserMail: '',
        error: action.payload.message
      });

    case _actions.RESET_PASSWORD:
      return _objectSpread({}, state, {
        loading: true,
        error: ''
      });

    case _actions.RESET_PASSWORD_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        newPassword: action.payload,
        resetPasswordCode: '',
        error: ''
      });

    case _actions.RESET_PASSWORD_ERROR:
      return _objectSpread({}, state, {
        loading: false,
        newPassword: '',
        resetPasswordCode: '',
        error: action.payload.message
      });

    case _actions.REGISTER_USER:
      return _objectSpread({}, state, {
        loading: true,
        error: ''
      });

    case _actions.REGISTER_USER_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        currentUser: action.payload,
        error: ''
      });

    case _actions.REGISTER_USER_ERROR:
      return _objectSpread({}, state, {
        loading: false,
        currentUser: null,
        error: action.payload.message
      });

    case _actions.LOGOUT_USER:
      return _objectSpread({}, state, {
        currentUser: null,
        error: ''
      });

    default:
      return _objectSpread({}, state);
  }
};

exports["default"] = _default;