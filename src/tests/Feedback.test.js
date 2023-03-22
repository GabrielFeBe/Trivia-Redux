import userEvent from '@testing-library/user-event';
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import token from './helpers/mockToken';
describe('Testa a tela de Feedback', () => {
    test ('Verifica se as informações dessa tela estão apresentadas conforme solicitado ', () =>  {
      const initialState = {
        token: token,
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 0,
          assertions: 0,
        }
      }
      
      renderWithRouterAndRedux(<App />, initialState, "/feedback");

        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();

        const playerName = screen.getByText(/player name/i);
        expect(playerName).toBeInTheDocument();

        const headerScore = screen.getByTestId('header-score');
        expect(headerScore).toBeInTheDocument();

        const feedbackText = screen.getByText(/could be better\.\.\./i);
        expect(feedbackText).toBeInTheDocument();

        const feedbackTotalScore = screen.getByTestId('feedback-total-score');
        expect(feedbackTotalScore).toBeInTheDocument();

        const feedbackTotalQuestion = screen.getByTestId('feedback-total-question');
        expect(feedbackTotalQuestion).toBeInTheDocument();

        const buttonPlayAgain = screen.getByRole('button', { name: /play again/i });
        expect(buttonPlayAgain).toBeInTheDocument();

        const buttonRanking = screen.getByRole('button', { name: /ranking/i });
        expect(buttonRanking).toBeInTheDocument();
    });
    test('Verifica se as mensagens "Well Done!" aparecem na tela;', () => {
      const initialState = {
        token: token,
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 0,
          assertions: 3,
        }
      }
      
      const { history } = renderWithRouterAndRedux(<App />, initialState, "/feedback");

      const message2 = screen.getByTestId('feedback-text');
      expect(message2).toBeInTheDocument();

      const buttonPlayAgain = screen.getByRole('button', { name: /play again/i });
      userEvent.click(buttonPlayAgain);

      waitFor(() => { 
        expect(history.location.pathname).toBe('/game');
      });
    });

    test('Verifica se ao clicar no botão Ranking a aplicação é redirecionada para pagina de correspondente.', () => {
      const initialState = {
        token: token,
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 0,
          assertions: 3,
        }
      }
      
      const { history } = renderWithRouterAndRedux(<App />, initialState, "/feedback");

      const message2 = screen.getByTestId('feedback-text');
      expect(message2).toBeInTheDocument();

      const buttonPlayAgain = screen.getByRole('button', { name: /ranking/i });
      userEvent.click(buttonPlayAgain);

      waitFor(() => { 
        expect(history.location.pathname).toBe('/ranking');
      });
    });
    });