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
} from "../../Actions/emailActions";
import { setEdit, clear } from '../../Actions/composeFormActions';
import { updateModal } from "../../Actions/modalActions";
import snackBarStatus from "../../Actions/snackbarActions";
import names from "../../Helpers/names";
import "./index.sass";

class Compose extends Component {
  componentWillUnmount() {
   clearInterval(this.state.intervalId);
   this.props.clear();
  }
  handleForm = form => {
    const { sendEmails, title } = this.props;
    this.props.changeComponent({ payload: { loader: true } });
    if (title === 'Draft Message') this.props.removeDraft(form);
    form.id = sendEmails.length += 1;
    form.firstName = this.getRandom(names["firstName"]);
    form.lastName = this.getRandom(names["lastName"]);
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
  };

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.autosave();
    }, 10000);
    this.setState({ intervalId });
  }

  autosave = () => {
    const { draftEmails, formValues } = this.props;
    const { id, email, subject, message } = formValues;

    if (email !== undefined || subject !== undefined || message !== undefined) {
     if (id > 0) {
      const data = {
       id,
       email,
       subject,
       message,
      };
      this.props.updateDraft(data);
      this.props.setEdit(data);
     } else {
      const data = {
       id: draftEmails.length += 1,
       email : email === undefined ? '' : email,
       firstName : this.getRandom(names["firstName"]),
       lastName : this.getRandom(names["lastName"]),
       subject : subject === undefined ? '' : subject,
       message : message === undefined ? '' : message,
      };
      this.props.createDraft(data);
      this.props.setEdit(data);
      this.props.updateModal({ payload: { title: 'Draft Message' } });
     }
    }

  };

  getRandom = items => {
    return items[Math.floor(Math.random() * items.length)];
  };

  render() {
    return (
      <Grid container spacing={0} className="compose-container">
        <Grid item xs={12} className="compose-container__form">
          <ComposeForm handleForm={this.handleForm} />
        </Grid>
      </Grid>
    );
  }
}
const selector = formValueSelector("ComposeForm");
const mS = state => {
  const formValues = selector(
    state,
    "email",
    "subject",
    "message",
    "id",
  );
  const sendEmails = state.emailReducer.sendEmails;
  const draftEmails = state.emailReducer.draftEmails;
  const title = state.modalReducer.title;
  return {
    formValues,
    sendEmails,
    draftEmails,
    title,
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
};

export default connect(
  mS,
  mD
)(Compose);
