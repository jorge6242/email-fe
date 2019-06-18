import React from "react";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';

const RenderTextField = ({
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
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

RenderTextField.propTypes = {
  /** Propertys of redux form field */
  input: PropTypes.object.isRequired,
  /** Input label */
  label: PropTypes.string.isRequired,
   /** Object styles of material UI */
  classes: PropTypes.object,
   /** Boolean */
  touched: PropTypes.bool,
  /** Boolean */
  error: PropTypes.bool,
  /** Propertys of native input */
  custom: PropTypes.object,
};

export default RenderTextField;
