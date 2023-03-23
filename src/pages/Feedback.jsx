import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RankingButton from '../components/RankingButton';
import { cleanPlayerInfo } from '../redux/actions';
import './Feedback.css';

class FeedBack extends Component {
  render() {
    const { assertions, score, history: { push }, dispatch } = this.props;
    const three = 3;
    return (
      <>
        <Header />
        <div className="font">

          <div data-testid="feedback-text">
            {
              assertions < three ? <p>Could be better...</p> : <p>Well Done!</p>
            }
          </div>
          <p data-testid="feedback-total-score">
            {score}
          </p>
          <p data-testid="feedback-total-question">
            {assertions}
          </p>
        </div>
        <button
          className="button"
          data-testid="btn-play-again"
          onClick={ () => {
            dispatch(cleanPlayerInfo());
            push('/');
          } }
        >
          Play Again
        </button>
        <RankingButton push={ push } />
      </>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(FeedBack);
