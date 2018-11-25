/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import HomePage from 'containers/HomePage/Loadable';
import AddNewsPage from 'containers/AddNewsPage/Loadable';
import ArticlePage from 'containers/ArticlePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';

import GlobalStyle from '../../global-styles';
import SideNav from '../../components/SideNav';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});
   
class App extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Mbakop Inscale Interview"
          defaultTitle="Mbakop Inscale Interview"
        >
          <meta name="description" content="Mbakop Inscale Interview application" />
        </Helmet>
        <div className={classes.root}>
          <CssBaseline />
          <Header onDrawerToggle={this.handleDrawerToggle} />
          <SideNav onDrawerToggle={this.handleDrawerToggle} isOpen={this.state.mobileOpen} />

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/add-news" component={AddNewsPage} />
              <Route path="/article/:id" component={ArticlePage} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </main>
        </div>
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
