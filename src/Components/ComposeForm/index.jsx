import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import AutoComplete from "../AutoComplete";
import TextField from "../ComponentFormTools/TextField";
import TextAreaField from "../ComponentFormTools/TextArea";
import "./index.sass";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "100%"
  },
  customInput: {
    width: "100%"
  }
});

/**
 * Validation to the form
 */

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

/**
 * Form component to Compose
 */

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
    onInputChange
  } = props;
  return (
    <Grid container spacing={0} className="compose-form">
      <form onSubmit={handleSubmit(handleForm)}>
        <Grid item xs={12} className="compose-form__field">
          <AutoComplete
            suggestions={suggestions}
            handleChange={handleChange}
            values={selectedEmails}
            onInputChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} className="compose-form__field">
          <Field
            name="subject"
            type="text"
            component={TextField}
            label="Subject"
            className={classes.customInput}
          />
        </Grid>
        <Grid item xs={12} className="compose-form__field">
          <Field
            name="message"
            type="text"
            component={TextAreaField}
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
  selectedEmails: state.emailReducer.selectedEmails
});

export default withStyles(styles)(connect(mS)(CustomComposeForm));
