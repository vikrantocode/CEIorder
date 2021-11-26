"use strict";

require("./assets/css/vendor/bootstrap.min.css");

require("./assets/css/vendor/bootstrap.rtl.only.min.css");

require("react-circular-progressbar/dist/styles.css");

require("react-perfect-scrollbar/dist/css/styles.css");

require("react-big-calendar/lib/css/react-big-calendar.css");

require("react-image-lightbox/style.css");

require("video.js/dist/video-js.css");

var _defaultValues = require("./constants/defaultValues");

var _Utils = require("./helpers/Utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var color = _defaultValues.isMultiColorActive || _defaultValues.isDarkSwitchActive ? (0, _Utils.getCurrentColor)() : _defaultValues.defaultColor;
(0, _Utils.setCurrentColor)(color);

var render = function render() {
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require("./assets/css/sass/themes/gogo.".concat(color, ".scss")));
  }).then(function () {
    require('./AppRenderer');
  });
};

render();