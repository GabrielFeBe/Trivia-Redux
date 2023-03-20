import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { count } = this.props;
    const three = 3;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          {
            count < three ? <p>Could be better...</p> : <p>Well Done!</p>
          }
        </div>
      </>
    );
  }
}

FeedBack.propTypes = {
  count: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  count: state.player.count,
});

export default connect(mapStateToProps)(FeedBack);
