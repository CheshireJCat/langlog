import {cx, fmtTime} from '../utils';
import DeathSelector from './DeathSelector';
import RoleSelector from './RoleSelector';
import './Player.less';
import {Button, Modal, notification} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
const Player = ({
  player,
  roles,
  players,
  onPlayerInfoUpdate,
  running
}: {
  player: Player;
  players: Player[];
  roles: Role[];
  running: boolean;
  onPlayerInfoUpdate: (player: Player) => void;
}) => {
  const {name, role, death, dead, deadTime} = player;

  const onRoleChange = (roleInfo: Role) => {
    const max = roles.find(item => item.text === roleInfo.text)?.count || 0;
    const now = players.filter(item => item.role.text === roleInfo.text).length;
    if (!running) {
      notification.warning({
        message: `请先开始游戏`,
        duration: 1
      });
      return;
    }
    if (now >= max) {
      notification.warning({
        message: `${roleInfo.text} 已经超过上限了，请修正 `,
        placement: 'bottomRight',
        duration: 1
      });
    }
    onPlayerInfoUpdate({
      ...player,
      role: roleInfo
    });
  };

  const onDeath = (deathInfo: Death) => {
    if (!running) {
      notification.warning({
        message: `请先开始游戏`,
        duration: 1
      });
      return;
    }
    onPlayerInfoUpdate({
      ...player,
      death: deathInfo,
      dead: true
    });
  };

  return (
    <div
      className={cx('player')}
      style={{
        background: `linear-gradient(90deg, ${role.color}, #999, ${role.color})`
      }}
    >
      <span className={cx('player-name')}>
        {name} {dead ? `【${role.shortText}】` : ''}
      </span>
      {!dead && (
        <RoleSelector role={role} roles={roles} onRoleChange={onRoleChange} />
      )}
      {dead && <DeathSelector death={death} onDeath={onDeath} />}
      {dead && deadTime && <span>{fmtTime(deadTime)}</span>}
      <Button
        disabled={!running}
        type="primary"
        ghost
        shape="circle"
        icon={<CloseOutlined />}
        onClick={() => {
          if (dead) {
            const {death, dead, deadTime, ...rest} = player;
            Modal.confirm({
              icon: null,
              content: `确定要复活[${name}]吗？`,
              onOk() {
                onPlayerInfoUpdate({
                  ...rest,
                  dead: false
                });
              }
            });
            return;
          }
          onPlayerInfoUpdate({
            ...player,
            dead: true,
            deadTime: +new Date()
          });
        }}
      />
    </div>
  );
};

export default Player;
