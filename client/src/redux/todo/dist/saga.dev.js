"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchGetList = watchGetList;
exports.wathcAddItem = wathcAddItem;
exports["default"] = rootSaga;

var _effects = require("redux-saga/effects");

var _Utils = require("../../helpers/Utils");

var _actions = require("../actions");

var _actions2 = require("./actions");

var _todos = _interopRequireDefault(require("../../data/todos.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getTodoListItems),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(addTodoItem),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(watchGetList),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(wathcAddItem),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);

var getTodoListRequest = function getTodoListRequest() {
  return regeneratorRuntime.async(function getTodoListRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (success, fail) {
            setTimeout(function () {
              success(_todos["default"].data);
            }, 1000);
          }).then(function (response) {
            return response;
          })["catch"](function (error) {
            return error;
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

function getTodoListItems() {
  var response;
  return regeneratorRuntime.wrap(function getTodoListItems$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(getTodoListRequest);

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return (0, _effects.put)((0, _actions2.getTodoListSuccess)(response));

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 12;
          return (0, _effects.put)((0, _actions2.getTodoListError)(_context2.t0));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked, null, [[0, 8]]);
}

var addTodoItemRequest = function addTodoItemRequest(item) {
  var items;
  return regeneratorRuntime.async(function addTodoItemRequest$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          items = _todos["default"].data;
          item.id = items.length + 1;
          item.createDate = (0, _Utils.getDateWithFormat)();
          items.splice(0, 0, item);
          _context3.next = 6;
          return regeneratorRuntime.awrap(new Promise(function (success, fail) {
            setTimeout(function () {
              success(items);
            }, 1000);
          }).then(function (response) {
            return response;
          })["catch"](function (error) {
            return error;
          }));

        case 6:
          return _context3.abrupt("return", _context3.sent);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

function addTodoItem(_ref) {
  var payload, response;
  return regeneratorRuntime.wrap(function addTodoItem$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          payload = _ref.payload;
          _context4.prev = 1;
          _context4.next = 4;
          return (0, _effects.call)(addTodoItemRequest, payload);

        case 4:
          response = _context4.sent;
          _context4.next = 7;
          return (0, _effects.put)((0, _actions2.addTodoItemSuccess)(response));

        case 7:
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](1);
          _context4.next = 13;
          return (0, _effects.put)((0, _actions2.addTodoItemError)(_context4.t0));

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked2, null, [[1, 9]]);
}

function watchGetList() {
  return regeneratorRuntime.wrap(function watchGetList$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.takeEvery)(_actions.TODO_GET_LIST, getTodoListItems);

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked3);
}

function wathcAddItem() {
  return regeneratorRuntime.wrap(function wathcAddItem$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.takeEvery)(_actions.TODO_ADD_ITEM, addTodoItem);

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked4);
}

function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.all)([(0, _effects.fork)(watchGetList), (0, _effects.fork)(wathcAddItem)]);

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked5);
}