"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rootSaga;

var _effects = require("redux-saga/effects");

var _saga = _interopRequireDefault(require("./auth/saga"));

var _saga2 = _interopRequireDefault(require("./todo/saga"));

var _saga3 = _interopRequireDefault(require("./chat/saga"));

var _saga4 = _interopRequireDefault(require("./surveyList/saga"));

var _saga5 = _interopRequireDefault(require("./surveyDetail/saga"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);

function rootSaga(getState) {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.all)([(0, _saga["default"])(), (0, _saga2["default"])(), (0, _saga3["default"])(), (0, _saga4["default"])(), (0, _saga5["default"])()]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}