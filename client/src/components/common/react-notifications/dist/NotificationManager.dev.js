"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = require("events");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var createUUID = function createUUID() {
  var pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return pattern.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

var Constants = {
  CHANGE: 'change',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

var NotificationManager =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(NotificationManager, _EventEmitter);

  function NotificationManager() {
    var _this;

    _classCallCheck(this, NotificationManager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NotificationManager).call(this));
    _this.listNotify = [];
    return _this;
  }

  _createClass(NotificationManager, [{
    key: "create",
    value: function create(notify) {
      var defaultNotify = {
        id: createUUID(),
        type: 'info',
        title: null,
        message: null,
        timeOut: 5000,
        customClassName: ''
      };

      if (notify.priority) {
        this.listNotify.unshift(Object.assign(defaultNotify, notify));
      } else {
        this.listNotify.push(Object.assign(defaultNotify, notify));
      }

      this.emitChange();
    }
  }, {
    key: "primary",
    value: function primary(message, title, timeOut, onClick, priority, customClassName) {
      this.create({
        type: Constants.PRIMARY,
        message: message,
        title: title,
        timeOut: timeOut,
        onClick: onClick,
        priority: priority,
        customClassName: customClassName
      });
    }
  }, {
    key: "secondary",
    value: function secondary(message, title, timeOut, onClick, priority, customClassName) {
      this.create({
        type: Constants.SECONDARY,
        message: message,
        title: title,
        timeOut: timeOut,
        onClick: onClick,
        priority: priority,
        customClassName: customClassName
      });
    }
  }, {
    key: "info",
    value: function info(message, title, timeOut, onClick, priority, customClassName) {
      this.create({
        type: Constants.INFO,
        message: message,
        title: title,
        timeOut: timeOut,
        onClick: onClick,
        priority: priority,
        customClassName: customClassName
      });
    }
  }, {
    key: "success",
    value: function success(message, title, timeOut, onClick, priority, customClassName) {
      this.create({
        type: Constants.SUCCESS,
        message: message,
        title: title,
        timeOut: timeOut,
        onClick: onClick,
        priority: priority,
        customClassName: customClassName
      });
    }
  }, {
    key: "warning",
    value: function warning(message, title, timeOut, onClick, priority, customClassName) {
      this.create({
        type: Constants.WARNING,
        message: message,
        title: title,
        timeOut: timeOut,
        onClick: onClick,
        priority: priority,
        customClassName: customClassName
      });
    }
  }, {
    key: "error",
    value: function error(message, title, timeOut, onClick, priority, customClassName) {
      this.create({
        type: Constants.ERROR,
        message: message,
        title: title,
        timeOut: timeOut,
        onClick: onClick,
        priority: priority,
        customClassName: customClassName
      });
    }
  }, {
    key: "remove",
    value: function remove(notification) {
      this.listNotify = this.listNotify.filter(function (n) {
        return notification.id !== n.id;
      });
      this.emitChange();
    }
  }, {
    key: "emitChange",
    value: function emitChange() {
      this.emit(Constants.CHANGE, this.listNotify);
    }
  }, {
    key: "addChangeListener",
    value: function addChangeListener(callback) {
      this.addListener(Constants.CHANGE, callback);
    }
  }, {
    key: "removeChangeListener",
    value: function removeChangeListener(callback) {
      this.removeListener(Constants.CHANGE, callback);
    }
  }]);

  return NotificationManager;
}(_events.EventEmitter);

var _default = new NotificationManager();

exports["default"] = _default;