import { emoteNum } from '@vuukle/emote-image';
import createStore from 'redux-zero';
import generateMockArticles from 'side-effects/__mocks__/generateMockArticles';
import generateMockEmotes from 'side-effects/__mocks__/generateMockEmotes';

const initialState = createStore({
  articles: {
    items: generateMockArticles(),
    loading: false,
  },
  emotes: {
    emoteNum: 1,
    items: generateMockEmotes(),
    loading: false,
    mostVotedKey: 1 as emoteNum,
    selectedKey: 1 as emoteNum,
    totalVotes: 100,
    votedKey: 1 as emoteNum,
  },
});

export default initialState;
