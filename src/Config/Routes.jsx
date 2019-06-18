import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import MainLayout from "../Hoc/MainLayout";
import Login from "../Containers/Login";
import Dashboard from "../Containers/Dashboard";
import SnackBar from '../Components/SnackBar';
import Modal from '../Components/Modal';
class Routes extends Component {
  render() {
    return (
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
  }
}

export default connect(null,null)(Routes);
