import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import YoutubeSearchedFor from 'material-ui/svg-icons/action/youtube-searched-for';
import Input from 'material-ui/svg-icons/action/input';

const homeIcon = <Input className="material-icons"/>;
const searchIcon = <YoutubeSearchedFor className="material-icons"/>;

const styles = {
    navBar: {
      position: 'fixed',
      bottom: '0',
      display: 'block',
      width: '100%',
      zIndex: '10'
    }
  };

class NavBar extends Component {



  select = (newView) => {this.props.switcher(newView); }

  render() {
    return (
      <div style={styles.navBar}>
        <Paper zDepth={1} >
          <BottomNavigation selectedIndex={this.props.view}>
            <BottomNavigationItem
              label="Vote"
              icon={homeIcon}
              onTouchTap={() => this.select(0)}
            />
            <BottomNavigationItem
              label="Search"
              icon={searchIcon}
              onTouchTap={() => this.select(1)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    )
  };
};

export default NavBar;
