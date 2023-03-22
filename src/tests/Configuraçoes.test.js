import userEvent from '@testing-library/user-event';
import React from "react";
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import token from './helpers/mockToken';

describe('Testa a pagina de Login', () => {
  test('Verifica se o na tela de Login são renderizados 2 inputs, 2 botões e se o botão Play esta desabilitado.', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(buttonSettings)

    expect(history.location.pathname).toBe('/settings');

    const title = screen.getByRole('heading', { name: /configurações/i });
    expect(title).toBeInTheDocument()

    screen.logTestingPlaygroundURL();


  });
});