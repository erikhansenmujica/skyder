import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import App from "./PrincipalView/App";
import FreeBeat from "./FreeBeat";

export default () => {
  return (
    <div>
      <Switch>
        <Route exact path="/freebeat">
          <FreeBeat />
        </Route>
        <Route exact path="/">
          <App></App>
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </div>
  );
};
