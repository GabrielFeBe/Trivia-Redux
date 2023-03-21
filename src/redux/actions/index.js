export const savePlayerInfo = (PlayerInfo) => ({ type: 'LOGIN_ACTION', PlayerInfo });

export const savePlayerScore = (score) => ({ type: 'SAVE_SCORE', score });

export const cleanPlayerInfo = () => ({ type: 'CLEAN_SCORE' });
