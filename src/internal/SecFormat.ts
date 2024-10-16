import { parseSecond } from './parseSecond';

type Formatter = (totalSecond: number) => string;

type GeneralFormats = 'mm:ss' | 'm:ss' | 'hh:mm:ss' | 'h:mm:ss' | 'hh:mm:ss_on_demand';

export type SecFormats = GeneralFormats;

const Formatters: Record<SecFormats, Formatter> = {
  'm:ss': (totalSecond) => {
    const { totalMinute, onlySecond } = parseSecond(totalSecond);

    return `${totalMinute}:${lz(onlySecond)}`;
  },
  'mm:ss': (totalSecond) => {
    const { totalMinute, onlySecond } = parseSecond(totalSecond);

    return `${lz(totalMinute)}:${lz(onlySecond)}`;
  },
  'hh:mm:ss': (totalSecond) => {
    const { onlyMinute, onlySecond, totalHour } = parseSecond(totalSecond);

    return `${lz(totalHour)}:${lz(onlyMinute)}:${lz(onlySecond)}`;
  },
  'h:mm:ss': (totalSecond) => {
    const { onlyMinute, onlySecond, totalHour } = parseSecond(totalSecond);

    return `${totalHour}:${lz(onlyMinute)}:${lz(onlySecond)}`;
  },
  'hh:mm:ss_on_demand': (totalSecond) => {
    const { onlyMinute, onlySecond, totalHour } = parseSecond(totalSecond);
    if (totalHour < 1) {
      return `${onlyMinute}:${lz(onlySecond)}`;
    }

    return `${totalHour}:${lz(onlyMinute)}:${lz(onlySecond)}`;
  },
};

const InvalidateIntervalSeconds: Record<SecFormats, number> = {
  'm:ss': 1,
  'mm:ss': 1,
  'h:mm:ss': 1,
  'hh:mm:ss': 1,
  'hh:mm:ss_on_demand': 1,
};

// Append leading zeros
function lz(number: number | undefined, len = 2): string {
  if (typeof number !== 'number') {
    return '';
  }

  return (number + '').padStart(len, '0');
}

export const SecFormat = {
  get: (type: SecFormats): Formatter => Formatters[type] || Formatters['hh:mm:ss'],
  format: (totalSeconds: number, type: SecFormats) => SecFormat.get(type)(totalSeconds),
  invalidateIntervalSec: (type: SecFormats) => InvalidateIntervalSeconds[type] || 60,
};
export const formatSec = SecFormat.format;
