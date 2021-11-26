"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeLocale = void 0;

var _actions = require("../actions");

var _Utils = require("../../helpers/Utils");

var changeLocale = function changeLocale(locale) {
  (0, _Utils.setCurrentLanguage)(locale);
  return {
    type: _actions.CHANGE_LOCALE,
    payload: locale
  };
};

exports.changeLocale = changeLocale;