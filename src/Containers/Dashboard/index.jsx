import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import DraftIcon from "@material-ui/icons/Drafts";
import FaceIcon from "@material-ui/icons/Face";
import SendIcon from "@material-ui/icons/Send";
import SearchIcon from "@material-ui/icons/Search";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Email from "../Email";
import { loadInbox } from "../../Actions/emailActions";
import Inbox from "../../Components/Inbox";
import JSON_DATA from "../../data/emails.json";
import Draft from "../../Components/Draft";
import Send from "../../Components/Send";
import { changeComponent, loadSuggestions } from "../../Actions/emailActions";
import styles from "./style";

/**
 * Class to show the main app.
 */
class Dashboard extends React.Component {
  state = {
    mobileOpen: false
  };

  UNSAFE_componentWillMount() {
    this.importData().then(data => {
      this.props.loadInbox(data);
    });
  }

  suggestions = data => {
    const suggestions = data.map(email => {
      return {
        value: email.email,
        label: email.email
      };
    });
    this.props.loadSuggestions(suggestions);
  };

  /**
   * Import data to render inbox email list
   */
  importData = () =>
    new Promise((resolve, reject) => {
      const emails = [];
      JSON_DATA.forEach(element => {
        emails.push(element);
      });
      resolve(emails);
    });

  /**
   * Handle to show/hide the drawer
   */
  handleDrawerToggle = () =>
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));

  /**
   * Handle to select current component in the main app
   *
   * @param {object} key key to select the current component
   */
  handleClick = key => {
    const { history } = this.props;
    let title = "";
    let element = <div />;
    switch (key) {
      case "inbox":
        title = "Inbox";
        element = <Inbox />;
        break;
      case "draft":
        title = "Draft";
        element = <Draft />;
        break;
      case "send":
        title = "Send";
        element = <Send />;
        break;
      case "logout":
        history.push("/");
        break;
      default:
        break;
    }
    this.props.changeComponent({
      payload: { title, element }
    });
    this.setState({ mobileOpen: false });
  };

  handleSearch = e => {
    const term = e.target.value.trim();
    const data = JSON_DATA.filter(
      email =>
        email.email.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        email.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
    this.props.loadInbox(data);
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Grid container spacing={0} className={classes.account}>
            <Grid item xs={12}>
              <Avatar className={classes.avatar}>
                <FaceIcon className={classes.icon} />
              </Avatar>
            </Grid>
            <Grid item xs={12} className={classes.customSelect}>
              <FormControl className={classes.formControl}>
                <Select value={1}>
                  <MenuItem value={1}>heyfromjonathan</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => this.handleClick("inbox")}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Inbox"} />
          </ListItem>
          <ListItem button onClick={() => this.handleClick("draft")}>
            <ListItemIcon>
              <DraftIcon />
            </ListItemIcon>
            <ListItemText primary={"Draft"} />
          </ListItem>
          <ListItem button onClick={() => this.handleClick("send")}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={"Send"} />
          </ListItem>
          <ListItem button onClick={() => this.handleClick("logout")}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar color="default" position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <SearchIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      label="Search"
                      onChange={this.handleSearch}
                    />
                  </Grid>
                </Grid>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Email />
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  /** Object styles of material UI */
  classes: PropTypes.object.isRequired,
  /** Defining container grid in material UI */
  container: PropTypes.object,
  /** Defining theme tools in material UI */
  theme: PropTypes.object.isRequired
};

const mS = ({ emailReducer: { inboxEmails } }) => ({ inboxEmails });

const mD = {
  loadInbox,
  changeComponent,
  loadSuggestions
};

export default withRouter(
  connect(
    mS,
    mD
  )(withStyles(styles, { withTheme: true })(Dashboard))
);
