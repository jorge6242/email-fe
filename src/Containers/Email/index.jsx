import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { changeComponent } from "../../Actions/emailActions";
import { updateModal } from '../../Actions/modalActions';
import Inbox from "../../Components/Inbox";
import './index.sass';
import Compose from "../Compose";

class Email extends Component {
  componentWillMount() {
    this.props.changeComponent({
      payload: { title: "Inbox", element: <Inbox /> }
    });
  }

  handleClick = () => {
   this.props.updateModal({ payload: { status: true, title: 'New Nessage', element: <Compose /> } });
  }

  render() {
    const { element, title } = this.props;
    return (
      <Grid container spacing={0} className="email-container">
        <Grid item xs={12} className="email-container__header">
          {title}
        </Grid>
        <Grid item xs={12} className="email-container__content">
          {element}
        </Grid>
        <Grid item xs={12} className="email-container__plus">
          <Fab
            color="primary"
            aria-label="Add"
            onClick={this.handleClick}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ emailReducer: { title, element } }) => ({ title, element });

const mD = {
  changeComponent,
  updateModal,
};

export default connect(
  mS,
  mD
)(Email);
