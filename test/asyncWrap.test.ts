import { asyncWrap } from '../src';

const asyncTestWithResult = async () => {
  return 'working';
};
const asyncTestWithoutResult = async () => {
  throw new Error('Not working!');
};

describe('Working?', () => {
  it('Test with result', async () => {
    const [err, result] = await asyncWrap(asyncTestWithResult());
    expect(result).toEqual('working');
    expect(err).toEqual(null);
  });
  it('Test without result', async () => {
    const [err, result] = await asyncWrap(asyncTestWithoutResult());
    expect(result).toEqual(null);
    expect(err).toEqual(Error('Not working!'));
  });
});
