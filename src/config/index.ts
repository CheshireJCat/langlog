import {clearGameInfo} from './gameCache';
import {clearPlayers} from './players';
import {clearRoles} from './roles';

export const clearAllLocalStore = () => {
  clearPlayers();
  clearRoles();
  clearGameInfo();
};
