import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RankingButton.css';

class RankingButton extends Component {
  render() {
    const { push } = this.props;
    return (
      <button
        className="bg-[#00D5E2] w-[212.5px] h-[45px] rounded-[5px] text-white btn-shadow
        hover:bg-[#66ffc7] transition-colors duration-1000"
        data-testid="btn-ranking"
        onClick={ () => push('/ranking') }
      >
        SEE RANKING
      </button>
    );
  }
}

RankingButton.propTypes = {
  push: PropTypes.func.isRequired,
};

export default RankingButton;
