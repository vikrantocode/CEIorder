"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.database = exports.auth = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/auth");

require("firebase/database");

var _defaultValues = require("../constants/defaultValues");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].initializeApp(_defaultValues.firebaseConfig);

var auth = _app["default"].auth();

exports.auth = auth;

var database = _app["default"].database();

exports.database = database;