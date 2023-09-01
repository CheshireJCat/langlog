import {Wolf, People, God} from '../config/roles';
import './CountInfo.less';

export interface CountInfo {
  wolf: number;
  people: number;
  god: number;
}

const countInfo: React.FC<{players: Player[]}> = ({players}) => {
  const countInfo = {
    wolf: 0,
    god: 0,
    people: 0
  };
  players.forEach(item => {
    if (!item.dead) {
      switch (item.role.shortText) {
        case '狼':
          countInfo.wolf++;
          break;
        case '民':
          countInfo.people++;
          break;
        default:
          countInfo.god++;
      }
    }
  });
  return (
    <div className="infos">
      <span
        className="info-item"
        style={{
          color: Wolf.color
        }}
      >
        狼:{countInfo.wolf}
      </span>
      <span
        className="info-item"
        style={{
          color: People.color
        }}
      >
        民:{countInfo.people}
      </span>
      <span
        className="info-item"
        style={{
          color: God.color
        }}
      >
        神:{countInfo.god}
      </span>
    </div>
  );
};

export default countInfo;
