import {useEffect, useState} from 'react';
import CountInfo from './components/CountInfo';
import {People, Wolf, getRoles} from './config/roles';
import Player from './components/Player';
import {Button, Divider, Modal} from 'antd';
import ConfigPlayers from './components/ConfigPlayers';
import {getPlayers} from './config/players';
import ConfigRoles from './components/ConfigRoles';
import {
  setStoreRunning,
  getStoreRunning,
  setGameInfo,
  getGameInfo,
  clearGameInfo
} from './config/gameCache';
import Help from './components/Help';
import {ClearOutlined} from '@ant-design/icons';
import {clearAllLocalStore} from './config';
import './App.less';

const getDefaultPlayers = () => {
  let res = getPlayers().map(v => ({name: v, role: People}));
  const store = getGameInfo();
  if (getStoreRunning() && store) {
    return store as never as Player[];
  }
  return res;
};

function App() {
  const [running, setRunning] = useState(getStoreRunning());
  const [roles, setRoles] = useState<Role[]>(getRoles());
  const [players, setPlayers] = useState<Player[]>(getDefaultPlayers());
  const [configPlayerOpen, setConfigPlayerOpen] = useState(false);
  const [configRoleOpen, setConfigRoleOpen] = useState(false);

  // 死活分类
  let livePlayers: Player[] = [];
  let deadPlayers: Player[] = [];
  players.forEach(item => {
    !item.dead ? livePlayers.push(item) : deadPlayers.push(item);
  });

  const order = [Wolf.shortText, People.shortText];
  livePlayers = livePlayers.sort(
    (a, b) => order.indexOf(b.role.shortText) - order.indexOf(a.role.shortText)
  );

  deadPlayers = deadPlayers.sort(
    (a, b) => (a?.deadTime || 0) - (b?.deadTime || 0)
  );

  // 更新玩家信息
  const onPlayerInfoUpdate = (player: Player) => {
    setPlayers(
      players.map(item => {
        if (item.name === player.name) {
          return player;
        }
        return item;
      })
    );
  };

  const start = () => {
    setRunning(true);
    setRoles(getRoles());
    setPlayers(getDefaultPlayers());
  };

  useEffect(() => {
    setStoreRunning(running);
  }, [running]);

  useEffect(() => {
    running ? setGameInfo(players) : clearGameInfo();
  }, [players, running]);

  // 重新开始
  const stop = () => {
    Modal.confirm({
      icon: null,
      content: '确定要结束吗？',
      onOk() {
        setRunning(false);
      }
    });
  };

  const clearAllStore = () => {
    Modal.confirm({
      icon: null,
      content: '确定要清除所有本地缓存吗？',
      onOk() {
        clearAllLocalStore();
      }
    });
  };

  return (
    <div className="app">
      <div className="header">
        <CountInfo players={players} />
        <Help />
      </div>
      <div className="content">
        <div className="players live-player">
          {livePlayers.map(item => (
            <Player
              key={item.name}
              player={item}
              roles={roles}
              players={players}
              running={running}
              onPlayerInfoUpdate={onPlayerInfoUpdate}
            />
          ))}
        </div>
        <Divider
          plain
          style={{
            color: '#fff'
          }}
        >
          To be Or Not To Be
        </Divider>
        <div className="players dead-player">
          {deadPlayers.map(item => (
            <Player
              key={item.name}
              player={item}
              players={players}
              roles={roles}
              running={running}
              onPlayerInfoUpdate={onPlayerInfoUpdate}
            />
          ))}
        </div>
      </div>
      <div className="flex-row">
        <Button
          disabled={running}
          ghost
          type="primary"
          onClick={() => {
            setConfigRoleOpen(true);
          }}
        >
          角色
        </Button>
        <Button
          type="primary"
          ghost
          disabled={running}
          onClick={() => {
            setConfigPlayerOpen(true);
          }}
        >
          玩家
        </Button>
        {!running && (
          <ClearOutlined onClick={clearAllStore} style={{opacity: 0.5}} />
        )}
        <Button
          type="primary"
          className="ml-auto"
          onClick={() => {
            running ? stop() : start();
          }}
        >
          {running ? '结束' : '开始'}
        </Button>
      </div>
      {configPlayerOpen && (
        <ConfigPlayers
          open={configPlayerOpen}
          onClose={() => {
            setConfigPlayerOpen(false);
          }}
          onSave={(players: string[]) => {
            setPlayers(players.map(v => ({name: v, role: People})));
            setConfigPlayerOpen(false);
          }}
        />
      )}
      {configRoleOpen && (
        <ConfigRoles
          open={configRoleOpen}
          onClose={() => {
            setConfigRoleOpen(false);
          }}
          onSave={(roles: Role[]) => {
            setRoles(roles);
            setConfigRoleOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
