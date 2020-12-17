import { TranslationProvider } from 'contexts/TranslationContext';
import { mount } from 'enzyme';
import * as React from 'react';
import generateMockEmotes from 'side-effects/__mocks__/generateMockEmotes';
import EmotesWrapper from '../EmotesWrapper';

describe('EmotesWrapper component', () => {
  it('should render emotes', () => {
    const emotes = generateMockEmotes();
    const props = {
      emotes,
      onSelect: jest.fn(),
    };
    const container = mount(
      <TranslationProvider>
        <EmotesWrapper {...props} />
      </TranslationProvider>
    );
    const emoteButtons = container.find('button.emote');
    // By default, unless the publisher has provided there are less,
    // there should be 6 emotes.
    expect(emoteButtons.length).toBe(6);
    // Assert that `onSelect` was called when the user clicks the button.
    emoteButtons.at(1).simulate('click');
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.onSelect).toHaveBeenCalledWith(props.emotes[1].key);
  });
});
