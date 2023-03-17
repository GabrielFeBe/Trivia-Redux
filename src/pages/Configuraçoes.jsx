import React, { Component } from 'react';
import Header from '../components/Header';

export default class Configuraçoes extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="settings-title">Configurações</h1>
      </div>
    );
  }
}
