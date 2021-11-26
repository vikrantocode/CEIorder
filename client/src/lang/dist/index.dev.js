"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enUS = _interopRequireDefault(require("./entries/en-US"));

var _esES = _interopRequireDefault(require("./entries/es-ES"));

var _enUSRtl = _interopRequireDefault(require("./entries/en-US-rtl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { addLocaleData } from 'react-intl';
// import {createIntl, createIntlCache, RawIntlProvider} from 'react-intl'
// // This is optional but highly recommended
// // since it prevents memory leak
// const cache = createIntlCache()
// const intl = createIntl({
//   locale: 'fr-FR',
//   messages: {}
// }, cache)
var AppLocale = {
  en: _enUS["default"],
  es: _esES["default"],
  enrtl: _enUSRtl["default"]
}; // addLocaleData(AppLocale.en.data);
// addLocaleData(AppLocale.es.data);
// addLocaleData(AppLocale.enrtl.data);

var _default = AppLocale;
exports["default"] = _default;