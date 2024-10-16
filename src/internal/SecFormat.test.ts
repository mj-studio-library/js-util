import type { SecFormats } from './SecFormat';
import { SecFormat } from './SecFormat';

const D = 60 * 60 * 24;
const H = 60 * 60;
const M = 60;

const Suites: { type: SecFormats; sec: any; expect: string }[] = [
  {
    type: 'm:ss',
    sec: 2 * M + 3,
    expect: '2:03',
  },
  {
    type: 'm:ss',
    sec: 15.5,
    expect: '0:15',
  },
  {
    type: 'm:ss',
    sec: 155.55555,
    expect: '2:35',
  },
  {
    type: 'm:ss',
    sec: 0,
    expect: '0:00',
  },
  {
    type: 'm:ss',
    sec: '123',
    expect: '0:00',
  },
  {
    type: 'm:ss',
    sec: undefined,
    expect: '0:00',
  },
  {
    type: 'm:ss',
    sec: -1,
    expect: '0:00',
  },
  {
    type: 'm:ss',
    sec: H + M + 59,
    expect: '61:59',
  },
  {
    type: 'mm:ss',
    sec: 2 * M + 3,
    expect: '02:03',
  },
  {
    type: 'hh:mm:ss',
    sec: 2 * H,
    expect: '02:00:00',
  },
  {
    type: 'hh:mm:ss',
    sec: D,
    expect: '24:00:00',
  },
  {
    type: 'hh:mm:ss',
    sec: M + 1,
    expect: '00:01:01',
  },
  {
    type: 'h:mm:ss',
    sec: 9 * H,
    expect: '9:00:00',
  },
  {
    type: 'h:mm:ss',
    sec: 23 * H,
    expect: '23:00:00',
  },
];

it('SecondsFormatter', () => {
  Suites.forEach(({ sec, type, expect: result }) =>
    expect(SecFormat.format(sec, type)).toBe(result),
  );
  expect.assertions(Suites.length);
});
