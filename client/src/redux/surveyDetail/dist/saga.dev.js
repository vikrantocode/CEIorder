"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchGetDetail = watchGetDetail;
exports.watchDeleteQuestion = watchDeleteQuestion;
exports["default"] = rootSaga;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _actions2 = require("./actions");

var _surveyDetail = _interopRequireDefault(require("../../data/survey.detail.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getSurveyDetailItems),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(deleteQuestion),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(watchGetDetail),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(watchDeleteQuestion),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);

var getSurveyDetailRequest = function getSurveyDetailRequest() {
  return regeneratorRuntime.async(function getSurveyDetailRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (success, fail) {
            setTimeout(function () {
              success(_surveyDetail["default"].data);
            }, 1000);
          }).then(function (response) {
            return response;
          })["catch"](function (error) {
            return error;
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

var deleteQuestionRequest = function deleteQuestionRequest(quesitonId, survey) {
  return regeneratorRuntime.async(function deleteQuestionRequest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          survey.questions = survey.questions.filter(function (x) {
            return x.id !== quesitonId;
          });
          _context2.next = 3;
          return regeneratorRuntime.awrap(new Promise(function (success, fail) {
            success(survey);
          }).then(function (response) {
            return response;
          })["catch"](function (error) {
            return error;
          }));

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

function getSurveyDetailItems() {
  var response;
  return regeneratorRuntime.wrap(function getSurveyDetailItems$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _effects.call)(getSurveyDetailRequest);

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return (0, _effects.put)((0, _actions2.getSurveyDetailSuccess)(response));

        case 6:
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 12;
          return (0, _effects.put)((0, _actions2.getSurveyDetailError)(_context3.t0));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked, null, [[0, 8]]);
}

function deleteQuestion(_ref) {
  var payload, questionId, survey, response;
  return regeneratorRuntime.wrap(function deleteQuestion$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          payload = _ref.payload;
          _context4.prev = 1;
          questionId = payload.questionId, survey = payload.survey;
          _context4.next = 5;
          return (0, _effects.call)(deleteQuestionRequest, questionId, survey);

        case 5:
          response = _context4.sent;
          _context4.next = 8;
          return (0, _effects.put)((0, _actions2.saveSurvey)(response));

        case 8:
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          _context4.next = 14;
          return (0, _effects.put)((0, _actions2.getSurveyDetailError)(_context4.t0));

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked2, null, [[1, 10]]);
}

function watchGetDetail() {
  return regeneratorRuntime.wrap(function watchGetDetail$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.takeEvery)(_actions.SURVEY_GET_DETAILS, getSurveyDetailItems);

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked3);
}

function watchDeleteQuestion() {
  return regeneratorRuntime.wrap(function watchDeleteQuestion$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.takeEvery)(_actions.SURVEY_DELETE_QUESTION, deleteQuestion);

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked4);
}

function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.all)([(0, _effects.fork)(watchGetDetail), (0, _effects.fork)(watchDeleteQuestion)]);

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked5);
}