import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from './layout'
import Form from "./components/Form/Form";
import MapP from "./pages/MapP";

export default function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Form} />
          <Route exact path="/map" component={MapP} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
