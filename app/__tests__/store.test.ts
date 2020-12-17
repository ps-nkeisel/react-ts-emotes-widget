import store from 'store';

describe('Redux store', () => {
  it('should return a default store object', () => {
    expect(store.getState()).toBeDefined();
  });
});
