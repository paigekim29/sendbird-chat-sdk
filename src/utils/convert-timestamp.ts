import dayjs from 'dayjs';

const formatTimestamp = (timestamp) =>
  dayjs.unix(String(timestamp).length === 13 ? timestamp / 1000 : timestamp).format('LT');

const startOfDay = (timestamp) =>
  dayjs.unix(String(timestamp).length === 13 ? timestamp / 1000 : timestamp).startOf('day');

export { formatTimestamp, startOfDay };
