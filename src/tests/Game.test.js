import userEvent from '@testing-library/user-event';
import React from "react";
import { getByTestId, screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import token from './helpers/mockToken';
import questions from './helpers/mockQuestions';
import mockInvalidToken from './helpers/mockInvalidToken';

describe('Testa a tela do Jogo', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        questions,
      ),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  test ('Verifica se a pagina de jogo renderiza uma categoria de perguntas, uma pergunta e opções de resposta.', async () =>  {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    userEvent.type(inputName, 'Toni Marchiori');

    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    userEvent.type(inputEmail, 'ac_marchiori@yahoo.com.br');

    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.click(buttonPlay);

    await waitFor(() => { 
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(history.location.pathname).toBe('/game');
      expect(screen.getByTestId('question-category')).toBeInTheDocument();
    });

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();

    const name = screen.getByText(/toni marchiori/i);
    expect(name).toBeInTheDocument();

    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();

    const category = screen.getByTestId('question-category');
    expect(category).toBeInTheDocument();

    const question = screen.getByTestId('question-text');
    expect(question).toBeInTheDocument();

    const timer = screen.getByText(/30/i);
    expect(timer).toBeInTheDocument();

    const correctQuestion = screen.getByTestId('correct-answer');
    expect(correctQuestion).toBeInTheDocument();

    const mitochondriaBtn = screen.getByRole('button', { name: /mitochondria/i })
    expect(mitochondriaBtn).toBeInTheDocument();

    const endoplasmicBtn = screen.getByRole('button', { name: /endoplasmic reticulum/i })
    expect(endoplasmicBtn).toBeInTheDocument();

    const chloroplastBtn = screen.getByRole('button', { name: /chloroplast/i })
    expect(chloroplastBtn).toBeInTheDocument();

    const nucleusBtn = screen.getByRole('button', { name: /nucleus/i })
    expect(nucleusBtn).toBeInTheDocument();
  });
  test ('Testa a funcionalidade do botão Next.', async () =>  {
    // jest.useFakeTimers();
    // jest.spyOn(global, 'setTimeout');
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    userEvent.type(inputName, 'Toni Marchiori');

    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    userEvent.type(inputEmail, 'ac_marchiori@yahoo.com.br');

    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.click(buttonPlay);

    await waitFor(() => { 
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(history.location.pathname).toBe('/game');
      expect(screen.getByTestId('question-category')).toBeInTheDocument();
    });

    const correctQuestion = screen.getByTestId('correct-answer');
    userEvent.click(correctQuestion);

    await waitFor(() => {
      expect(screen.getByTestId('btn-next')).toBeInTheDocument()
    })
    const nextButton = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/what is the molecular formula of ozone\?/i)).toBeInTheDocument()
    })
    
    const question = screen.getByRole('button', { name: /o3/i })
    
    userEvent.click(question);
    
    await waitFor(() => {
      expect(screen.getByTestId('btn-next')).toBeInTheDocument()
    })
    const newNextButton = screen.getByRole('button', { name: /next/i });
    userEvent.click(newNextButton);
    
    const katarina = await screen.findByRole('button', { name: /katarina/i });
    expect(katarina).toBeInTheDocument()

    const newCorrectQuestion = screen.getByTestId('correct-answer');
    userEvent.click(newCorrectQuestion);
    screen.logTestingPlaygroundURL()
  });
  test ('Testa o recebimento de um token invalido.', async () =>  {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockInvalidToken)
  })

    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/digite seu nome/i);
    userEvent.type(inputName, 'Toni Marchiori');

    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    userEvent.type(inputEmail, 'ac_marchiori@yahoo.com.br');

    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.click(buttonPlay);

    await waitFor(() => { 
      expect(history.location.pathname).toBe('/game');
    });

    await waitFor(() => { 
      expect(history.location.pathname).toBe('/');
    });
  });
});

