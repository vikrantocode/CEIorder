"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setContainerClassnames = exports.clickOnMobileMenu = exports.addContainerClassname = exports.changeDefaultClassnames = exports.changeSelectedMenuHasSubItems = void 0;

var _actions = require("../actions");

/* eslint-disable import/no-cycle */

/* eslint-disable no-param-reassign */
var changeSelectedMenuHasSubItems = function changeSelectedMenuHasSubItems(payload) {
  return {
    type: _actions.MENU_CHANGE_HAS_SUB_ITEM_STATUS,
    payload: payload
  };
};

exports.changeSelectedMenuHasSubItems = changeSelectedMenuHasSubItems;

var changeDefaultClassnames = function changeDefaultClassnames(strCurrentClasses) {
  return {
    type: _actions.MENU_CHANGE_DEFAULT_CLASSES,
    payload: strCurrentClasses
  };
};

exports.changeDefaultClassnames = changeDefaultClassnames;

var addContainerClassname = function addContainerClassname(classname, strCurrentClasses) {
  var newClasses = !strCurrentClasses.indexOf(classname) > -1 ? "".concat(strCurrentClasses, " ").concat(classname) : strCurrentClasses;
  return {
    type: _actions.MENU_CONTAINER_ADD_CLASSNAME,
    payload: newClasses
  };
};

exports.addContainerClassname = addContainerClassname;

var clickOnMobileMenu = function clickOnMobileMenu(strCurrentClasses) {
  var currentClasses = strCurrentClasses ? strCurrentClasses.split(' ').filter(function (x) {
    return x !== '' && x !== 'sub-show-temporary';
  }) : '';
  var nextClasses = '';

  if (currentClasses.includes('main-show-temporary')) {
    nextClasses = currentClasses.filter(function (x) {
      return x !== 'main-show-temporary';
    }).join(' ');
  } else {
    nextClasses = "".concat(currentClasses.join(' '), " main-show-temporary");
  }

  return {
    type: _actions.MENU_CLICK_MOBILE_MENU,
    payload: {
      containerClassnames: nextClasses,
      menuClickCount: 0
    }
  };
};

exports.clickOnMobileMenu = clickOnMobileMenu;

var setContainerClassnames = function setContainerClassnames(clickIndex, strCurrentClasses, selectedMenuHasSubItems) {
  var currentClasses = strCurrentClasses ? strCurrentClasses.split(' ').filter(function (x) {
    return x !== '';
  }) : '';
  var nextClasses = '';

  if (!selectedMenuHasSubItems) {
    if (currentClasses.includes('menu-default') && (clickIndex % 4 === 0 || clickIndex % 4 === 3)) {
      clickIndex = 1;
    }

    if (currentClasses.includes('menu-sub-hidden') && clickIndex % 4 === 2) {
      clickIndex = 0;
    }

    if (currentClasses.includes('menu-hidden') && (clickIndex % 4 === 2 || clickIndex % 4 === 3)) {
      clickIndex = 0;
    }
  }

  if (clickIndex % 4 === 0) {
    if (currentClasses.includes('menu-default') && currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-default menu-sub-hidden';
    } else if (currentClasses.includes('menu-default')) {
      nextClasses = 'menu-default';
    } else if (currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-sub-hidden';
    } else if (currentClasses.includes('menu-hidden')) {
      nextClasses = 'menu-hidden';
    }

    clickIndex = 0;
  } else if (clickIndex % 4 === 1) {
    if (currentClasses.includes('menu-default') && currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-default menu-sub-hidden main-hidden sub-hidden';
    } else if (currentClasses.includes('menu-default')) {
      nextClasses = 'menu-default sub-hidden';
    } else if (currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-sub-hidden main-hidden sub-hidden';
    } else if (currentClasses.includes('menu-hidden')) {
      nextClasses = 'menu-hidden main-show-temporary';
    }
  } else if (clickIndex % 4 === 2) {
    if (currentClasses.includes('menu-default') && currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-default menu-sub-hidden sub-hidden';
    } else if (currentClasses.includes('menu-default')) {
      nextClasses = 'menu-default main-hidden sub-hidden';
    } else if (currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-sub-hidden sub-hidden';
    } else if (currentClasses.includes('menu-hidden')) {
      nextClasses = 'menu-hidden main-show-temporary sub-show-temporary';
    }
  } else if (clickIndex % 4 === 3) {
    if (currentClasses.includes('menu-default') && currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-default menu-sub-hidden sub-show-temporary';
    } else if (currentClasses.includes('menu-default')) {
      nextClasses = 'menu-default sub-hidden';
    } else if (currentClasses.includes('menu-sub-hidden')) {
      nextClasses = 'menu-sub-hidden sub-show-temporary';
    } else if (currentClasses.includes('menu-hidden')) {
      nextClasses = 'menu-hidden main-show-temporary';
    }
  }

  if (currentClasses.includes('menu-mobile')) {
    nextClasses += ' menu-mobile';
  }

  return {
    type: _actions.MENU_SET_CLASSNAMES,
    payload: {
      containerClassnames: nextClasses,
      menuClickCount: clickIndex
    }
  };
};

exports.setContainerClassnames = setContainerClassnames;