import { groupByObject } from './groupByObject';

const d1 = { age: 12, name: 'mj', parent: { age: 59 } };
const d2 = { age: 12, name: 'q', parent: { age: 64 } };
const d3 = { age: 14, name: 'black' };
const d4 = { age: 25, name: 'black' };

describe('GroupByObject', () => {
  it('simple case', () => {
    const data = [d1, d2, d3, d4];

    expect(groupByObject(data, (item) => item.age)).toStrictEqual({
      12: [d1, d2],
      14: [d3],
      25: [d4],
    });

    expect(groupByObject(data, (item) => item.name)).toStrictEqual({
      black: [d3, d4],
      mj: [d1],
      q: [d2],
    });

    // @ts-ignore
    expect(groupByObject(data, (item) => item?.parent?.age)).toStrictEqual({
      59: [d1],
      64: [d2],
      undefined: [d3, d4],
    });
  });
});
