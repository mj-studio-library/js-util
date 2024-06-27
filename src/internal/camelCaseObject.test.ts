import { camelCaseObject } from './camelCaseObject';

describe('camelCase function test', (): void => {
  it('general object to camelCase', (): void => {
    expect(
      camelCaseObject({
        leveltest_srl: 31,
        order: 2,
        expected_start_num: 2,
        expected_end_num: 2,
        expected_start_time: 2,
        expected_end_time: 2,
        ai_accuracy_goal: 2,
        complete: true,
        user_srl: 16,
        leveltest_units: ['2001', '2002'],
      }),
    ).toStrictEqual({
      leveltestSrl: 31,
      order: 2,
      expectedStartNum: 2,
      expectedEndNum: 2,
      expectedStartTime: 2,
      expectedEndTime: 2,
      aiAccuracyGoal: 2,
      complete: true,
      userSrl: 16,
      leveltestUnits: ['2001', '2002'],
    });
  });

  it('change object to camelCase in nested object', (): void => {
    const obj = { a_b_c: { c_c_c: 1, b_b_b: [{ d_d_d: 1 }, 2, 3] } };

    expect(camelCaseObject(obj)).toStrictEqual({
      aBC: { cCC: 1, bBB: [{ dDD: 1 }, 2, 3] },
    });
  });

  it('change array to camelCase', (): void => {
    const obj = { a_b_c: { c_c_c: 1, b_b_b: [{ d_d_d: 1 }, 2, 3] } };
    const arr = [obj, obj, obj];

    expect(camelCaseObject(arr)).toStrictEqual([
      { aBC: { cCC: 1, bBB: [{ dDD: 1 }, 2, 3] } },
      { aBC: { cCC: 1, bBB: [{ dDD: 1 }, 2, 3] } },
      { aBC: { cCC: 1, bBB: [{ dDD: 1 }, 2, 3] } },
    ]);
  });

  it('change array to camelCase2', (): void => {
    const numberArray = [0, 1, 2, 3, 4];

    expect(camelCaseObject(numberArray)).toStrictEqual([0, 1, 2, 3, 4]);

    const stringArray = ['2001', '2002', '2003'];

    expect(camelCaseObject(stringArray)).toStrictEqual(['2001', '2002', '2003']);
  });

  it('change object containing non-plain-object to camelCase', (): void => {
    class Class {
      constructor(
        public name: string,
        private birth: number,
      ) {}

      sayMyName() {}
    }

    const instance = new Class('mj', 1997);

    const obj = { a_b_c: instance };

    expect(camelCaseObject(obj)).toStrictEqual({
      aBC: instance,
    });
  });

  it('undefined should return undefined', () => {
    expect(camelCaseObject(undefined)).toBeUndefined();
  });

  it('nested array', () => {
    const obj = {
      summary_cards: [
        [
          {
            type: 'bar',
            title: '이전 결과',
            description: '1/2개',
            bar_color: '#FFC107',
            total_solved_problem_count: 2,
            correct_solved_problem_count: 1,
          },
        ],
      ],
    } as const;

    expect(camelCaseObject(obj)).toStrictEqual({
      summaryCards: [
        [
          {
            type: 'bar',
            title: '이전 결과',
            description: '1/2개',
            barColor: '#FFC107',
            totalSolvedProblemCount: 2,
            correctSolvedProblemCount: 1,
          },
        ],
      ],
    });
  });
});
