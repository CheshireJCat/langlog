const key = `PLAYERS`;

export const defaultPlayers = [
  '靳烨',
  '吴同',
  '春雨',
  '春晖',
  '桂华',
  '黄莹'
].map(name => ({
  name,
  check: true
}));

export const getAllPlayers = () => {
  let players = localStorage.getItem(key) || '';
  if (!players) {
    return defaultPlayers;
  }

  try {
    players = JSON.parse(players);
  } catch (e) {
    alert(e);
    return [];
  }
  return Array.isArray(players) ? players : [];
};

export const getPlayers = () => {
  return getAllPlayers()
    .filter(p => p.check)
    .map(({name}) => name);
};

export const storeAllPlayers = (
  players: {
    name: string;
    check: boolean;
  }[]
) => {
  try {
    localStorage.setItem(key, JSON.stringify(players));
  } catch (error) {
    alert(error);
  }
};

export const resetAllPlayers = () => {
  storeAllPlayers(defaultPlayers);
};

export const clearPlayers = () => {
  localStorage.removeItem(key);
};
