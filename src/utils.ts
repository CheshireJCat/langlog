export const cx = (...args: any[]) => {
  return args.filter(v => !!v).join(' ');
};

export const fmtTime = (date: number) => {
  return new Date(date).toLocaleString().slice(-8);
};
