import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import purple from '@material-ui/core/colors/purple';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataTable from "../DataTable";
import EmailView from "../EmailView";
import { updateModal } from "../../Actions/modalActions";
import { getSelectedEmail } from "../../Actions/emailActions";
import './index.sass';

class Send extends Component {
  handleClick = email => {
    this.props.getSelectedEmail(email).then(() => {
      this.props.updateModal({
        payload: { status: true, title: "Email", element: <EmailView /> }
      });
    });
  };
  renderProgress = () => {
   return (
     <div className="send-progress-container">
       <CircularProgress
        style={{ color: purple[500] }}
        thickness={7}
      />
     </div>
   );
 };
  render() {
    const { sendEmails, loader } = this.props;
    return loader ? this.renderProgress() : (
      <Grid container spacing={0} className="send-container">
        <Grid item xs={12}>
          <DataTable rows={sendEmails} handleClick={this.handleClick} />
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ emailReducer: { sendEmails, loader } }) => ({
  sendEmails,
  loader
});

const mD = {
  updateModal,
  getSelectedEmail
};

export default connect(
  mS,
  mD
)(Send);
