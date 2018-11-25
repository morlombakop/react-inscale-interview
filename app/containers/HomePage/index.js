import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import {
  ResponsiveContainer,
  ComposedChart,
  Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { get } from 'lodash';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectNews,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import { loadNews } from '../App/actions';
import reducer from '../App/reducer';
import saga from './saga';

import NewsCard from '../../components/NewsCard';
import H1 from '../../components/H1';

const ChartWrapper = styled(Paper)`
  width: 100%;
  height: 400px;
  margin-bottom: 1.5em;
`;

const NewsCardWrapper = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
`;

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  /**
   * Loads news once the component is rendered
   */
  componentDidMount() {
    this.props.getNews();
  }

  getGridListCols(){
    if (isWidthUp('xl', this.props.width)) {
      return 4;
    }

    if (isWidthUp('lg', this.props.width)) {
      return 3;
    }

    if (isWidthUp('md', this.props.width)) {
      return 2;
    }

    return 1;
  };

  render() {
    // Render nothing is no news from api.
    if(this.props.loading){
      return null;
    }
    // render error message
    if(this.props.error){
      return (<H1>Errors loading news</H1>);
    }
    return (
      <div>
        <ChartWrapper>
          <ResponsiveContainer>
            <ComposedChart data={get(this.props.news, 'graphData', [])} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Area type="monotone" dataKey="share" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="view" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="like" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartWrapper>
        <GridList spacing={15} cellHeight={400} cols={this.getGridListCols()}>
          {
            get(this.props.news, 'articles', []).map(item => (
              <GridListTile key={item.id} cols={1}>
                <NewsCardWrapper>
                  <NewsCard newsObj={item}/>
                </NewsCardWrapper>
              </GridListTile>
            ))
          }
        </GridList>
      </div>
    );
  }
};

HomePage.propTypes = {
  width: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  news: PropTypes.object,
  getNews: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({ getNews: () => dispatch(loadNews()) });

const mapStateToProps = createStructuredSelector({
  news: makeSelectNews(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withWidth(),
)(HomePage);
