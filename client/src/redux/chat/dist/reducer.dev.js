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
  allContacts: null,
  contacts: null,
  conversations: null,
  error: '',
  searchKeyword: '',
  loadingContacts: false,
  loadingConversations: false,
  currentUser: null,
  selectedUser: null,
  selectedUserId: null
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.CHAT_GET_CONTACTS:
      return _objectSpread({}, state, {
        loadingContacts: false
      });

    case _actions.CHAT_GET_CONTACTS_SUCCESS:
      return _objectSpread({}, state, {
        loadingContacts: true,
        allContacts: action.payload.contacts,
        contacts: action.payload.contacts,
        currentUser: action.payload.currentUser
      });

    case _actions.CHAT_GET_CONTACTS_ERROR:
      return _objectSpread({}, state, {
        loadingContacts: false,
        error: action.payload
      });

    case _actions.CHAT_GET_CONVERSATIONS:
      return _objectSpread({}, state, {
        loadingConversations: false
      });

    case _actions.CHAT_GET_CONVERSATIONS_SUCCESS:
      return _objectSpread({}, state, {
        loadingConversations: true,
        conversations: action.payload.conversations,
        selectedUserId: action.payload.selectedUser
      });

    case _actions.CHAT_GET_CONVERSATIONS_ERROR:
      return _objectSpread({}, state, {
        loadingConversations: false,
        error: action.payload
      });

    case _actions.CHAT_CHANGE_CONVERSATION:
      return _objectSpread({}, state, {
        selectedUser: state.allContacts.find(function (x) {
          return x.id === action.payload;
        })
      });

    case _actions.CHAT_ADD_MESSAGE_TO_CONVERSATION:
      return _objectSpread({}, state);

    case _actions.CHAT_CREATE_CONVERSATION:
      return _objectSpread({}, state);

    case _actions.CHAT_SEARCH_CONTACT:
      if (action.payload === '') {
        return _objectSpread({}, state, {
          contacts: state.allContacts
        });
      }

      var keyword = action.payload.toLowerCase();
      var searchedContacts = state.allContacts.filter(function (item) {
        return item.name.toLowerCase().indexOf(keyword) > -1;
      });
      return _objectSpread({}, state, {
        contacts: searchedContacts
      });

    default:
      return _objectSpread({}, state);
  }
};

exports["default"] = _default;