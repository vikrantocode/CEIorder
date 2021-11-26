"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchGetContact = watchGetContact;
exports.watchGetConversation = watchGetConversation;
exports.watchAddMessageToConversation = watchAddMessageToConversation;
exports.watchCreateConversation = watchCreateConversation;
exports["default"] = rootSaga;

var _effects = require("redux-saga/effects");

var _Utils = require("../../helpers/Utils");

var _actions = require("../actions");

var _actions2 = require("./actions");

var _chatContacts = _interopRequireDefault(require("../../data/chat.contacts.json"));

var _chatConversations = _interopRequireDefault(require("../../data/chat.conversations.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(loadContacts),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(loadConversations),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(addMessageToConversation),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(createNewConversation),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(watchGetContact),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(watchGetConversation),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(watchAddMessageToConversation),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(watchCreateConversation),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);

function loadContacts() {
  var response, contacts, currentUser;
  return regeneratorRuntime.wrap(function loadContacts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(loadContactsAsync);

        case 3:
          response = _context.sent;
          contacts = response.contacts, currentUser = response.currentUser;
          _context.next = 7;
          return (0, _effects.put)((0, _actions2.getContactsSuccess)(contacts, currentUser));

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          _context.next = 13;
          return (0, _effects.put)((0, _actions2.getContactsError)(_context.t0));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 9]]);
}

var loadContactsAsync = function loadContactsAsync() {
  var contacts, currentUser;
  return regeneratorRuntime.async(function loadContactsAsync$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          contacts = _chatContacts["default"].data;
          currentUser = contacts[0];
          _context2.next = 4;
          return regeneratorRuntime.awrap(new Promise(function (success, fail) {
            setTimeout(function () {
              success({
                contacts: contacts,
                currentUser: currentUser
              });
            }, 2000);
          }).then(function (response) {
            return response;
          })["catch"](function (error) {
            return error;
          }));

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

function loadConversations(userId) {
  var response, conversations, selectedUser;
  return regeneratorRuntime.wrap(function loadConversations$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _effects.call)(loadConversationsAsync, userId);

        case 3:
          response = _context3.sent;
          conversations = response.conversations, selectedUser = response.selectedUser;
          _context3.next = 7;
          return (0, _effects.put)((0, _actions2.getConversationsSuccess)(conversations, selectedUser));

        case 7:
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 13;
          return (0, _effects.put)((0, _actions2.getConversationsError)(_context3.t0));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked2, null, [[0, 9]]);
}

var loadConversationsAsync = function loadConversationsAsync(_ref) {
  var payload, conversations, selectedUser;
  return regeneratorRuntime.async(function loadConversationsAsync$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          payload = _ref.payload;
          conversations = _chatConversations["default"].data;
          conversations = conversations.filter(function (x) {
            return x.users.includes(payload);
          });
          selectedUser = conversations[0].users.find(function (x) {
            return x !== payload;
          });
          _context4.next = 6;
          return regeneratorRuntime.awrap(new Promise(function (success, fail) {
            setTimeout(function () {
              success({
                conversations: conversations,
                selectedUser: selectedUser
              });
            }, 1000);
          }).then(function (response) {
            return response;
          })["catch"](function (error) {
            return error;
          }));

        case 6:
          return _context4.abrupt("return", _context4.sent);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

function addMessageToConversation(_ref2) {
  var payload, currentUserId, selectedUserId, message, allConversations, response, conversations, selectedUser;
  return regeneratorRuntime.wrap(function addMessageToConversation$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          payload = _ref2.payload;
          _context5.prev = 1;
          currentUserId = payload.currentUserId, selectedUserId = payload.selectedUserId, message = payload.message, allConversations = payload.allConversations;
          _context5.next = 5;
          return (0, _effects.call)(addMessageToConversationAsync, currentUserId, selectedUserId, message, allConversations);

        case 5:
          response = _context5.sent;
          conversations = response.conversations, selectedUser = response.selectedUser;
          _context5.next = 9;
          return (0, _effects.put)((0, _actions2.getConversationsSuccess)(conversations, selectedUser));

        case 9:
          _context5.next = 15;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](1);
          _context5.next = 15;
          return (0, _effects.put)((0, _actions2.getConversationsError)(_context5.t0));

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked3, null, [[1, 11]]);
}

var addMessageToConversationAsync = function addMessageToConversationAsync(currentUserId, selectedUserId, message, allConversations) {
  var conversation, time, conversations;
  return regeneratorRuntime.async(function addMessageToConversationAsync$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          conversation = allConversations.find(function (x) {
            return x.users.includes(currentUserId) && x.users.includes(selectedUserId);
          });
          time = (0, _Utils.getCurrentTime)();

          if (!conversation) {
            _context6.next = 10;
            break;
          }

          conversation.messages.push({
            sender: currentUserId,
            time: time,
            text: message
          });
          conversation.lastMessageTime = time;
          conversations = allConversations.filter(function (x) {
            return x.id !== conversation.id;
          });
          conversations.splice(0, 0, conversation);
          _context6.next = 9;
          return regeneratorRuntime.awrap(new Promise(function (success, fail) {
            setTimeout(function () {
              success({
                conversations: conversations,
                selectedUser: selectedUserId
              });
            }, 500);
          }).then(function (response) {
            return response;
          })["catch"](function (error) {
            return error;
          }));

        case 9:
          return _context6.abrupt("return", _context6.sent);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  });
};

function createNewConversation(_ref3) {
  var payload, currentUserId, selectedUserId, allConversations, response, conversations, selectedUser;
  return regeneratorRuntime.wrap(function createNewConversation$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          payload = _ref3.payload;
          _context7.prev = 1;
          currentUserId = payload.currentUserId, selectedUserId = payload.selectedUserId, allConversations = payload.allConversations;
          _context7.next = 5;
          return (0, _effects.call)(createNewConversationAsync, currentUserId, selectedUserId, allConversations);

        case 5:
          response = _context7.sent;
          conversations = response.conversations, selectedUser = response.selectedUser;
          _context7.next = 9;
          return (0, _effects.put)((0, _actions2.getConversationsSuccess)(conversations, selectedUser));

        case 9:
          _context7.next = 15;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](1);
          _context7.next = 15;
          return (0, _effects.put)((0, _actions2.getConversationsError)(_context7.t0));

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked4, null, [[1, 11]]);
}

var createNewConversationAsync = function createNewConversationAsync(currentUserId, selectedUserId, allConversations) {
  var conversation;
  return regeneratorRuntime.async(function createNewConversationAsync$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          conversation = {
            id: allConversations.length + 1,
            users: [currentUserId, selectedUserId],
            lastMessageTime: '-',
            messages: []
          };
          allConversations.splice(0, 0, conversation);
          _context8.next = 4;
          return regeneratorRuntime.awrap(new Promise(function (success, fail) {
            setTimeout(function () {
              success({
                conversations: allConversations,
                selectedUser: selectedUserId
              });
            }, 500);
          }).then(function (response) {
            return response;
          })["catch"](function (error) {
            return error;
          }));

        case 4:
          return _context8.abrupt("return", _context8.sent);

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
};

function watchGetContact() {
  return regeneratorRuntime.wrap(function watchGetContact$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _effects.takeEvery)(_actions.CHAT_GET_CONTACTS, loadContacts);

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked5);
}

function watchGetConversation() {
  return regeneratorRuntime.wrap(function watchGetConversation$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _effects.takeEvery)(_actions.CHAT_GET_CONVERSATIONS, loadConversations);

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked6);
}

function watchAddMessageToConversation() {
  return regeneratorRuntime.wrap(function watchAddMessageToConversation$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _effects.takeEvery)(_actions.CHAT_ADD_MESSAGE_TO_CONVERSATION, addMessageToConversation);

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked7);
}

function watchCreateConversation() {
  return regeneratorRuntime.wrap(function watchCreateConversation$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _effects.takeEvery)(_actions.CHAT_CREATE_CONVERSATION, createNewConversation);

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked8);
}

function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _effects.all)([(0, _effects.fork)(watchGetContact), (0, _effects.fork)(watchGetConversation), (0, _effects.fork)(watchAddMessageToConversation), (0, _effects.fork)(watchCreateConversation)]);

        case 2:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked9);
}