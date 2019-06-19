import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import LoginForm from "../../Components/LoginForm";
import snackBarStatus from "../../Actions/snackbarActions";
import "./index.sass";

/**
 * Class to Login
 */
class Login extends Component {
  /**
   * Get the current form of the message.
   * @param {object} form
   */
  handleForm = form => {
    const { history } = this.props;
    if (form.email === "test@getsirena.com" && form.password === "test") {
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
        <Grid container spacing={0}>
        <Grid item xs={3} className="login-container__info">
          <Paper>
            <Typography variant="h5" component="h5">User: test@getsirena.com</Typography>
            <Typography variant="h5" component="h5">Password: test</Typography>
          </Paper>
        </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mD = {
  snackBarStatus
};

export default withRouter(
  connect(
    null,
    mD
  )(Login)
);
