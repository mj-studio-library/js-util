const aDay = 60 * 60 * 24;
const aHour = 60 * 60;
const aMinute = 60;

type Result = {
  totalDay: number;
  totalHour: number;
  totalMinute: number;
  onlyHour: number;
  onlyMinute: number;
  onlySecond: number;
};

const fallback: Result = {
  onlyHour: 0,
  onlyMinute: 0,
  onlySecond: 0,
  totalDay: 0,
  totalHour: 0,
  totalMinute: 0,
};

export function parseSecond(totalSecond?: number): Result {
  if (typeof totalSecond !== 'number' || isNaN(totalSecond)) {
    return fallback;
  }

  totalSecond = Math.max(0, totalSecond);

  const totalDay = Math.floor(totalSecond / aDay);
  const totalHour = Math.floor(totalSecond / aHour);
  const totalMinute = Math.floor(totalSecond / aMinute);
  const onlyHour = Math.floor(totalSecond / aHour) % 24;
  const onlyMinute = Math.floor(totalSecond / aMinute) % 60;
  const onlySecond = Math.floor(totalSecond % 60);

  return {
    totalDay,
    totalHour,
    totalMinute,
    onlyHour,
    onlyMinute,
    onlySecond,
  };
}
