import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import Body from "./containers";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from "./serviceWorker";
const customHistory = createBrowserHistory();

ReactDOM.render(
  <Router history={customHistory}>
    <Body />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
