import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import DataTable from "../DataTable";
import { updateModal } from "../../Actions/modalActions";
import { getSelectedEmail, setEmailSelected } from "../../Actions/emailActions";
import { setEdit } from "../../Actions/composeFormActions";
import Compose from "../../Containers/Compose";

/**
 * Class to show Draft Messages.
 */
class Draft extends Component {
  /**
   * Handle to active modal and edit the selected email with redux.
   *
   * @param {object} email selected
   */
  handleClick = email => {
    this.props.setEdit(email);
    this.props.setEmailSelected(email.email);
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
  setEmailSelected
};

export default connect(
  mS,
  mD
)(Draft);
