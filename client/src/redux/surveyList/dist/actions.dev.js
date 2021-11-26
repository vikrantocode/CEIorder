"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectedSurveyItemsChange = exports.addSurveyItemError = exports.addSurveyItemSuccess = exports.addSurveyItem = exports.getSurveyListSearch = exports.getSurveyListWithOrder = exports.getSurveyListWithFilter = exports.getSurveyListError = exports.getSurveyListSuccess = exports.getSurveyList = void 0;

var _actions = require("../actions");

var getSurveyList = function getSurveyList() {
  return {
    type: _actions.SURVEY_LIST_GET_LIST
  };
};

exports.getSurveyList = getSurveyList;

var getSurveyListSuccess = function getSurveyListSuccess(items) {
  return {
    type: _actions.SURVEY_LIST_GET_LIST_SUCCESS,
    payload: items
  };
};

exports.getSurveyListSuccess = getSurveyListSuccess;

var getSurveyListError = function getSurveyListError(error) {
  return {
    type: _actions.SURVEY_LIST_GET_LIST_ERROR,
    payload: error
  };
};

exports.getSurveyListError = getSurveyListError;

var getSurveyListWithFilter = function getSurveyListWithFilter(column, value) {
  return {
    type: _actions.SURVEY_LIST_GET_LIST_WITH_FILTER,
    payload: {
      column: column,
      value: value
    }
  };
};

exports.getSurveyListWithFilter = getSurveyListWithFilter;

var getSurveyListWithOrder = function getSurveyListWithOrder(column) {
  return {
    type: _actions.SURVEY_LIST_GET_LIST_WITH_ORDER,
    payload: column
  };
};

exports.getSurveyListWithOrder = getSurveyListWithOrder;

var getSurveyListSearch = function getSurveyListSearch(keyword) {
  return {
    type: _actions.SURVEY_LIST_GET_LIST_SEARCH,
    payload: keyword
  };
};

exports.getSurveyListSearch = getSurveyListSearch;

var addSurveyItem = function addSurveyItem(item) {
  return {
    type: _actions.SURVEY_LIST_ADD_ITEM,
    payload: item
  };
};

exports.addSurveyItem = addSurveyItem;

var addSurveyItemSuccess = function addSurveyItemSuccess(items) {
  return {
    type: _actions.SURVEY_LIST_ADD_ITEM_SUCCESS,
    payload: items
  };
};

exports.addSurveyItemSuccess = addSurveyItemSuccess;

var addSurveyItemError = function addSurveyItemError(error) {
  return {
    type: _actions.SURVEY_LIST_ADD_ITEM_ERROR,
    payload: error
  };
};

exports.addSurveyItemError = addSurveyItemError;

var selectedSurveyItemsChange = function selectedSurveyItemsChange(selectedItems) {
  return {
    type: _actions.SURVEY_LIST_SELECTED_ITEMS_CHANGE,
    payload: selectedItems
  };
};

exports.selectedSurveyItemsChange = selectedSurveyItemsChange;