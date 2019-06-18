import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { clearSelectedEmail } from "../../Actions/emailActions";
import "./index.sass";

/**
 * Class to show selected email.
 */
class EmailView extends Component {
  componentWillUnmount() {
    this.props.clearSelectedEmail();
  }
  /**
   * Show the email list.
   */
  renderEmails = () => {
    const {
      selectedEMail: { email }
    } = this.props;
    let list = "";
    const count = email.length;
    email.forEach((element, index) => {
      list += `${element.label} ${index + 1 === count ? "" : ", "}`;
    });
    return list;
  };

  render() {
    const {
      selectedEMail: { firstName, lastName, subject, message, email }
    } = this.props;
    return (
      <Grid container spacing={0} className="email-view-container">
        <Grid item xs={2} className="email-view-container__title">
          Name
        </Grid>
        <Grid item xs={10} className="email-view-container__field">
          {firstName} {lastName}
        </Grid>
        <Grid item xs={2} className="email-view-container__title">
          Email
        </Grid>
        <Grid item xs={10} className="email-view-container__field">
          {typeof email === "string" ? email : this.renderEmails()}
        </Grid>
        <Grid item xs={2} className="email-view-container__title">
          Subject
        </Grid>
        <Grid item xs={10} className="email-view-container__field">
          {subject}
        </Grid>
        <Grid item xs={2} className="email-view-container__title">
          Message
        </Grid>
        <Grid item xs={10}>
          {message}
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ emailReducer: { selectedEMail } }) => ({ selectedEMail });

const mD = {
  clearSelectedEmail
};

export default connect(
  mS,
  mD
)(EmailView);
