import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { formValueSelector } from "redux-form";
import ComposeForm from "../../Components/ComposeForm";
import {
  sendEmail,
  changeComponent,
  createDraft,
  updateDraft,
  removeDraft,
  setEmailSelected,
  loadSuggestions
} from "../../Actions/emailActions";
import { setEdit, clear } from "../../Actions/composeFormActions";
import snackBarStatus from "../../Actions/snackbarActions";
import { updateModal } from "../../Actions/modalActions";
import names from "../../Helpers/names";
import "./index.sass";

/**
 * Class to create message.
 */

class Compose extends Component {
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    this.props.clear();
    this.props.setEmailSelected([]);
  }

  componentDidMount() {
    /**
     * instruction to activate the autosave draft every 10 seconds.
     */
    const intervalId = setInterval(() => {
      this.autosave();
    }, 10000);
    this.setState({ intervalId });
  }

  /**
   * Get the current form of the message.
   *
   * @param {object} form
   */
  handleForm = form => {
    const { sendEmails, title, selectedEmails } = this.props;
    this.props.changeComponent({ payload: { loader: true } });
    if (selectedEmails.length > 0) {
      if (title === "Draft Message") this.props.removeDraft(form);
      form.id = sendEmails.length += 1;
      form.firstName = this.getRandom(names["firstName"]);
      form.lastName = this.getRandom(names["lastName"]);
      form.email = selectedEmails;
      this.props.sendEmail(form);
      this.props.updateModal({ payload: { status: false, element: <div /> } });
      this.props.changeComponent({ payload: { loader: false } });
      this.props.snackBarStatus({
        payload: {
          enable: true,
          title: "Message Send",
          type: "success"
        }
      });
    } else {
      this.props.snackBarStatus({
        payload: {
          enable: true,
          title: "Email Required",
          type: "error"
        }
      });
    }
  };

  autosave = () => {
    const { draftEmails, formValues, selectedEmails } = this.props;
    const { id, email, subject, message } = formValues;

    if (email !== undefined || subject !== undefined || message !== undefined) {
      if (id > 0) {
        const data = {
          id,
          email:
            selectedEmails.length > 0 || selectedEmails !== null
              ? selectedEmails
              : [],
          firstName: this.getRandom(names["firstName"]),
          lastName: this.getRandom(names["lastName"]),
          subject,
          message
        };
        this.props.updateDraft(data);
        this.props.setEdit(data);
      } else {
        const data = {
          id: (draftEmails.length += 1),
          email: selectedEmails.length > 0 ? selectedEmails : [],
          firstName: this.getRandom(names["firstName"]),
          lastName: this.getRandom(names["lastName"]),
          subject: subject === undefined ? "" : subject,
          message: message === undefined ? "" : message
        };
        this.props.createDraft(data);
        this.props.setEdit(data);
        this.props.updateModal({ payload: { title: "Draft Message" } });
      }
    }
  };

  /**
   * Generate random names
   *
   * @param {object} items list of names
   */
  getRandom = items => {
    return items[Math.floor(Math.random() * items.length)];
  };

  onInputChange = (value, event) => {
    const { inboxEmails } = this.props;
    if (event.action === "input-change") {
      const data = inboxEmails.filter(
        email => email.email.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      const suggestions = data.map(email => {
        return {
          value: email.email,
          label: email.email
        };
      });
      this.props.loadSuggestions(suggestions);
    }
  };

  /**
   * Handle to save the current email in the list after search
   *
   * @param {object} email current selected email after search
   */
  handleChange = email => {
    if (email === null) {
      this.props.setEmailSelected([]);
    } else {
      this.props.setEmailSelected(email);
    }
  };

  render() {
    return (
      <Grid container spacing={0} className="compose-container">
        <Grid item xs={12} className="compose-container__form">
          <ComposeForm
            handleForm={this.handleForm}
            handleChange={this.handleChange}
            onInputChange={this.onInputChange}
          />
        </Grid>
      </Grid>
    );
  }
}
const selector = formValueSelector("ComposeForm");
const mS = state => {
  const formValues = selector(state, "email", "subject", "message", "id");
  const inboxEmails = state.emailReducer.inboxEmails;
  const sendEmails = state.emailReducer.sendEmails;
  const draftEmails = state.emailReducer.draftEmails;
  const selectedEmails = state.emailReducer.selectedEmails;
  const title = state.modalReducer.title;
  return {
    formValues,
    inboxEmails,
    sendEmails,
    draftEmails,
    title,
    selectedEmails
  };
};

const mD = {
  sendEmail,
  createDraft,
  updateModal,
  snackBarStatus,
  changeComponent,
  setEdit,
  clear,
  updateDraft,
  removeDraft,
  setEmailSelected,
  loadSuggestions
};

export default connect(
  mS,
  mD
)(Compose);
