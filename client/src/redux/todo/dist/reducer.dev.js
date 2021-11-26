"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = require("../actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INIT_STATE = {
  allTodoItems: null,
  todoItems: null,
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
  labels: [{
    label: 'EDUCATION',
    color: 'secondary'
  }, {
    label: 'NEW FRAMEWORK',
    color: 'primary'
  }, {
    label: 'PERSONAL',
    color: 'info'
  }],
  orderColumns: [{
    column: 'title',
    label: 'Title'
  }, {
    column: 'category',
    label: 'Category'
  }, {
    column: 'status',
    label: 'Status'
  }, {
    column: 'label',
    label: 'Label'
  }],
  categories: ['Flexbox', 'Sass', 'React'],
  selectedItems: []
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.TODO_GET_LIST:
      return _objectSpread({}, state, {
        loading: false
      });

    case _actions.TODO_GET_LIST_SUCCESS:
      return _objectSpread({}, state, {
        loading: true,
        allTodoItems: action.payload,
        todoItems: action.payload
      });

    case _actions.TODO_GET_LIST_ERROR:
      return _objectSpread({}, state, {
        loading: true,
        error: action.payload
      });

    case _actions.TODO_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return _objectSpread({}, state, {
          loading: true,
          todoItems: state.allTodoItems,
          filter: null
        });
      }

      var filteredItems = state.allTodoItems.filter(function (item) {
        return item[action.payload.column] === action.payload.value;
      });
      return _objectSpread({}, state, {
        loading: true,
        todoItems: filteredItems,
        filter: {
          column: action.payload.column,
          value: action.payload.value
        }
      });

    case _actions.TODO_GET_LIST_WITH_ORDER:
      if (action.payload === '') {
        return _objectSpread({}, state, {
          loading: true,
          todoItems: state.todoItems,
          orderColumn: null
        });
      }

      var sortedItems = state.todoItems.sort(function (a, b) {
        if (a[action.payload] < b[action.payload]) return -1;
        if (a[action.payload] > b[action.payload]) return 1;
        return 0;
      });
      return _objectSpread({}, state, {
        loading: true,
        todoItems: sortedItems,
        orderColumn: state.orderColumns.find(function (x) {
          return x.column === action.payload;
        })
      });

    case _actions.TODO_GET_LIST_SEARCH:
      if (action.payload === '') {
        return _objectSpread({}, state, {
          todoItems: state.allTodoItems
        });
      }

      var keyword = action.payload.toLowerCase();
      var searchItems = state.allTodoItems.filter(function (item) {
        return item.title.toLowerCase().indexOf(keyword) > -1 || item.detail.toLowerCase().indexOf(keyword) > -1 || item.status.toLowerCase().indexOf(keyword) > -1 || item.category.toLowerCase().indexOf(keyword) > -1 || item.label.toLowerCase().indexOf(keyword) > -1;
      });
      return _objectSpread({}, state, {
        loading: true,
        todoItems: searchItems,
        searchKeyword: action.payload
      });

    case _actions.TODO_ADD_ITEM:
      return _objectSpread({}, state, {
        loading: false
      });

    case _actions.TODO_ADD_ITEM_SUCCESS:
      return _objectSpread({}, state, {
        loading: true,
        allTodoItems: action.payload,
        todoItems: action.payload
      });

    case _actions.TODO_ADD_ITEM_ERROR:
      return _objectSpread({}, state, {
        loading: true,
        error: action.payload
      });

    case _actions.TODO_SELECTED_ITEMS_CHANGE:
      return _objectSpread({}, state, {
        loading: true,
        selectedItems: action.payload
      });

    default:
      return _objectSpread({}, state);
  }
};

exports["default"] = _default;