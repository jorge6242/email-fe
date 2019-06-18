import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';
import DataTable from '../DataTable';
import { updateModal } from "../../Actions/modalActions";
import { getSelectedEmail } from "../../Actions/emailActions";
import { setEdit } from '../../Actions/composeFormActions'
import Compose from '../../Containers/Compose';

class Draft extends Component {
 handleClick = email => {
    this.props.setEdit(email);
    this.props.updateModal({
      payload: { status: true, title: "Draft Message", element: <Compose /> }
  });
};
 render() {
  const { draftEmails } = this.props;
  return (
   <Grid container spacing={0}>
    <Grid item xs={12}>
     <DataTable rows={draftEmails} handleClick={this.handleClick} />
    </Grid>
   </Grid>
  );
 }
}

const mS = ({ emailReducer: { draftEmails } }) => ({ draftEmails });

const mD = {
 updateModal,
 getSelectedEmail,
 setEdit,
}

export default connect(mS,mD)(Draft);