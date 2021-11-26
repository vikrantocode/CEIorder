"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = require("../actions");

var _defaultValues = require("../../constants/defaultValues");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INIT_STATE = {
  containerClassnames: _defaultValues.defaultMenuType,
  subHiddenBreakpoint: _defaultValues.subHiddenBreakpoint,
  menuHiddenBreakpoint: _defaultValues.menuHiddenBreakpoint,
  menuClickCount: 0,
  selectedMenuHasSubItems: _defaultValues.defaultMenuType === 'menu-default' // if you use menu-sub-hidden as default menu type, set value of this variable to false

};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.MENU_CHANGE_HAS_SUB_ITEM_STATUS:
      return _objectSpread({}, state, {
        selectedMenuHasSubItems: action.payload
      });

    case _actions.MENU_SET_CLASSNAMES:
      return _objectSpread({}, state, {
        containerClassnames: action.payload.containerClassnames,
        menuClickCount: action.payload.menuClickCount
      });

    case _actions.MENU_CLICK_MOBILE_MENU:
      return _objectSpread({}, state, {
        containerClassnames: action.payload.containerClassnames,
        menuClickCount: action.payload.menuClickCount
      });

    case _actions.MENU_CONTAINER_ADD_CLASSNAME:
      return _objectSpread({}, state, {
        containerClassnames: action.payload
      });

    case _actions.MENU_CHANGE_DEFAULT_CLASSES:
      return _objectSpread({}, state, {
        containerClassnames: action.payload
      });

    default:
      return _objectSpread({}, state);
  }
};

exports["default"] = _default;