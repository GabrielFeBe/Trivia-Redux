import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePlayerScore } from '../redux/actions';
import './Question.css';
import certo from '../images/certo.png';
import errado from '../images/errado.png';
import timer from '../images/Vector.png';
import bg from '../svgs/questions/bg.svg';
import trivia from '../svgs/questions/trivia.svg';

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
    // const fixedQuestionSplit =
    let fixedQuestion = question.question.replaceAll('&quot;', '"');
    fixedQuestion = fixedQuestion.replaceAll('&#039;', '\'');
    this.setState({ fixedQuestion });
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
    const { trigger, arrayOfQuestions, seconds, timeOut, fixedQuestion } = this.state;
    const four = 4;
    return (
      <main
        className="h-[80vh] h-[80dvh] bg-cover bg-center relative"
        style={ {
          backgroundImage: `url(${bg})`,
        } }
      >
        <div className="questionComponent ">

          <div className="questionContainer mt-[160px]">
            <img src={ trivia } alt="" className="absolute top-[-99px]" />

            <p
              data-testid="question-category"
              className="category"
            >
              {question.category}

            </p>
            <p data-testid="question-text" className="questionBox">{fixedQuestion}</p>
            <div className="timer">
              <img src={ timer } alt="timer" className="timerImg" />
              {`Tempo: ${seconds}s `}

            </div>
          </div>
          <div
            data-testid="answer-options"
            className="answerOptions mt-[160px]"
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
                      <div className="imgContainerCerto ml-[10px]">
                        <img
                          className="certo "
                          src={ certo }
                          alt="certo"
                        />

                      </div>)}
                    <span className="ml-[21px] leading-[24px] text-[16px]">{answer}</span>
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
                    <div className="imgContainer ml-[10px]">
                      <img src={ errado } alt="errado" className="errado" />

                    </div>
                  )}
                  <span className=" ml-[21px] leading-[24px] text-[16px]">{answer}</span>

                </button>
              );
            }) }
            {
              timeOut
        && (
          <button
            data-testid="btn-next"
            className="absolute bottom-3
            bg-[#2FC18C] w-[519px] h-[45px] rounded-[5px]"
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
      </main>

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
