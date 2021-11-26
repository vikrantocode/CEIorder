"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeConversation = exports.searchContact = exports.createConversation = exports.addMessageToConversation = exports.getConversationsError = exports.getConversationsSuccess = exports.getConversations = exports.getContactsError = exports.getContactsSuccess = exports.getContacts = void 0;

var _actions = require("../actions");

var getContacts = function getContacts() {
  return {
    type: _actions.CHAT_GET_CONTACTS
  };
};

exports.getContacts = getContacts;

var getContactsSuccess = function getContactsSuccess(contacts, currentUser) {
  return {
    type: _actions.CHAT_GET_CONTACTS_SUCCESS,
    payload: {
      contacts: contacts,
      currentUser: currentUser
    }
  };
};

exports.getContactsSuccess = getContactsSuccess;

var getContactsError = function getContactsError(error) {
  return {
    type: _actions.CHAT_GET_CONTACTS_ERROR,
    payload: error
  };
};

exports.getContactsError = getContactsError;

var getConversations = function getConversations(userId) {
  return {
    type: _actions.CHAT_GET_CONVERSATIONS,
    payload: userId
  };
};

exports.getConversations = getConversations;

var getConversationsSuccess = function getConversationsSuccess(conversations, selectedUser) {
  return {
    type: _actions.CHAT_GET_CONVERSATIONS_SUCCESS,
    payload: {
      conversations: conversations,
      selectedUser: selectedUser
    }
  };
};

exports.getConversationsSuccess = getConversationsSuccess;

var getConversationsError = function getConversationsError(error) {
  return {
    type: _actions.CHAT_GET_CONVERSATIONS_ERROR,
    payload: error
  };
};

exports.getConversationsError = getConversationsError;

var addMessageToConversation = function addMessageToConversation(currentUserId, selectedUserId, message, allConversations) {
  return {
    type: _actions.CHAT_ADD_MESSAGE_TO_CONVERSATION,
    payload: {
      currentUserId: currentUserId,
      selectedUserId: selectedUserId,
      message: message,
      allConversations: allConversations
    }
  };
};

exports.addMessageToConversation = addMessageToConversation;

var createConversation = function createConversation(currentUserId, selectedUserId, allConversations) {
  return {
    type: _actions.CHAT_CREATE_CONVERSATION,
    payload: {
      currentUserId: currentUserId,
      selectedUserId: selectedUserId,
      allConversations: allConversations
    }
  };
};

exports.createConversation = createConversation;

var searchContact = function searchContact(keyword) {
  return {
    type: _actions.CHAT_SEARCH_CONTACT,
    payload: keyword
  };
};

exports.searchContact = searchContact;

var changeConversation = function changeConversation(userId) {
  return {
    type: _actions.CHAT_CHANGE_CONVERSATION,
    payload: userId
  };
};

exports.changeConversation = changeConversation;