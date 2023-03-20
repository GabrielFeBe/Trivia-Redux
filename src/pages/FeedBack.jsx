import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { assertions } = this.props;
    const three = 3;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          {
            assertions < three ? <p>Could be better...</p> : <p>Well Done!</p>
          }
        </div>
      </>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(FeedBack);
