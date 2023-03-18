import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Requesito 5
class Header extends Component {
  render() {
    const { name, email } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt=""
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  email: state.playerReducer.email,
});
Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired };
export default connect(mapStateToProps)(Header);
