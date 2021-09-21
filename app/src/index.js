import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import root from "./duck/reducer";
import Root from "./components/Root";

console.log(process.env.SERVER);

const composed = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(
      applyMiddleware(thunkMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : compose(applyMiddleware(thunkMiddleware));

const store = createStore(root, composed);

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
