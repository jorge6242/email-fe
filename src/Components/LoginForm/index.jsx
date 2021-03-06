import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import TextField from "../ComponentFormTools/TextField";
import "./index.sass";

/**
 * Validation to the form
 */
const validate = values => {
  const errors = {};
  const requiredFields = ["email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

/**
 * Form component to Login
 */
const LoginForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  handleForm
}) => (
  <Grid container spacing={0} className="login-form">
    <form onSubmit={handleSubmit(handleForm)}>
      <Grid item xs={12} className="login-form__field">
        <Field name="email" type="name" component={TextField} label="Email" />
      </Grid>
      <Grid item xs={12} className="login-form__field">
        <Field
          name="password"
          type="password"
          component={TextField}
          label="Password"
        />
      </Grid>
      <Grid item xs={12} className="login-form__field">
        <Button
          type="submit"
          disabled={submitting}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        <Button
          type="button"
          disabled={pristine || submitting}
          variant="contained"
          color="secondary"
          onClick={reset}
        >
          Clear Values
        </Button>
      </Grid>
    </form>
  </Grid>
);

const CustomLoginForm = reduxForm({
  form: "loginForm",
  validate,
  enableReinitialize: true
})(LoginForm);

export default connect(null)(CustomLoginForm);
