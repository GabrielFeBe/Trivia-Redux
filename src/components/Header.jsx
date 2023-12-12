import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import star from '../svgs/questions/star.svg';
import './Header.css';

// Requesito 5
class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <header className="header">
        <section className="h-[50px] flex items-center justify-center mr-[10px]">

          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(email)}` }
            alt=""
            className="mr-[10px] h-[40px] w-[40px] rounded-full"
          />
          <small
            data-testid="header-player-name"
            className="font-normal text-xs "
          >
            {name}

          </small>
        </section>

        <p
          data-testid="header-score"
          className="flex
        items-center gap-[3px] justify-center font-normal text-xs mr-[10px]"
        >
          <img src={ star } alt="" className="w-[29.88px] h-[28.59px] " />
          Pontos:
          <p className="flex items-center justify-center font-bold">
            {score}
          </p>

        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});
Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired };
export default connect(mapStateToProps)(Header);
