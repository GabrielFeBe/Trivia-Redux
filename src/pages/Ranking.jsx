import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { cleanPlayerInfo } from '../redux/actions';

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
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map(({ score, email, name }, index) => (
          <div key={ index }>
            <img src={ `https://www.gravatar.com/avatar/${md5(email)}` } alt={ `Foto de ${name}` } />
            <p data-testid={ `player-name-${index}` } className="rank">{name}</p>
            <p data-testid={ `player-score-${index}` } className="rank">{score}</p>
          </div>))}
        <button
          data-testid="btn-go-home"
          onClick={ () => {
            dispatch(cleanPlayerInfo());
            push('/');
          } }
          className="inicioBtn"
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
