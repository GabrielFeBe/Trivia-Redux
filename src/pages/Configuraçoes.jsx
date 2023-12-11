import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const categoryArray = [{ id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Entertainment: Books' },
  { id: 11, name: 'Entertainment: Film' },
  { id: 12, name: 'Entertainment: Music' },
  { id: 13, name: 'Entertainment: Musicals & Theatres' },
  { id: 14, name: 'Entertainment: Television' },
  { id: 15, name: 'Entertainment: Video Games' },
  { id: 16, name: 'Entertainment: Board Games' },
  { id: 17, name: 'Science & Nature' },
  { id: 18, name: 'Science: Computers' },
  { id: 19, name: 'Science: Mathematics' },
  { id: 20, name: 'Mythology' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  { id: 24, name: 'Politics' },
  { id: 25, name: 'Art' },
  { id: 26, name: 'Celebrities' },
  { id: 27, name: 'Animals' },
  { id: 28, name: 'Vehicles' },
  { id: 29, name: 'Entertainment: Comics' },
  { id: 30, name: 'Science: Gadgets' },
  { id: 31, name: 'Entertainment: Japanese Anime & Manga' },
  { id: 32, name: 'Entertainment: Cartoon & Animations' }];

export default class Configuraçoes extends Component {
  state = {
    category: 9,
    type: 'boolean',
    difficulty: 'easy',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.handleError);
  };

  limpaRedireciona = () => {
    const { history } = this.props;
    localStorage.removeItem('configApi');
    history.push('/');
  };

  render() {
    const { type, difficulty, category } = this.state;
    const { history: { push } } = this.props;
    return (
      <div className="config">
        <Header />
        <h1 data-testid="settings-title">Configurações</h1>
        <main>
          <div>
            <select
              name="category"
              id="categoty"
              onClick={ this.handleChange }
            >
              {categoryArray.map(({ name, id }) => (
                <option key={ id } value={ id }>
                  {name}
                </option>))}
            </select>
            <select name="difficulty" id="" onClick={ this.handleChange }>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select name="type" id="" onClick={ this.handleChange }>
              <option value="boolean">True/False</option>
              <option value="multiple">Multiple Choice</option>
            </select>
          </div>
          <button
            onClick={ () => {
              localStorage.setItem('configApi', `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}`);
            } }
          >
            Save Config

          </button>
          <h2>
            Tenha em mente que talvez a Api não
            consiga aplicar todos os filtros que você desejar,
            mas não se preuculpe caso isso aconteça vira uma resposta default da API,
            com tudo aleatorio, Apos salvar as configurações clique em jogar.
          </h2>
          <button onClick={ () => push('/') }>Jogar</button>
          <button onClick={ () => this.limpaRedireciona() }>Limpar Config</button>
        </main>
      </div>
    );
  }
}

Configuraçoes.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
