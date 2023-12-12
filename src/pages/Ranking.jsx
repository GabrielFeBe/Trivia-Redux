import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { cleanPlayerInfo } from '../redux/actions';
import bg from '../svgs/ranking/bg.svg';
import logo from '../svgs/ranking/logo.svg';
import star from '../svgs/ranking/star.svg';

const three = 3;
class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const myArray = JSON.parse(localStorage.getItem('ranking')) || [];
    this.setState({ ranking: myArray });
  }

  render() {
    const { history: { push }, dispatch } = this.props;
    const { ranking } = this.state;
    return (
      <main
        className="bg-center bg-cover h-[100vh] h-[100dvh]
        flex flex-col items-center justify-center"
        style={ {
          backgroundImage: `url(${bg})`,
        } }
      >
        <section
          className="h-[488px] w-[489px] rounded-[10px] bg-white
        relative flex flex-col items-center justify-center gap-[15px]"
        >
          <img src={ logo } className="absolute top-[-103px]" alt="" />
          <h1
            className="font-bold text-3xl text-center text-[#3C1B7A] mt-[100px] mb-[19px]"
            data-testid="ranking-title"
          >
            RANKING

          </h1>
          {ranking.slice(0, three).map(({ score, email, name }, index) => (
            <div
              className="w-[386px] h-[55px] rounded-full flex items-center bg-[#EBEBEB]"
              key={ index }
            >
              <img
                src={ `https://www.gravatar.com/avatar/${md5(email)}` }
                alt={ `Foto de ${name}` }
                className="w-[37px] h-[37px] rounded-full ml-[10px] mr-[13px]"
              />
              <p
                data-testid={ `player-name-${index}` }
                className="
              text-black mr-auto"
              >
                {name}

              </p>
              <p
                data-testid={ `player-score-${index}` }
                className="text-black flex bg-white rank text-[16px] leading-[24px]
                rounded-full w-[184px] h-full items-center justify-center"
              >
                <img src={ star } alt="" className="mr-[13px]" />
                <small className="font-bold text-[16px] leading-[24px] mr-[4px]">
                  {score}
                </small>
                pontos
              </p>
            </div>))}
          <button
            data-testid="btn-go-home"
            onClick={ () => {
              dispatch(cleanPlayerInfo());
              push('/');
            } }
            className="btn-shadow w-[386px] rounded-[5px] h-[45px] text-white
            bg-[#2FC18C] font-bold text-xs"
          >
            PLAY AGAIN
          </button>
        </section>

      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
