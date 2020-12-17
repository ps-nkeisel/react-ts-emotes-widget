import * as Cookies from 'js-cookie';
import { emotesAPIs } from 'services/apis';
import generateMockEmotes from 'side-effects/__mocks__/generateMockEmotes';
import { getEmotes, getVotedEmote, setEmote } from '../emotes';
jest.mock('services/apis', () => ({
  emotesAPIs: {
    // Keep async on this function in order to maintain a promise chain.
    get: jest
      .fn()
      .mockImplementationOnce(async () => ({
        data: generateMockEmotes(),
      }))
      .mockImplementationOnce(async () => {
        throw new Error();
      }),
    // Mock post for setEmote caller function
    post: jest.fn(),
  },
}));
jest.mock('js-cookie', () => ({
  get: () => '1',
  set: jest.fn(),
}));

describe('emotes side-effects', () => {
  it('getEmotes returns parsed emotes', async () => {
    const response = await getEmotes();
    expect(response.length).toBeGreaterThan(0);
  });

  it('getEmotes returns an empty array if it catches an error', async () => {
    expect(await getEmotes()).toEqual([]);
  });

  it('getVotedEmote returns the emote the user voted for when valid cookie', () => {
    expect(getVotedEmote()).toBe(1);
  });

  it('setEmote sets cookie and posts to server', () => {
    setEmote(1);
    // Assert that Cookies.set was called.
    expect(Cookies.set).toHaveBeenCalled();
    // Assert that emotesAPIs.post was called.
    expect(emotesAPIs.post).toHaveBeenCalled();
  });
});
