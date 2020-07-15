import React from "react";
import { Route, Switch } from "react-router-dom";

import { Register, Login } from "../components/RegisterLogin";
import Body from "../containers/index";
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();

class Routes extends React.Component {
  getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  checkCookie = () => {
    var user = this.getCookie("email");
    console.log("user : ", user);
    if (user) {
      return (
        <>
          <Body />
        </>
      );
    } else {
      return (
        <div>
          <Switch history={customHistory}>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </div>
      );
    }
  };
  render() {
    return <>{this.checkCookie()}</>;
  }
}

export default Routes;
