import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';
import DataTable from '../DataTable';
import EmailView from '../EmailView';
import { updateModal } from "../../Actions/modalActions";
import { getSelectedEmail } from "../../Actions/emailActions";

class Inbox extends Component {
 handleClick = email => {
  this.props.getSelectedEmail(email).then(() => {
    this.props.updateModal({
      payload: { status: true, title: "Email", element: <EmailView /> }
    });
  });
};
 render() {
  const { inboxEmails } = this.props;
  return (
   <Grid container spacing={0}>
    <Grid item xs={12}>
     <DataTable rows={inboxEmails} handleClick={this.handleClick} />
    </Grid>
   </Grid>
  );
 }
}

const mS = ({ emailReducer: { inboxEmails } }) => ({ inboxEmails });

const mD = {
 updateModal,
 getSelectedEmail,
}

export default connect(mS,mD)(Inbox);