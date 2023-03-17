const INITIAL_STATE = {
  name: '',
  email: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_ACTION':
    return {
      ...state,
      name: action.PlayerInfo.name,
      email: action.PlayerInfo.email,
    };
  default:
    return state;
  }
};

export default playerReducer;
