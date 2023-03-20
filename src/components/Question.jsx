import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Question.css';

const zeroOFive = 0.5;

export default class Question extends Component {
  state = {
    trigger: false,
    seconds: 30,
    arrayOfQuestions: [],
    timeOut: false,
  };

  componentDidMount() {
    const { question } = this.props;
    const array = [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - zeroOFive,
    );
    this.startTime();
    this.setState({ arrayOfQuestions: array,
    });
  }

  componentDidUpdate(_prevProps, prevState) {
    const TIME_LIMIT = 1;
    if (prevState.seconds === TIME_LIMIT) {
      clearInterval(this.intervalID);
      this.setState({ timeOut: true });
    }
  }

  startTime = () => {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prev) => ({
        seconds: prev.seconds - 1,
      }));
    }, ONE_SECOND);
  };

  render() {
    const { question } = this.props;
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
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
