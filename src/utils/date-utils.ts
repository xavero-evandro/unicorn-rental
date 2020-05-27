/* eslint-disable import/prefer-default-export */
export const dateDiffInMinutes = (date1: Date, date2: Date): number => {
  const msPerHour = 1000 * 60;
  const utc1 = date1.getTime();
  const utc2 = date2.getTime();
  return (utc2 - utc1) / msPerHour;
};

export const dateFormatDE = (date: Date): string => {
  return new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};
