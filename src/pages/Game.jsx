import React, { Component } from 'react';
import Header from '../components/Header';

const three = 3;

export default class Game extends Component {
  state = {
    // triviaQuestion: '',
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    console.log(token);
    const apiResponse = await this.apiRequest(token);
    console.log(apiResponse);
    if (apiResponse.response_code === three || !token) {
      this.limpaRedireciona();
    } else {
      // this.setState({ triviaQuestion: apiResponse });
    }
  }

  limpaRedireciona = () => {
    // const { history } = this.props;
    localStorage.clear();
    // history.push('/');
  };

  apiRequest = async (token) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    return data;
  };

  render() {
    return (
      <div>
        <Header />
        Game
      </div>
    );
  }
}
