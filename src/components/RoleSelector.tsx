import {cx} from '../utils';

const RoleSelector = ({
  roles,
  role,
  onRoleChange
}: {
  roles: Role[];
  role?: Role;
  onRoleChange: (roleInfo: Role) => void;
}) => {
  return (
    <ul className="player-info-selector">
      {roles.map(item => {
        return (
          <li
            key={item.text}
            style={{
              color: item.color
            }}
            className={cx(
              'player-info-tag',
              role?.text === item.text ? 'active' : ''
            )}
            onClick={() => onRoleChange(item)}
          >
            {item.shortText}
          </li>
        );
      })}
    </ul>
  );
};

export default RoleSelector;
