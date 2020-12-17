// import mockStore from '__mocks__/mockStore';
import generateMockEmotes from 'side-effects/__mocks__/generateMockEmotes';
// import { getEmotes } from 'side-effects/emotes';
// import actions from '../actions';
jest.mock('side-effects/emotes', () => ({
  getEmotes: jest.fn(() => generateMockEmotes()),
}));

// Temporarily disabled unit test

describe('Emotes actions', () => {
  it('loadEmotes fetches data', () => {
    // // Mock store.setState.
    // mockStore.setState = jest.fn();
    // // Call loadEmotes.
    // actions(mockStore).loadEmotes(mockStore.getState());
    // // Assert that getEmotes was called.
    // expect(getEmotes).toHaveBeenCalled();
    // // Assert that setState was called two times.
    // expect(mockStore.setState).toHaveBeenCalled();
  });
});
