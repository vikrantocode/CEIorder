"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentUser = exports.getCurrentUser = exports.setCurrentLanguage = exports.getCurrentLanguage = exports.setCurrentRadius = exports.getCurrentRadius = exports.setCurrentColor = exports.getCurrentColor = exports.setDirection = exports.getDirection = exports.getCurrentTime = exports.getDateWithFormat = exports.mapOrder = void 0;

var _defaultValues = require("../constants/defaultValues");

var mapOrder = function mapOrder(array, order, key) {
  array.sort(function (a, b) {
    var A = a[key];
    var B = b[key];

    if (order.indexOf("".concat(A)) > order.indexOf("".concat(B))) {
      return 1;
    }

    return -1;
  });
  return array;
};

exports.mapOrder = mapOrder;

var getDateWithFormat = function getDateWithFormat() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; // January is 0!

  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0".concat(dd);
  }

  if (mm < 10) {
    mm = "0".concat(mm);
  }

  return "".concat(dd, ".").concat(mm, ".").concat(yyyy);
};

exports.getDateWithFormat = getDateWithFormat;

var getCurrentTime = function getCurrentTime() {
  var now = new Date();
  return "".concat(now.getHours(), ":").concat(now.getMinutes());
};

exports.getCurrentTime = getCurrentTime;

var getDirection = function getDirection() {
  var direction = _defaultValues.defaultDirection;

  try {
    if (localStorage.getItem('direction')) {
      var localValue = localStorage.getItem('direction');

      if (localValue === 'rtl' || localValue === 'ltr') {
        direction = localValue;
      }
    }
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : getDirection -> error", error);
    direction = _defaultValues.defaultDirection;
  }

  return {
    direction: direction,
    isRtl: direction === 'rtl'
  };
};

exports.getDirection = getDirection;

var setDirection = function setDirection(localValue) {
  var direction = 'ltr';

  if (localValue === 'rtl' || localValue === 'ltr') {
    direction = localValue;
  }

  try {
    localStorage.setItem('direction', direction);
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : setDirection -> error", error);
  }
};

exports.setDirection = setDirection;

var getCurrentColor = function getCurrentColor() {
  var currentColor = _defaultValues.defaultColor;

  try {
    if (localStorage.getItem(_defaultValues.themeColorStorageKey)) {
      currentColor = localStorage.getItem(_defaultValues.themeColorStorageKey);
    }
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : getCurrentColor -> error", error);
    currentColor = _defaultValues.defaultColor;
  }

  return currentColor;
};

exports.getCurrentColor = getCurrentColor;

var setCurrentColor = function setCurrentColor(color) {
  try {
    localStorage.setItem(_defaultValues.themeColorStorageKey, color);
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : setCurrentColor -> error", error);
  }
};

exports.setCurrentColor = setCurrentColor;

var getCurrentRadius = function getCurrentRadius() {
  var currentRadius = 'rounded';

  try {
    if (localStorage.getItem(_defaultValues.themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(_defaultValues.themeRadiusStorageKey);
    }
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : getCurrentRadius -> error", error);
    currentRadius = 'rounded';
  }

  return currentRadius;
};

exports.getCurrentRadius = getCurrentRadius;

var setCurrentRadius = function setCurrentRadius(radius) {
  try {
    localStorage.setItem(_defaultValues.themeRadiusStorageKey, radius);
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : setCurrentRadius -> error", error);
  }
};

exports.setCurrentRadius = setCurrentRadius;

var getCurrentLanguage = function getCurrentLanguage() {
  var language = _defaultValues.defaultLocale;

  try {
    language = localStorage.getItem('currentLanguage') && _defaultValues.localeOptions.filter(function (x) {
      return x.id === localStorage.getItem('currentLanguage');
    }).length > 0 ? localStorage.getItem('currentLanguage') : _defaultValues.defaultLocale;
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : getCurrentLanguage -> error", error);
    language = _defaultValues.defaultLocale;
  }

  return language;
};

exports.getCurrentLanguage = getCurrentLanguage;

var setCurrentLanguage = function setCurrentLanguage(locale) {
  try {
    localStorage.setItem('currentLanguage', locale);
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : setCurrentLanguage -> error", error);
  }
};

exports.setCurrentLanguage = setCurrentLanguage;

var getCurrentUser = function getCurrentUser() {
  var user = null;

  try {
    user = localStorage.getItem('gogo_current_user') != null ? JSON.parse(localStorage.getItem('gogo_current_user')) : null;
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js  : getCurrentUser -> error", error);
    user = null;
  }

  return user;
};

exports.getCurrentUser = getCurrentUser;

var setCurrentUser = function setCurrentUser(user) {
  try {
    if (user) {
      localStorage.setItem('gogo_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gogo_current_user');
    }
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : setCurrentUser -> error", error);
  }
};

exports.setCurrentUser = setCurrentUser;