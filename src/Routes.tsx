import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from './layout'
import MapP from "./pages/MapP";
import PoiP from "./pages/PoiP";
import RoomP from "./pages/RoomP";

export default function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/map" />} />
          <Route exact path="/map" component={MapP} />
          <Route exact path="/pointOfInterest/:id" component={PoiP} />
          <Route exact path="/room/:id" component={RoomP} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
