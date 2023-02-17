import filterJsonKeys from './filterJsonKeys';

it('simple object', () => {
  expect(filterJsonKeys({ a: 1, b: 1 }, 'a')).toEqual({ a: 1 });
  expect(filterJsonKeys({ a: 1, b: 1, ab: 1 }, (key) => key.startsWith('a'))).toEqual({ a: 1, ab: 1 });

  expect(
    filterJsonKeys({ android: '2.15.23', ios: '2.15.23', title: '', body: '', able_to_use: true }, 'body'),
  ).toEqual({
    body: '',
  });
});

it('simple array', () => {
  expect(filterJsonKeys([1, 2], 'a')).toEqual([]);
  expect(filterJsonKeys([{ c1: { c2: { c3: [1, 2, 3] } } }, 2], 'c1')).toEqual([{ c1: { c2: { c3: [1, 2, 3] } } }]);
});

it('complex object - leaves', () => {
  expect(
    filterJsonKeys(
      {
        user: {
          id: 760234,
          login_id: '760234_kakao',
          username: '친절한기쁜배',
          date_joined: '2023-02-17T18:13:57.288207',
          user_type: 'general',
          studentprofile: {
            id: 757029,
            notification: ['marketing', 'info'],
            charge_expiration_datetime: null,
            is_show_college: true,
            is_show_ability: true,
            is_first_level_exam_done: false,
          },
        },
      },
      'is_show_college',
    ),
  ).toEqual({
    user: {
      studentprofile: {
        is_show_college: true,
      },
    },
  });

  expect(
    filterJsonKeys(
      {
        objects: [
          {
            image: 'https://cdn.teamturing.com/mathking/20220413/pink_book.png',
            reward_point: 100,
            total_progress_count: 7,
            progress_count: 0,
            is_completed_today: false,
            name: 'correct_count',
            type: 'today',
          },
          {
            image: 'https://d1xjddmxoxitqf.cloudfront.net/20220413/card_book.png',
            reward_point: 100,
            total_progress_count: 3,
            progress_count: 0,
            is_completed_today: false,
            name: 'correct_count',
            type: 'today',
          },
        ],
      },
      (key) => /progress/.test(key),
    ),
  ).toEqual({
    objects: [
      { total_progress_count: 7, progress_count: 0 },
      { total_progress_count: 3, progress_count: 0 },
    ],
  });

  expect(
    filterJsonKeys(
      [
        {
          hint: {
            html: '',
          },
          submit_feedback: [{ a: 1 }, { b: 2 }],
          result_positive_feedback: {
            html: '',
          },
          result_negative_feedback: {
            html: '',
          },
        },
        { hello: [{ b: { c: [{ a: 1 }] } }, {}, [1, 2, 3]] },
      ],
      'a',
    ),
  ).toEqual([
    {
      submit_feedback: [{ a: 1 }],
    },
    { hello: [{ b: { c: [{ a: 1 }] } }] },
  ]);

  expect(
    filterJsonKeys(
      {
        expanded_unita_id: 72,
        checked_unitc_ids: [260, 259],
        objects: [
          {
            id: 68,
            is_recommended: false,
            is_expanded: false,
            is_premium: false,
            unit_b_list: [
              {
                id: 71,
                ability: '\ub2e4\uc18c \ubd80\uc871\ud568',
                name: '\ub3c4\ud615\uc758 \uae30\ucd08',
                is_recommended: false,
                unit_c_list: [
                  {
                    id: 213,
                    name: '\uc810, \uc120, \uba74',
                  },
                  {
                    id: 214,
                    name: '\uac01',
                  },
                  {
                    id: 215,
                    name: '\uc704\uce58 \uad00\uacc4',
                  },
                ],
              },
            ],
          },
          {
            id: 69,
            is_recommended: true,
            is_expanded: false,
            is_premium: false,
            unit_b_list: [
              {
                id: 75,
                is_recommended: true,
                unit_c_list: [
                  {
                    id: 227,
                    unit_d_list: 2,
                  },
                  {
                    id: 228,
                    ability: '\ub2e4\uc18c \ubd80\uc871\ud568',
                  },
                  {
                    id: 229,
                    unit_d_list: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
      'id',
    ),
  ).toEqual({
    objects: [
      {
        id: 68,
        unit_b_list: [{ id: 71, unit_c_list: [{ id: 213 }, { id: 214 }, { id: 215 }] }],
      },
      {
        id: 69,
        unit_b_list: [{ id: 75, unit_c_list: [{ id: 227 }, { id: 228 }, { id: 229 }] }],
      },
    ],
  });
});

it('complex object - some middle node', () => {
  expect(
    filterJsonKeys(
      [
        {
          hint: {
            html: '',
          },
          submit_feedback: [{ a: 1 }, { b: 2 }],
          result_positive_feedback: {
            html: '',
          },
          result_negative_feedback: {
            html: '',
          },
        },
        { hello: [{ b: { c: [{ a: 1 }] } }, {}, [1, 2, 3]] },
      ],
      'hello',
    ),
  ).toEqual([{ hello: [{ b: { c: [{ a: 1 }] } }, {}, [1, 2, 3]] }]);

  expect(
    filterJsonKeys(
      {
        expanded_unita_id: 72,
        checked_unitc_ids: [260, 259],
        objects: [
          {
            id: 68,
            is_recommended: false,
            is_expanded: false,
            is_premium: false,
            unit_b_list: [
              {
                id: 71,
                ability: '\ub2e4\uc18c \ubd80\uc871\ud568',
                name: '\ub3c4\ud615\uc758 \uae30\ucd08',
                is_recommended: false,
                unit_c_list: [
                  {
                    id: 213,
                    name: '\uc810, \uc120, \uba74',
                  },
                  {
                    id: 214,
                    name: '\uac01',
                  },
                  {
                    id: 215,
                    name: '\uc704\uce58 \uad00\uacc4',
                  },
                ],
              },
            ],
          },
          {
            id: 69,
            is_recommended: true,
            is_expanded: false,
            is_premium: false,
            unit_b_list: [
              {
                id: 75,
                is_recommended: true,
                unit_c_list: [
                  {
                    id: 227,
                    unit_d_list: 2,
                  },
                  {
                    id: 228,
                    ability: '\ub2e4\uc18c \ubd80\uc871\ud568',
                  },
                  {
                    id: 229,
                    unit_d_list: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
      'unit_c_list',
    ),
  ).toEqual({
    objects: [
      {
        unit_b_list: [
          {
            unit_c_list: [
              {
                id: 213,
                name: '\uc810, \uc120, \uba74',
              },
              {
                id: 214,
                name: '\uac01',
              },
              {
                id: 215,
                name: '\uc704\uce58 \uad00\uacc4',
              },
            ],
          },
        ],
      },
      {
        unit_b_list: [
          {
            unit_c_list: [
              {
                id: 227,
                unit_d_list: 2,
              },
              {
                id: 228,
                ability: '\ub2e4\uc18c \ubd80\uc871\ud568',
              },
              {
                id: 229,
                unit_d_list: 1,
              },
            ],
          },
        ],
      },
    ],
  });
});

it('complex array', () => {
  expect(filterJsonKeys([1, 2], 'a')).toEqual([]);
  expect(filterJsonKeys([{ c1: { c2: { c3: [1, 2, 3] } } }, 2], 'c1')).toEqual([{ c1: { c2: { c3: [1, 2, 3] } } }]);
});

it("root shouldn't be filtered", () => {
  expect(filterJsonKeys({ a: 1 }, 'b')).toEqual({});
});
