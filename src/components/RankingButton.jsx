import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RankingButton extends Component {
  render() {
    const { push } = this.props;
    return (
      <div>
        <button
          data-testid="btn-ranking"
          onClick={ () => push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

RankingButton.propTypes = {
  push: PropTypes.func.isRequired,
};

export default RankingButton;
