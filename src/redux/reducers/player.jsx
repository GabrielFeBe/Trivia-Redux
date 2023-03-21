const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_ACTION':
    return {
      ...state,
      name: action.PlayerInfo.name,
      email: action.PlayerInfo.email,
    };
  case 'SAVE_SCORE':
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  case 'CLEAN_SCORE':
    return {
      ...state,
      score: 0,
      assertions: 0,
      name: '',
      email: '',
    };
  default:
    return state;
  }
};

export default player;
