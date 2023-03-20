import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Question.css';
import { connect } from 'react-redux';
import { savePlayerScore } from '../redux/actions';

const zeroOFive = 0.5;

class Question extends Component {
  state = {
    trigger: false,
    seconds: 30,
    arrayOfQuestions: [],
    timeOut: false,
    difficulty: 0,
  };

  componentDidMount() {
    const { question } = this.props;
    const array = [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - zeroOFive,
    );
    this.startTime();
    this.setState({ arrayOfQuestions: array,
    });
    switch (question.difficulty) {
    case 'easy':
      this.setState({ difficulty: 1 });
      break;
    case 'medium':
      this.setState({ difficulty: 2 });
      break;
    case 'hard':
      this.setState({ difficulty: 3 });
      break;
    default:
      break;
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    const TIME_LIMIT = 1;
    if (prevState.seconds === TIME_LIMIT) {
      clearInterval(this.intervalID);
      this.setState({ timeOut: true });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  savingScore = () => {
    const { seconds, difficulty } = this.state;
    const ten = 10;
    return ten + (seconds * difficulty);
  };

  startTime = () => {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prev) => ({
        seconds: prev.seconds - 1,
      }));
    }, ONE_SECOND);
  };

  render() {
    const { question, dispatch } = this.props;
    const { trigger, arrayOfQuestions, seconds, timeOut } = this.state;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <div
          data-testid="answer-options"
        >
          <div>{seconds}</div>
          {arrayOfQuestions.map((answer, index) => {
            if (answer === question.correct_answer) {
              return (
                <button
                  key={ index }
                  disabled={ timeOut }
                  data-testid="correct-answer"
                  className={ trigger && 'rigth ' }
                  // para Ligar as cores
                  onClick={ () => {
                    dispatch(savePlayerScore(this.savingScore()));
                    clearInterval(this.intervalID);
                    this.setState({ trigger: true });
                  } }
                >
                  {answer}
                </button>
              );
            }

            return (
              <button
                data-testid={ `wrong-answer-${index}` }
                key={ index }
                disabled={ timeOut }
                className={ trigger && 'wrong' }
                onClick={ () => {
                  // para ligar as cores
                  clearInterval(this.intervalID);
                  this.setState({ trigger: true });
                } }
              >
                {answer}

              </button>
            );
          }) }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    difficulty: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Question);
