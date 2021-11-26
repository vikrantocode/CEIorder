"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reducer = _interopRequireDefault(require("./settings/reducer"));

var _reducer2 = _interopRequireDefault(require("./menu/reducer"));

var _reducer3 = _interopRequireDefault(require("./auth/reducer"));

var _reducer4 = _interopRequireDefault(require("./todo/reducer"));

var _reducer5 = _interopRequireDefault(require("./chat/reducer"));

var _reducer6 = _interopRequireDefault(require("./surveyList/reducer"));

var _reducer7 = _interopRequireDefault(require("./surveyDetail/reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducers = (0, _redux.combineReducers)({
  menu: _reducer2["default"],
  settings: _reducer["default"],
  authUser: _reducer3["default"],
  todoApp: _reducer4["default"],
  chatApp: _reducer5["default"],
  surveyListApp: _reducer6["default"],
  surveyDetailApp: _reducer7["default"]
});
var _default = reducers;
exports["default"] = _default;