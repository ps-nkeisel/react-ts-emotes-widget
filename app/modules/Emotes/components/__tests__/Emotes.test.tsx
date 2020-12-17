import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'redux-zero/react';
import generateMockEmotes from 'side-effects/__mocks__/generateMockEmotes';
import store from 'store';
import Emotes from '../Emotes';

describe('Emotes component', () => {
  it('should render based on the data fetch', () => {
    const loadEmotes = jest.fn(() => {
      // Enforce any because default value is undefined.
      store.setState((state): any => ({
        ...state,
        emotes: {
          ...state.emotes,
          loading: false,
        },
      }));
    });
    // Mock the actions that are called inside of emotes.
    jest.mock('side-effects/emotes', () => ({
      getEmotes: jest.fn().mockImplementation(() => generateMockEmotes()),
      getVotedEmote: jest.fn(),
    }));
    // Render the container with a default store.
    const container = mount(
      <Provider store={store}>
        <Emotes loadEmotes={loadEmotes} />
      </Provider>
    );
    // Assert that loadEmotes was called on mount
    expect(loadEmotes).toHaveBeenCalled();
    // Asser that the header is being called.
    expect(container.find('header')).not.toBeNull();
    // Assert that emotes-wrapper is being rendered.
    const emotesWrapper = container.find(`.emotes-wrapper--${store.getState().emotes.items.length}`);
    expect(emotesWrapper).not.toBeNull();
  });
});
