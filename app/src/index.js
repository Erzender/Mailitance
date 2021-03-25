import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import root from "./duck/reducer";
import Root from "./components/Root";

const rootReducer = combineReducers({
  root,
});

const composed = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(
      applyMiddleware(thunkMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : compose(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, composed);

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
