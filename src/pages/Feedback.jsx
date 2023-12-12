import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import RankingButton from '../components/RankingButton';
import { cleanPlayerInfo } from '../redux/actions';
import './Feedback.css';
import bg from '../svgs/feedback/bg.svg';
import logo from '../svgs/feedback/logo.svg';

class FeedBack extends Component {
  render() {
    const { assertions, score, email, history: { push }, dispatch } = this.props;
    const three = 3;
    return (
      <>
        <main
          className="h-[60dvh] h-[60vh] w-full flex flex-col
          items-center justify-center relative"
          style={ {
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } }
        >
          <section
            className="w-[439px] h-[278px] rounded-[10px] bg-white absolute
          bottom-[-139px] flex flex-col items-center"
          >
            <img src={ logo } alt="" className="absolute top-[-282.5px]" />
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${md5(email)}` }
              alt=""
              className={ `h-[213px] w-[213px] rounded-full absolute border-4 
              ${assertions > three ? 'border-[#2FC18C]' : 'border-[#EA5D5D]'} 
              top-[-106.5px]` }
            />
            <div data-testid="feedback-text">
              {
                assertions < three ? (
                  <h1 className="mt-[113px] text-[#EA5D5D] font-bold text-2xl">
                    Could be better...
                  </h1>
                )
                  : (
                    <h1
                      className="mt-[113px] text-[#2FC18C] font-bold text-2xl"
                    >
                      Well Done!

                    </h1>
                  )
              }
            </div>
            <p
              className="font-bold text-[#B5B5B5] text-xs mt-[20px] text-center"
              data-testid="feedback-total-question"
            >
              {`You got ${assertions} questions!`}
            </p>
            <p
              className="font-bold text-[#B5B5B5] text-xs mt-[5px] text-center"
              data-testid="feedback-total-score"
            >
              {`A total of ${score} points`}
            </p>

            <section
              className="absolute bottom-[-70px]
            flex w-full items-center justify-between"
            >
              <RankingButton push={ push } />
              <button
                className="bg-[#2FC18C] w-[212.5px] h-[45px] rounded-[5px]
                text-white btn-shadow hover:bg-[#5cf0ba] transition-colors duration-1000"
                data-testid="btn-play-again"
                onClick={ () => {
                  dispatch(cleanPlayerInfo());
                  push('/');
                } }
              >
                PLAY AGAIN
              </button>

            </section>
          </section>

        </main>
        <footer className="h-[40dvh] h-[40vh] bg-[#3C1B7A] w-full" />
      </>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  email: state.player.email,
});

export default connect(mapStateToProps)(FeedBack);
