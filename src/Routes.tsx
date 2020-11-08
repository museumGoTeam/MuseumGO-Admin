import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from './layout'
import Form from "./components/Form/Form";
import MapP from "./pages/MapP";
import PoiForm from "./components/PoiForm/PoiForm";

export default function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/map" />} />
          <Route exact path="/map" component={MapP} />
          <Route exact path="/pointOfInterest/:id" component={PoiForm} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
