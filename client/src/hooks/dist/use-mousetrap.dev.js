"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mousetrap = _interopRequireDefault(require("mousetrap"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-expressions */

/**
 * Use mousetrap hook
 *
 * @param  {(string | string[])} handlerKey - A key, key combo or array of combos according to Mousetrap documentation.
 * @param  { function } handlerCallback - A function that is triggered on key combo catch.
 */
var _default = function _default(handlerKey, handlerCallback) {
  var actionRef = (0, _react.useRef)(null);
  actionRef.current = handlerCallback;
  (0, _react.useEffect)(function () {
    _mousetrap["default"].bind(handlerKey, function (evt, combo) {
      typeof actionRef.current === 'function' && actionRef.current(evt, combo);
      evt.preventDefault();
    });

    return function () {
      _mousetrap["default"].unbind(handlerKey);
    };
  }, [handlerKey]);
};

exports["default"] = _default;