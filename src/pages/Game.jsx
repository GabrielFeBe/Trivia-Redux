import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';

const three = 3;

export default class Game extends Component {
  state = {
    triviaQuestion: [],
    currentQuestion: 0,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    // console.log(token);
    const configApi = localStorage.getItem('configApi');
    console.log(configApi);

    if (configApi !== null) {
      console.log(configApi);
      const apiConfigResponse = await this.configApiRequest(
        configApi,
      );
      if (apiConfigResponse.response_code !== 0 || !token) {
        this.limpaRedireciona();
      }
      this.setState({ triviaQuestion:
         apiConfigResponse.results });
    } else {
      const apiResponse = await this.apiRequest(token);
      if (apiResponse.response_code === three || !token) {
        this.limpaRedireciona();
      }
      this.setState({ triviaQuestion: apiResponse.results });
    }
  }

  limpaRedireciona = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  };

  configApiRequest = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  };

  apiRequest = async (token) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    return data;
  };

  nextQuestionButton = () => {
    this.setState((prev) => ({ currentQuestion: prev.currentQuestion + 1 }));
  };

  render() {
    const { currentQuestion, triviaQuestion } = this.state;
    const { history: { push } } = this.props;
    return (
      <div>
        <Header />
        { triviaQuestion.length > 1 && <Question
          nextButton={ this.nextQuestionButton }
          question={ triviaQuestion[currentQuestion] }
          number={ currentQuestion }
          push={ push }
        />}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
