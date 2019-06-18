import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import "./index.sass";

class Login extends Component {
  handleForm = () => {
    const { history } = this.props;
    history.push("/dashboard");
  };

  render() {
    return (
      <Grid container spacing={0} className="login-container">
        <Grid item xs={12} className="login-container__title">
          Login
        </Grid>
        <Grid item xs={12} className="login-container__form">
          <LoginForm handleForm={this.handleForm} />
        </Grid>
      </Grid>
    );
  }
}
export default withRouter(
  connect(
    null,
    null
  )(Login)
);
