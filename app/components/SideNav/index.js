import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddNewsIcon from '@material-ui/icons/NoteAdd';

import { drawerWidth } from '../constants';
import message from './message';

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
});

const SideNav = ({ classes, theme, isOpen, onDrawerToggle }) => {
  const navList = [
    {
      text: message.homeNav,
      icon: () => <HomeIcon />,
      linkTo: '/',
    },
    {
      text: message.addNewsNav,
      icon: () => <AddNewsIcon />,
      linkTo: '/add-news',
    },
  ];

  const NavLink = styled(Link)`
    text-decoration: none;
  `;

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {navList.map(item => (
          <NavLink key={item.text.id} to={item.linkTo}>
            <ListItem button>
              <ListItemIcon>{item.icon()}</ListItemIcon>
              <ListItemText primary={<FormattedMessage {...item.text} />} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swap with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={isOpen}
          onClose={onDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideNav);
