interface Role {
  text: string;
  shortText: string;
  count: number;
  color: string;
  disabledEdit?: boolean;
}

interface Death {
  text: string;
  shortText: string;
  color: string;
}

interface Player {
  name: string;
  role: Role;
  dead?: boolean;
  death?: Death;
  deadTime?: number;
}
