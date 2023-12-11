import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { savePlayerInfo } from '../redux/actions';
import triviaLogo from '../svgs/login/triviaLogo.svg';
import trybe from '../svgs/login/trybeLogo.svg';
import engine from '../svgs/login/miniEngine.svg';

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
      <div className="flex items-center flex-col justify-center">
        <header className="mb-[12px] mt-[40px]">

          <img src={ triviaLogo } alt="" />
        </header>

        <main
          className="w-[614px] h-[340px] rounded-[10px] flex flex-col items-center
        justify-center bg-white shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] gap-[20px]"
        >
          <input
            id="name"
            data-testid="input-player-name"
            type="text"
            value={ name }
            name="name"
            onChange={ this.handleChange }
            placeholder="Digite seu nome"
            className="border-[1px] border-[#E1E5EB]
            w-[519px] h-[45px] pt-[12px] pb-[12px] pl-[16px] pr-[16px]"
          />
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="email"
            value={ email }
            className="border-[1px] border-[#E1E5EB]
            w-[519px] h-[45px] pt-[12px] pb-[12px] pl-[16px] pr-[16px]"
            name="email"
            onChange={ this.handleChange }
            placeholder="Digite seu Email"
          />

          <button
            className="w-[519px] h-[45px] bg-[#2FC18C] flex items-center justify-center
            gap-[10px] rounded-[5px] text-white font-bold text-[18px] cursor-pointer
            hover:bg-[#55f8bc] transition-colors duration-1000 hover:text-black"
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
            JOGAR
          </button>
          <Link to="/settings">
            <button
              className="w-[519px] h-[45px] bg-[#35906F] flex items-center justify-center
              gap-[10px] rounded-[5px] text-white font-bold text-[18px]
              hover:bg-[#173d2f] transition-colors duration-1000 hover:text-black"
              data-testid="btn-settings"
            >
              <img src={ engine } alt="" />
              Configurações

            </button>
          </Link>
        </main>
        <footer className="mt-[40px]">
          <img src={ trybe } alt="" />
        </footer>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
