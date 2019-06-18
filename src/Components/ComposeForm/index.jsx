import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import "./index.sass";
import AutoComplete from "../AutoComplete";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "100%"
  },
  customInput: {
    width: "100%"
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = ["email", "subject", "message"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const renderTextField = ({
  input,
  label,
  classes,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hinttext={label}
    label={label}
    error={touched && error}
    {...input}
    {...custom}
  />
);

const renderTextAreaField = ({
  input,
  label,
  classes,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hinttext={label}
    label={label}
    error={touched && error}
    {...input}
    {...custom}
    multiline
    rows="4"
  />
);

const ComposeForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    handleForm,
    classes,
    suggestions,
    handleChange,
    selectedEmails,
  } = props;
  return (
    <Grid container spacing={0} className="compose-form">
      <form onSubmit={handleSubmit(handleForm)}>
        <Grid item xs={12} className="compose-form__field">
          <AutoComplete suggestions={suggestions} handleChange={handleChange} values={selectedEmails} />
        </Grid>
        <Grid item xs={12} className="compose-form__field">
          <Field
            name="subject"
            type="text"
            component={renderTextField}
            label="Subject"
            className={classes.customInput}
          />
        </Grid>
        <Grid item xs={12} className="compose-form__field">
          <Field
            name="message"
            type="text"
            component={renderTextAreaField}
            label="Message"
            className={classes.customInput}
          />
        </Grid>
        <Grid item xs={12} className="compose-form__field">
          <Button
            type="submit"
            disabled={submitting}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            variant="contained"
            color="secondary"
            onClick={reset}
          >
            Clear
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

const CustomComposeForm = reduxForm({
  form: "ComposeForm",
  validate,
  enableReinitialize: true
})(ComposeForm);

const mS = state => ({
 initialValues: state.composeFormReducer,
 ComposeForm: state.composeFormReducer,
 suggestions: state.emailReducer.suggestions,
 selectedEmails: state.emailReducer.selectedEmails,
});

export default withStyles(styles)(connect(mS)(CustomComposeForm));
