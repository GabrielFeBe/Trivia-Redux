import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bg from '../svgs/login/bg.svg';
import logo from '../svgs/config/logo.svg';

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
      <div
        className="config min-h-screen bg-cover flex justify-center items-center flex-col"
        style={ {
          backgroundImage: `url(${bg})`,
        } }
      >
        <main
          className="w-[489px] h-[540px] bg-white flex-col
        relative rounded-[10px] flex justify-center items-center gap-[15px]"
        >
          <img src={ logo } alt="" className="top-[-103px] absolute" />
          <h1
            data-testid="settings-title"
            className="font-bold
          text-3xl text-center text-[#3f327b] mt-[100px]"
          >
            CONFIGURAÇÕES

          </h1>

          <select
            name="category"
            id="categoty"
            onClick={ this.handleChange }
            className="w-[387px] h-[45px] pt-[12px] pb-[12px] pl-[16px] pr-[16px]"
          >
            {categoryArray.map(({ name, id }) => (
              <option key={ id } value={ id }>
                {name}
              </option>))}
          </select>
          <select
            name="difficulty"
            id=""
            onClick={ this.handleChange }
            className="w-[387px] h-[45px] pt-[12px] pb-[12px] pl-[16px] pr-[16px]"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            name="type"
            id=""
            onClick={ this.handleChange }
            className="w-[387px] h-[45px] pt-[12px] pb-[12px] pl-[16px] pr-[16px]"

          >
            <option value="boolean">True/False</option>
            <option value="multiple">Multiple Choice</option>
          </select>
          <button
            onClick={ () => {
              localStorage.setItem('configApi', `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}`);
              push('/');
            } }
            className="w-[387px] h-[45px] bg-[#2FC18C] transition-colors duration-1000
             text-white rounded-[5px] hover:bg-[#55f8bc] btn-shadow"

          >
            JOGAR

          </button>
          {/* <h2 className=" text-blue-800">
            Tenha em mente que talvez a Api não
            consiga aplicar todos os filtros que você desejar,
            mas não se preuculpe caso isso aconteça você sera
            redirecionado para a página de login
          </h2> */}
          <button
            onClick={ () => this.limpaRedireciona() }
            className="w-[387px] h-[45px] bg-[#2FC18C] transition-colors duration-1000
             text-white rounded-[5px] hover:bg-[#55f8bc] btn-shadow"
          >
            LIMPAR

          </button>
        </main>
      </div>
    );
  }
}

Configuraçoes.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
