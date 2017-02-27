import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import YoutubeSearchedFor from 'material-ui/svg-icons/action/youtube-searched-for';
import Home from 'material-ui/svg-icons/action/home';
import Profile from 'material-ui/svg-icons/action/perm-identity';

const profileIcon = <Profile />;
const homeIcon = <Home />;
const searchIcon = <YoutubeSearchedFor />;

const styles = {
    navBar: {
      position: 'fixed',
      bottom: 0
    }
  };

class NavBar extends Component {

  select = (newView) => this.props.switcher(newView);

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.props.view} style={styles.navBar}>
          <BottomNavigationItem
            label="Profile"
            icon={profileIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Home"
            icon={homeIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Search"
            icon={searchIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    )
  };
};

export default NavBar;
