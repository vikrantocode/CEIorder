"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function authHeader() {
  var user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return {
      'token': user.token
    };
  } else {
    return {};
  }
}

var getCurrentUser = function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
};

var _default = {
  authHeader: authHeader,
  getCurrentUser: getCurrentUser
};
exports["default"] = _default;