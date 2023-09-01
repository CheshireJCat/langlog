const RunningKey = 'RUNNING_KEY';

export const getStoreRunning = () => {
  const value = localStorage.getItem(RunningKey);
  return value ? JSON.parse(value) : false;
};

export const setStoreRunning = (value: boolean) => {
  return localStorage.setItem(RunningKey, JSON.stringify(value));
};

const GameInfoKey = 'GAME_INFO';

export const getGameInfo = () => {
  let info = localStorage.getItem(GameInfoKey) || '';
  if (!info) {
    return null;
  }

  try {
    info = JSON.parse(info);
    return info;
  } catch (e) {
    return null;
  }
};

export const setGameInfo = (info: any) => {
  if (!info) {
    return;
  }
  try {
    localStorage.setItem(GameInfoKey, JSON.stringify(info));
  } catch (error) {
    alert(error);
  }
};

export const clearGameInfo = () => {
  localStorage.removeItem(GameInfoKey);
  localStorage.removeItem(RunningKey);
};
