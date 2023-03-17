import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { savePlayerInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  // função para salvar estado
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  // função para pegar o token
  getToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    return token;
  };

  render() {
    const { name, email } = this.state;
    const { history: { push }, dispatch } = this.props;
    return (
      <>
        <input
          data-testid="input-player-name"
          type="text"
          value={ name }
          name="name"
          onChange={ this.handleChange }
          placeholder="Digite seu nome"
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          value={ email }
          name="email"
          onChange={ this.handleChange }
          placeholder="Digite seu Email"
        />
        <button
          data-testid="btn-play"
          disabled={ !(name.length > 0 && email.length > 0) }
          onClick={ async () => {
            // Temos que fazer um tratamendo para caso retorne o response_code 0 ou 3
            const token = await this.getToken();
            dispatch(savePlayerInfo({ email, name }));
            localStorage.setItem('token', token.token);
            push('/game');
          } }
        >
          Play
        </button>
        <Link to="/settings">
          <button data-testid="btn-settings">Configurações</button>
        </Link>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
