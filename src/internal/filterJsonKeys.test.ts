import filterJsonKeys from './filterJsonKeys';

it('simple object', () => {
  expect(filterJsonKeys({ a: 1, b: 1 }, 'a')).toStrictEqual({ a: 1 });
  expect(filterJsonKeys({ a: 1, b: 1, ab: 1 }, (key) => key.startsWith('a'))).toStrictEqual({
    a: 1,
    ab: 1,
  });

  expect(
    filterJsonKeys(
      { android: '2.15.23', ios: '2.15.23', title: '', body: '', able_to_use: true },
      'body',
    ),
  ).toStrictEqual({
    body: '',
  });
});

it('simple array', () => {
  expect(filterJsonKeys([1, 2], 'a')).toStrictEqual([]);
  expect(filterJsonKeys([{ c1: { c2: { c3: [1, 2, 3] } } }, 2], 'c1')).toStrictEqual([
    { c1: { c2: { c3: [1, 2, 3] } } },
  ]);
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
  ).toStrictEqual({
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
  ).toStrictEqual({
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
  ).toStrictEqual([
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
  ).toStrictEqual({
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

  expect(
    filterJsonKeys(
      {
        objects: [
          {
            id: 277,
            video_url:
              'https://player.vimeo.com/external/648436267.m3u8?s=7cec9fa6c596ce4554d0b7ab4525bf76215df74e&oauth2_token_id=1439194779',
            thumbnail_url: 'https://d1jg73mbjyh6rn.cloudfront.net/clip_videos/277.jpg',
            duration_seconds: 1197,
            orientation: 'horizontal',
            subtitle:
              '\uc720\ud55c\uc18c\uc218, \ubb34\ud55c\uc18c\uc218, \uc21c\ud658\uc18c\uc218',
            unit_a_id: 69,
            unit_b_id: 75,
            unit_c_id: 227,
            unit_a_name: '\uc911\ud559\uc218\ud5592-1',
            unit_b_name: '\uc720\ub9ac\uc218\uc640 \uc21c\ud658\uc18c\uc218',
            unit_c_name: '\uc21c\ud658\uc18c\uc218',
            teacher: {
              name: '\uc8fc\ub4dc',
              thumbnail_url: 'https://cdn.teamturing.com/mathking/teacher_thumbnails/teacher_2.png',
              description:
                '\ub300\uce58\ub3d9 \uc218\ud559 \uac15\uc0ac, \ud575\uc2ec\ub9cc\uc744 \uc804\ub2ec\ud558\ub294 \uafc0\uac15',
            },
            anchors: [
              { duration_seconds: 45, name: '\uc720\ub9ac\uc218' },
              { duration_seconds: 280, name: '\uc720\ud55c\uc18c\uc218, \ubb34\ud55c\uc18c\uc218' },
              { duration_seconds: 459, name: '\uc21c\ud658\uc18c\uc218' },
              {
                duration_seconds: 935,
                name: 'Part 1. \uc720\ud55c\uc18c\uc218, \ubb34\ud55c\uc18c\uc218, \uc21c\ud658\uc18c\uc218 \ud544\uc218 \uc608\uc81c \ud480\uc774',
              },
            ],
            tag: '\uac1c\ub150\uae30\ucd08',
            video: {
              id: 277,
              video_url:
                'https://player.vimeo.com/external/648436267.m3u8?s=7cec9fa6c596ce4554d0b7ab4525bf76215df74e&oauth2_token_id=1439194779',
              thumbnail_url: 'https://d1jg73mbjyh6rn.cloudfront.net/clip_videos/277.jpg',
              duration_seconds: 1197,
              orientation: 'horizontal',
              title: '\uc720\ud55c\uc18c\uc218, \ubb34\ud55c\uc18c\uc218, \uc21c\ud658\uc18c\uc218',
              teacher: {
                name: '\uc8fc\ub4dc',
                thumbnail_url:
                  'https://cdn.teamturing.com/mathking/teacher_thumbnails/teacher_2.png',
                description:
                  '\ub300\uce58\ub3d9 \uc218\ud559 \uac15\uc0ac, \ud575\uc2ec\ub9cc\uc744 \uc804\ub2ec\ud558\ub294 \uafc0\uac15',
              },
              is_available_for_free_user: true,
              video_type: 'unit_video',
            },
          },
        ],
      },
      'id',
    ),
  ).toStrictEqual({
    objects: [
      {
        id: 277,
        video: {
          id: 277,
        },
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
  ).toStrictEqual([{ hello: [{ b: { c: [{ a: 1 }] } }, {}, [1, 2, 3]] }]);

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
  ).toStrictEqual({
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
  expect(filterJsonKeys([1, 2], 'a')).toStrictEqual([]);
  expect(filterJsonKeys([{ c1: { c2: { c3: [1, 2, 3] } } }, 2], 'c1')).toStrictEqual([
    { c1: { c2: { c3: [1, 2, 3] } } },
  ]);
});

it("root shouldn't be filtered", () => {
  expect(filterJsonKeys({ a: 1 }, 'b')).toStrictEqual({});
});
