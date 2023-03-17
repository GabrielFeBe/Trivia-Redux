import React from 'react';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, email } = this.state;
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
          onClick={ () => {} }
        >
          Play
        </button>
      </>
    );
  }
}

export default Login;
