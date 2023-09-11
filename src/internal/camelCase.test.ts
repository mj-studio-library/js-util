import camelCase from './camelCase';

describe('convert strings to camelCase!', () => {
  it('snake_case to camelCase', () => {
    expect(camelCase('    snake_case      ')).toBe('snakeCase');
    expect(camelCase('       ______snake______case_____')).toBe('snakeCase');
    expect(camelCase('_s_n_a_k_e_       ')).toBe('sNAKE');
    expect(camelCase('_____________________   ')).toBe('');
    expect(camelCase('_________^^________mym0404 ')).toBe('^^Mym0404');
    expect(camelCase('get_challenge_by_int:challenge_id')).toBe('getChallengeByIntChallengeId');
    expect(camelCase('get_challenge_by_int-challenge_id')).toBe('getChallengeByIntChallengeId');
    expect(camelCase('get_1_point_my_point')).toBe('get1PointMyPoint');
  });
});
