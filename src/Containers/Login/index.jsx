import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import snackBarStatus from "../../Actions/snackbarActions";
import "./index.sass";

class Login extends Component {
  handleForm = form => {
    const { history } = this.props;
    if (form.email === 'test@getsirena.com' && form.password === 'test') {
      history.push("/dashboard");
    } else {
      this.props.snackBarStatus({
        payload: {
          enable: true,
          title: "Bad Credentials",
          type: "error"
        }
      });
    }
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

const mD = {
  snackBarStatus,
}

export default withRouter(
  connect(
    null,
    mD
  )(Login)
);
