import mockStore from '__mocks__/mockStore';
import generateMockArticles from 'side-effects/__mocks__/generateMockArticles';
import { getArticles } from 'side-effects/articles';
import actions from '../actions';
jest.mock('side-effects/articles', () => ({
  getArticles: jest.fn(() => generateMockArticles()),
}));

describe('Articles actions', () => {
  it('loadArticles should load articles', () => {
    // Mock store.setState.
    mockStore.setState = jest.fn();
    // Call loadArticles.
    actions(mockStore).loadArticles(mockStore.getState());
    // Assert that getEmotes was called.
    expect(getArticles).toHaveBeenCalled();
    // Assert that setState was called two times.
    expect(mockStore.setState).toHaveBeenCalled();
  });
});
