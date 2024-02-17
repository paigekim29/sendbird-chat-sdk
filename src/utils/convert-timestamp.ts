import dayjs from 'dayjs';

const formatTimestamp = (timestamp: number) =>
  dayjs.unix(String(timestamp).length === 13 ? timestamp / 1000 : timestamp).format('LT');

const startOfDay = (timestamp: number) =>
  dayjs.unix(String(timestamp).length === 13 ? timestamp / 1000 : timestamp).startOf('day').format('YYYY-MM-DDT');

export { formatTimestamp, startOfDay };
