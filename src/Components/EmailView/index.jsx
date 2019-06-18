import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { clearSelectedEmail } from '../../Actions/emailActions';
import './index.sass';

class EmailView extends Component {
  componentWillUnmount() {
   this.props.clearSelectedEmail();
  }
  render() {
    const {
      selectedEMail: { firstName, lastName, email, subject, message }
    } = this.props;
    return (
      <Grid container spacing={0} className="email-view-container">
        <Grid item xs={2} className="email-view-container__title">Name</Grid><Grid item xs={10} className="email-view-container__field"> {firstName} {lastName} </Grid>
        <Grid item xs={2} className="email-view-container__title">Email</Grid>  <Grid item xs={10} className="email-view-container__field">{email}</Grid>
        <Grid item xs={2} className="email-view-container__title">Subject</Grid>  <Grid item xs={10} className="email-view-container__field">{subject}</Grid>
        <Grid item xs={2} className="email-view-container__title">Message</Grid>  <Grid item xs={10}>{message}</Grid>
      </Grid>
    );
  }
}

const mS = ({ emailReducer: { selectedEMail } }) => ({ selectedEMail });

const mD = {
 clearSelectedEmail,
};

export default connect(mS,mD)(EmailView);
