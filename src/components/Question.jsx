import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePlayerScore } from '../redux/actions';
import './Question.css';
import certo from '../images/certo.png';
import errado from '../images/errado.png';
import timer from '../images/Vector.png';

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

  componentDidUpdate({ number: prevNumber }, prevState) {
    const TIME_LIMIT = 1;
    const { number } = this.props;
    if (prevState.seconds === TIME_LIMIT) {
      clearInterval(this.intervalID);
      this.setState({ timeOut: true });
    }
    if (prevNumber !== number) {
      this.setState({
        trigger: false,
        seconds: 30,
        arrayOfQuestions: [],
        timeOut: false,
        difficulty: 0,
      });
      this.componentDidMount();
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
    const { question,
      dispatch,
      nextButton,
      number,
      push,
      score,
      name,
      email } = this.props;
    const { trigger, arrayOfQuestions, seconds, timeOut } = this.state;
    const four = 4;
    return (
      <div className="questionComponent">
        <div className="questionContainer">
          <p data-testid="question-category" className="category">{question.category}</p>
          <p data-testid="question-text" className="questionBox">{question.question}</p>
          <div className="timer">
            <img src={ timer } alt="timer" className="timerImg" />
            {`Tempo: ${seconds}s `}

          </div>
        </div>
        <div
          data-testid="answer-options"
          className="answerOptions"
        >

          {arrayOfQuestions.map((answer, index) => {
            if (answer === question.correct_answer) {
              return (
                <button
                  key={ index }
                  disabled={ timeOut }
                  data-testid="correct-answer"
                  className={ `questButton ${trigger && 'rigth '}` }
                  // para Ligar as cores
                  onClick={ () => {
                    dispatch(savePlayerScore(this.savingScore()));
                    clearInterval(this.intervalID);
                    this.setState({ trigger: true, timeOut: true });
                  } }
                >
                  {trigger && (
                    <div className="imgContainerCerto">
                      <img
                        className="certo"
                        src={ certo }
                        alt="certo"
                      />

                    </div>)}
                  <span>{answer}</span>
                </button>
              );
            }

            return (
              <button
                data-testid={ `wrong-answer-${index}` }
                key={ index }
                disabled={ timeOut }
                className={ `questButton ${trigger && 'wrong'}` }
                onClick={ () => {
                  // para ligar as cores
                  clearInterval(this.intervalID);
                  this.setState({ trigger: true, timeOut: true });
                } }
              >
                {trigger && (
                  <div className="imgContainer">
                    <img src={ errado } alt="errado" className="errado" />

                  </div>
                )}
                <span>{answer}</span>

              </button>
            );
          }) }
          {
            timeOut
        && (
          <button
            data-testid="btn-next"
            className="nextBtn"
            onClick={ () => {
              if (number === four) {
                const myArray = JSON.parse(localStorage.getItem('ranking')) || [];
                const infoObj = { score, name, email };
                myArray.push(infoObj);
                const sortedArray = myArray.sort(
                  ({ score: scoreA }, { score: scoreB }) => scoreB - scoreA,
                );
                localStorage.setItem('ranking', JSON.stringify(sortedArray));

                push('/feedback');
              }
              nextButton();
            } }
          >
            Next
          </button>
        )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

Question.propTypes = {
  question: PropTypes.shape({
    difficulty: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),

  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  nextButton: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Question);
