import React, { Component } from 'react';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          Feedback
        </div>
      </>
    );
  }
}

export default FeedBack;
