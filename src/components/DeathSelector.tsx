import {deaths} from '../config/deaths';
import {cx} from '../utils';

const DeathSelector = ({
  death,
  onDeath
}: {
  death?: Death;
  onDeath: (deathInfo: Death) => void;
}) => {
  return (
    <ul className="player-info-selector">
      {deaths.map(item => {
        return (
          <li
            key={item.text}
            style={{
              color: item.color
            }}
            className={cx(
              'player-info-tag',
              death?.text === item.text ? 'active' : ''
            )}
            onClick={() => onDeath(item)}
          >
            {item.shortText}
          </li>
        );
      })}
    </ul>
  );
};

export default DeathSelector;
