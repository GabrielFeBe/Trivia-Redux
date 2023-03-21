import userEvent from '@testing-library/user-event';
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import token from './helpers/mockToken';

beforeEach(() => {
  window.localStorage.clear();
});
describe('Testa a tela de Ranking', () => {
    test ('Verifica se a pagina de Ranking possui um titulo e se possui um botão que leva ao inicio da aplicação.', () =>  {
      const initialState = {
        token: token,
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 0,
          assertions: 0,
        }
      }

      const { history } = renderWithRouterAndRedux(<App />, initialState, "/ranking");

      const title = screen.getByRole('heading', { name: /ranking/i });
      expect(title).toBeInTheDocument()

      const inicioBtn = screen.getByRole('button', { name: /inicio/i });
      expect(inicioBtn).toBeInTheDocument()
      userEvent.click(inicioBtn);

      waitFor(() => { 
        expect(history.location.pathname).toBe('/');
      });
    });
    test ('Verifica se a pagina renderiza um ranking de jogadores.', () =>  {
      const ranking = [
          {
              "score": 350,
              "name": "Nome da pessoa",
              "email": "teste@teste.com"
          },
      ]

      localStorage.setItem('ranking', JSON.stringify(ranking));

      const initialState = {
        token: token,
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 0,
          assertions: 0,
        }
      }

      const { history } = renderWithRouterAndRedux(<App />, initialState, "/ranking");

        const img = screen.getByRole('img', { name: /foto de nome da pessoa/i });
        expect(img).toBeInTheDocument();

        const name = screen.getByText(/nome da pessoa/i);
        expect(name).toBeInTheDocument();

        const score = screen.getByText(/350/i);
        expect(score).toBeInTheDocument();
    });
    });