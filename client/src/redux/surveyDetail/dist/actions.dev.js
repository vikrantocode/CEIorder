"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveSurvey = exports.deleteSurveyQuestion = exports.getSurveyDetailError = exports.getSurveyDetailSuccess = exports.getSurveyDetail = void 0;

var _actions = require("../actions");

var getSurveyDetail = function getSurveyDetail() {
  return {
    type: _actions.SURVEY_GET_DETAILS
  };
};

exports.getSurveyDetail = getSurveyDetail;

var getSurveyDetailSuccess = function getSurveyDetailSuccess(items) {
  return {
    type: _actions.SURVEY_GET_DETAILS_SUCCESS,
    payload: items
  };
};

exports.getSurveyDetailSuccess = getSurveyDetailSuccess;

var getSurveyDetailError = function getSurveyDetailError(error) {
  return {
    type: _actions.SURVEY_GET_DETAILS_ERROR,
    payload: error
  };
};

exports.getSurveyDetailError = getSurveyDetailError;

var deleteSurveyQuestion = function deleteSurveyQuestion(questionId, survey) {
  return {
    type: _actions.SURVEY_DELETE_QUESTION,
    payload: {
      questionId: questionId,
      survey: survey
    }
  };
};

exports.deleteSurveyQuestion = deleteSurveyQuestion;

var saveSurvey = function saveSurvey(survey) {
  return {
    type: _actions.SURVEY_SAVE,
    payload: survey
  };
};

exports.saveSurvey = saveSurvey;