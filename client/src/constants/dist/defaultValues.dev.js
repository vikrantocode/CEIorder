"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors = exports.isAuthGuardActive = exports.themeRadiusStorageKey = exports.defaultDirection = exports.isDarkSwitchActive = exports.defaultColor = exports.isMultiColorActive = exports.themeColorStorageKey = exports.servicePath = exports.searchPath = exports.buyUrl = exports.adminRoot = exports.currentUser = exports.firebaseConfig = exports.localeOptions = exports.defaultLocale = exports.menuHiddenBreakpoint = exports.subHiddenBreakpoint = exports.defaultMenuType = void 0;

var _authHelper = require("../helpers/authHelper");

/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
var defaultMenuType = 'menu-default';
exports.defaultMenuType = defaultMenuType;
var subHiddenBreakpoint = 1440;
exports.subHiddenBreakpoint = subHiddenBreakpoint;
var menuHiddenBreakpoint = 768;
exports.menuHiddenBreakpoint = menuHiddenBreakpoint;
var defaultLocale = 'en';
exports.defaultLocale = defaultLocale;
var localeOptions = [{
  id: 'en',
  name: 'English - LTR',
  direction: 'ltr'
}, {
  id: 'es',
  name: 'Español',
  direction: 'ltr'
}, {
  id: 'enrtl',
  name: 'English - RTL',
  direction: 'rtl'
}];
exports.localeOptions = localeOptions;
var firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563'
};
exports.firebaseConfig = firebaseConfig;
var currentUser = {
  id: 1,
  title: 'Sarah Kortney',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: _authHelper.UserRole.Admin
};
exports.currentUser = currentUser;
var adminRoot = '/app';
exports.adminRoot = adminRoot;
var buyUrl = 'https://1.envato.market/k4z0';
exports.buyUrl = buyUrl;
var searchPath = "".concat(adminRoot, "/pages/miscellaneous/search");
exports.searchPath = searchPath;
var servicePath = 'https://api.coloredstrategies.com';
exports.servicePath = servicePath;
var themeColorStorageKey = '__theme_selected_color';
exports.themeColorStorageKey = themeColorStorageKey;
var isMultiColorActive = true;
exports.isMultiColorActive = isMultiColorActive;
var defaultColor = 'light.purplemonster';
exports.defaultColor = defaultColor;
var isDarkSwitchActive = true;
exports.isDarkSwitchActive = isDarkSwitchActive;
var defaultDirection = 'ltr';
exports.defaultDirection = defaultDirection;
var themeRadiusStorageKey = '__theme_radius';
exports.themeRadiusStorageKey = themeRadiusStorageKey;
var isAuthGuardActive = false;
exports.isAuthGuardActive = isAuthGuardActive;
var colors = ['bluenavy', 'blueyale', 'blueolympic', 'greenmoss', 'greenlime', 'purplemonster', 'orangecarrot', 'redruby', 'yellowgranola', 'greysteel'];
exports.colors = colors;