"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchLoginUser = watchLoginUser;
exports.watchRegisterUser = watchRegisterUser;
exports.watchLogoutUser = watchLogoutUser;
exports.watchForgotPassword = watchForgotPassword;
exports.watchResetPassword = watchResetPassword;
exports["default"] = rootSaga;

var _effects = require("redux-saga/effects");

var _Firebase = require("../../helpers/Firebase");

var _actions = require("../actions");

var _actions2 = require("./actions");

var _defaultValues = require("../../constants/defaultValues");

var _Utils = require("../../helpers/Utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watchLoginUser),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(loginWithEmailPassword),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(watchRegisterUser),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(registerWithEmailPassword),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(watchLogoutUser),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(logout),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(watchForgotPassword),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(forgotPassword),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(watchResetPassword),
    _marked10 =
/*#__PURE__*/
regeneratorRuntime.mark(resetPassword),
    _marked11 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);

function watchLoginUser() {
  return regeneratorRuntime.wrap(function watchLoginUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)(_actions.LOGIN_USER, loginWithEmailPassword);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var loginWithEmailPasswordAsync = function loginWithEmailPasswordAsync(email, password) {
  return regeneratorRuntime.async(function loginWithEmailPasswordAsync$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_Firebase.auth.signInWithEmailAndPassword(email, password).then(function (user) {
            return user;
          })["catch"](function (error) {
            return error;
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

function loginWithEmailPassword(_ref) {
  var payload, _payload$user, email, password, history, loginUser, item;

  return regeneratorRuntime.wrap(function loginWithEmailPassword$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          payload = _ref.payload;
          _payload$user = payload.user, email = _payload$user.email, password = _payload$user.password;
          history = payload.history;
          _context3.prev = 3;
          _context3.next = 6;
          return (0, _effects.call)(loginWithEmailPasswordAsync, email, password);

        case 6:
          loginUser = _context3.sent;

          if (loginUser.message) {
            _context3.next = 15;
            break;
          }

          item = _objectSpread({
            uid: loginUser.user.uid
          }, _defaultValues.currentUser);
          (0, _Utils.setCurrentUser)(item);
          _context3.next = 12;
          return (0, _effects.put)((0, _actions2.loginUserSuccess)(item));

        case 12:
          history.push(_defaultValues.adminRoot);
          _context3.next = 17;
          break;

        case 15:
          _context3.next = 17;
          return (0, _effects.put)((0, _actions2.loginUserError)(loginUser.message));

        case 17:
          _context3.next = 23;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](3);
          _context3.next = 23;
          return (0, _effects.put)((0, _actions2.loginUserError)(_context3.t0));

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked2, null, [[3, 19]]);
}

function watchRegisterUser() {
  return regeneratorRuntime.wrap(function watchRegisterUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeEvery)(_actions.REGISTER_USER, registerWithEmailPassword);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked3);
}

var registerWithEmailPasswordAsync = function registerWithEmailPasswordAsync(email, password) {
  return regeneratorRuntime.async(function registerWithEmailPasswordAsync$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_Firebase.auth.createUserWithEmailAndPassword(email, password).then(function (user) {
            return user;
          })["catch"](function (error) {
            return error;
          }));

        case 2:
          return _context5.abrupt("return", _context5.sent);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
};

function registerWithEmailPassword(_ref2) {
  var payload, _payload$user2, email, password, history, registerUser, item;

  return regeneratorRuntime.wrap(function registerWithEmailPassword$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          payload = _ref2.payload;
          _payload$user2 = payload.user, email = _payload$user2.email, password = _payload$user2.password;
          history = payload.history;
          _context6.prev = 3;
          _context6.next = 6;
          return (0, _effects.call)(registerWithEmailPasswordAsync, email, password);

        case 6:
          registerUser = _context6.sent;

          if (registerUser.message) {
            _context6.next = 15;
            break;
          }

          item = _objectSpread({
            uid: registerUser.user.uid
          }, _defaultValues.currentUser);
          (0, _Utils.setCurrentUser)(item);
          _context6.next = 12;
          return (0, _effects.put)((0, _actions2.registerUserSuccess)(item));

        case 12:
          history.push(_defaultValues.adminRoot);
          _context6.next = 17;
          break;

        case 15:
          _context6.next = 17;
          return (0, _effects.put)((0, _actions2.registerUserError)(registerUser.message));

        case 17:
          _context6.next = 23;
          break;

        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6["catch"](3);
          _context6.next = 23;
          return (0, _effects.put)((0, _actions2.registerUserError)(_context6.t0));

        case 23:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked4, null, [[3, 19]]);
}

function watchLogoutUser() {
  return regeneratorRuntime.wrap(function watchLogoutUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.takeEvery)(_actions.LOGOUT_USER, logout);

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked5);
}

var logoutAsync = function logoutAsync(history) {
  return regeneratorRuntime.async(function logoutAsync$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(_Firebase.auth.signOut().then(function (user) {
            return user;
          })["catch"](function (error) {
            return error;
          }));

        case 2:
          history.push(_defaultValues.adminRoot);

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
};

function logout(_ref3) {
  var payload, history;
  return regeneratorRuntime.wrap(function logout$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          payload = _ref3.payload;
          history = payload.history;
          (0, _Utils.setCurrentUser)();
          _context9.next = 5;
          return (0, _effects.call)(logoutAsync, history);

        case 5:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked6);
}

function watchForgotPassword() {
  return regeneratorRuntime.wrap(function watchForgotPassword$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _effects.takeEvery)(_actions.FORGOT_PASSWORD, forgotPassword);

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked7);
}

var forgotPasswordAsync = function forgotPasswordAsync(email) {
  return regeneratorRuntime.async(function forgotPasswordAsync$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(_Firebase.auth.sendPasswordResetEmail(email).then(function (user) {
            return user;
          })["catch"](function (error) {
            return error;
          }));

        case 2:
          return _context11.abrupt("return", _context11.sent);

        case 3:
        case "end":
          return _context11.stop();
      }
    }
  });
};

function forgotPassword(_ref4) {
  var payload, email, forgotPasswordStatus;
  return regeneratorRuntime.wrap(function forgotPassword$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          payload = _ref4.payload;
          email = payload.forgotUserMail.email;
          _context12.prev = 2;
          _context12.next = 5;
          return (0, _effects.call)(forgotPasswordAsync, email);

        case 5:
          forgotPasswordStatus = _context12.sent;

          if (forgotPasswordStatus) {
            _context12.next = 11;
            break;
          }

          _context12.next = 9;
          return (0, _effects.put)((0, _actions2.forgotPasswordSuccess)('success'));

        case 9:
          _context12.next = 13;
          break;

        case 11:
          _context12.next = 13;
          return (0, _effects.put)((0, _actions2.forgotPasswordError)(forgotPasswordStatus.message));

        case 13:
          _context12.next = 19;
          break;

        case 15:
          _context12.prev = 15;
          _context12.t0 = _context12["catch"](2);
          _context12.next = 19;
          return (0, _effects.put)((0, _actions2.forgotPasswordError)(_context12.t0));

        case 19:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked8, null, [[2, 15]]);
}

function watchResetPassword() {
  return regeneratorRuntime.wrap(function watchResetPassword$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _effects.takeEvery)(_actions.RESET_PASSWORD, resetPassword);

        case 2:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked9);
}

var resetPasswordAsync = function resetPasswordAsync(resetPasswordCode, newPassword) {
  return regeneratorRuntime.async(function resetPasswordAsync$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(_Firebase.auth.confirmPasswordReset(resetPasswordCode, newPassword).then(function (user) {
            return user;
          })["catch"](function (error) {
            return error;
          }));

        case 2:
          return _context14.abrupt("return", _context14.sent);

        case 3:
        case "end":
          return _context14.stop();
      }
    }
  });
};

function resetPassword(_ref5) {
  var payload, newPassword, resetPasswordCode, resetPasswordStatus;
  return regeneratorRuntime.wrap(function resetPassword$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          payload = _ref5.payload;
          newPassword = payload.newPassword, resetPasswordCode = payload.resetPasswordCode;
          _context15.prev = 2;
          _context15.next = 5;
          return (0, _effects.call)(resetPasswordAsync, resetPasswordCode, newPassword);

        case 5:
          resetPasswordStatus = _context15.sent;

          if (resetPasswordStatus) {
            _context15.next = 11;
            break;
          }

          _context15.next = 9;
          return (0, _effects.put)((0, _actions2.resetPasswordSuccess)('success'));

        case 9:
          _context15.next = 13;
          break;

        case 11:
          _context15.next = 13;
          return (0, _effects.put)((0, _actions2.resetPasswordError)(resetPasswordStatus.message));

        case 13:
          _context15.next = 19;
          break;

        case 15:
          _context15.prev = 15;
          _context15.t0 = _context15["catch"](2);
          _context15.next = 19;
          return (0, _effects.put)((0, _actions2.resetPasswordError)(_context15.t0));

        case 19:
        case "end":
          return _context15.stop();
      }
    }
  }, _marked10, null, [[2, 15]]);
}

function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return (0, _effects.all)([(0, _effects.fork)(watchLoginUser), (0, _effects.fork)(watchLogoutUser), (0, _effects.fork)(watchRegisterUser), (0, _effects.fork)(watchForgotPassword), (0, _effects.fork)(watchResetPassword)]);

        case 2:
        case "end":
          return _context16.stop();
      }
    }
  }, _marked11);
}