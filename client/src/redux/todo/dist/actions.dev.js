"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectedTodoItemsChange = exports.addTodoItemError = exports.addTodoItemSuccess = exports.addTodoItem = exports.getTodoListSearch = exports.getTodoListWithOrder = exports.getTodoListWithFilter = exports.getTodoListError = exports.getTodoListSuccess = exports.getTodoList = void 0;

var _actions = require("../actions");

var getTodoList = function getTodoList() {
  return {
    type: _actions.TODO_GET_LIST
  };
};

exports.getTodoList = getTodoList;

var getTodoListSuccess = function getTodoListSuccess(items) {
  return {
    type: _actions.TODO_GET_LIST_SUCCESS,
    payload: items
  };
};

exports.getTodoListSuccess = getTodoListSuccess;

var getTodoListError = function getTodoListError(error) {
  return {
    type: _actions.TODO_GET_LIST_ERROR,
    payload: error
  };
};

exports.getTodoListError = getTodoListError;

var getTodoListWithFilter = function getTodoListWithFilter(column, value) {
  return {
    type: _actions.TODO_GET_LIST_WITH_FILTER,
    payload: {
      column: column,
      value: value
    }
  };
};

exports.getTodoListWithFilter = getTodoListWithFilter;

var getTodoListWithOrder = function getTodoListWithOrder(column) {
  return {
    type: _actions.TODO_GET_LIST_WITH_ORDER,
    payload: column
  };
};

exports.getTodoListWithOrder = getTodoListWithOrder;

var getTodoListSearch = function getTodoListSearch(keyword) {
  return {
    type: _actions.TODO_GET_LIST_SEARCH,
    payload: keyword
  };
};

exports.getTodoListSearch = getTodoListSearch;

var addTodoItem = function addTodoItem(item) {
  return {
    type: _actions.TODO_ADD_ITEM,
    payload: item
  };
};

exports.addTodoItem = addTodoItem;

var addTodoItemSuccess = function addTodoItemSuccess(items) {
  return {
    type: _actions.TODO_ADD_ITEM_SUCCESS,
    payload: items
  };
};

exports.addTodoItemSuccess = addTodoItemSuccess;

var addTodoItemError = function addTodoItemError(error) {
  return {
    type: _actions.TODO_ADD_ITEM_ERROR,
    payload: error
  };
};

exports.addTodoItemError = addTodoItemError;

var selectedTodoItemsChange = function selectedTodoItemsChange(selectedItems) {
  return {
    type: _actions.TODO_SELECTED_ITEMS_CHANGE,
    payload: selectedItems
  };
};

exports.selectedTodoItemsChange = selectedTodoItemsChange;