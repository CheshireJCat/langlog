export const People: Role = {
  text: '村民',
  shortText: '民',
  count: 2,
  color: 'gray',
  disabledEdit: true
};
export const Wolf: Role = {
  text: '狼人',
  shortText: '狼',
  count: 2,
  color: 'red',
  disabledEdit: true
};
export const God: Role = {
  text: '神职',
  shortText: '神',
  count: 0,
  color: 'pink',
  disabledEdit: true
};

export const defaultRoles: Role[] = [
  Wolf,
  People,
  {
    text: '预言家',
    shortText: '预',
    count: 1,
    color: '#ac9e11',
    disabledEdit: true
  },
  {
    text: '女巫',
    shortText: '巫',
    count: 1,
    color: '#993399',
    disabledEdit: true
  },
  {
    text: '猎人',
    shortText: '猎',
    count: 0,
    color: '#FF6347',
    disabledEdit: true
  },
  {
    text: '守卫',
    shortText: '守',
    count: 0,
    color: '#00CED1',
    disabledEdit: true
  }
];

const key = 'ROLES';

export const getAllRoles = () => {
  let roles = localStorage.getItem(key) || '';
  if (!roles) {
    return defaultRoles;
  }

  try {
    roles = JSON.parse(roles);
  } catch (e) {
    alert(e);
    return [];
  }
  return Array.isArray(roles) ? roles : [];
};

export const getRoles = () => {
  return getAllRoles().filter(p => p.count > 0);
};

export const storeAllRoles = (roles: Role[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(roles));
  } catch (error) {
    alert(error);
  }
};

export const resetAllRoles = () => {
  storeAllRoles(defaultRoles);
};

export const clearRoles = () => {
  localStorage.removeItem(key);
};
