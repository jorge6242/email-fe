import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainLayout from "../Hoc/MainLayout";
import Login from "../Containers/Login";
import Dashboard from "../Containers/Dashboard";
import SnackBar from "../Components/SnackBar";
import Modal from "../Components/Modal";
/**
 * Class to show main routes.
 */
const Routes = () => (
  <Router>
    <MainLayout>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
      <SnackBar />
      <Modal />
    </MainLayout>
  </Router>
);

export default Routes;
