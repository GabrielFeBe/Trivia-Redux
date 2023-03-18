import userEvent from '@testing-library/user-event';
import React from "react";
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe('Testa a pagina de Login', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        "response_code": 0,
        "response_message": "Token Generated Successfully!",
        "token": "2e7094ef2c52834ae0d61a0396c745ddcac587f3337e07ce80fb70dd5e54fe52"
    }),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  test('Verifica se o na tela de Login são renderizados 2 inputs, 2 botões e se o botão Play esta desabilitado.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    const buttonSettings = screen.getByRole('button', { name: /configurações/i });
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
    expect(buttonPlay).toHaveAttribute('disabled');
  });

  test('Verifica inseridos os dados corretos o botão Entrar é habilitado.', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByRole('button', { name: /play/i });
    expect(buttonPlay.disabled).toBe(true);

    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    userEvent.type(inputName, 'Toni Marchiori');

    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    userEvent.type(inputEmail, 'ac_marchiori@yahoo.com.br');

    expect(buttonPlay.disabled).toBe(false);
  });
  test('Verifica se foi feita uma requisição na API ao clicar no botão.', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    screen.logTestingPlaygroundURL();
    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    userEvent.type(inputName, 'Toni Marchiori');

    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    userEvent.type(inputEmail, 'ac_marchiori@yahoo.com.br');

    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.click(buttonPlay);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
