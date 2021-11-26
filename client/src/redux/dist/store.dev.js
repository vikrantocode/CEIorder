"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureStore = configureStore;

var _redux = require("redux");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _reducers = _interopRequireDefault(require("./reducers"));

var _sagas = _interopRequireDefault(require("./sagas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sagaMiddleware = (0, _reduxSaga["default"])();
var middlewares = [sagaMiddleware];

function configureStore(initialState) {
  var store = (0, _redux.createStore)(_reducers["default"], initialState, (0, _redux.compose)(_redux.applyMiddleware.apply(void 0, middlewares)));
  sagaMiddleware.run(_sagas["default"]);

  if (module.hot) {
    module.hot.accept('./reducers', function () {
      var nextRootReducer = require('./reducers');

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}