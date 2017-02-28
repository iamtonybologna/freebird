import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import YoutubeSearchedFor from 'material-ui/svg-icons/action/youtube-searched-for';
import Input from 'material-ui/svg-icons/action/input';

const homeIcon = <Input />;
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
            label="Vote"
            icon={homeIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Search"
            icon={searchIcon}
            onTouchTap={() => this.select(3)}
          />
        </BottomNavigation>
      </Paper>
    )
  };
};

export default NavBar;
