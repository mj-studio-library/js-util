import { groupByArray } from './groupByArray';

const d1 = { age: 12, name: 'mj', parent: { age: 59 } };
const d2 = { age: 12, name: 'q', parent: { age: 64 } };
const d3 = { age: 14, name: 'black' };
const d4 = { age: 25, name: 'black' };

describe('GroupByArray', () => {
  it('simple case', () => {
    const data = [d1, d2, d3, d4];

    expect(groupByArray(data, (item) => item.age)).toStrictEqual([[d1, d2], [d3], [d4]]);
    expect(groupByArray(data, (item) => item.name)).toStrictEqual([[d1], [d2], [d3, d4]]);
    // @ts-ignore
    expect(groupByArray(data, (item) => item?.parent?.age)).toStrictEqual([[d1], [d2], [d3, d4]]);
  });
});
