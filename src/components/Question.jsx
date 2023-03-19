import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Question.css';

const zeroOFive = 0.5;

export default class Question extends Component {
  state = {
    trigger: false,
  };

  render() {
    const { question } = this.props;
    const { trigger } = this.state;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <div
          data-testid="answer-options"
        >
          {[...question.incorrect_answers, question.correct_answer].sort(
            () => Math.random() - zeroOFive,
          ).map((answer, index) => {
            if (answer === question.correct_answer) {
              return (
                <button
                  key={ index }
                  data-testid="correct-answer"
                  className={ trigger && 'rigth ' }
                  // para Ligar as cores
                  onClick={ () => {
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
                className={ trigger && 'wrong' }
                onClick={ () => {
                  // para ligar as cores
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
