/**
 * @file Store of the Emotes widget
 */
import createStore from 'redux-zero';
import { getVotedEmote } from 'side-effects/emotes';

const votedEmoteCookie = getVotedEmote();

const initialState = createStore({
  /** After user selection of a reaction we load more articles to check */
  articles: {
    /** Articles list */
    items: [],
    /** Loading state */
    loading: null,
  },
  /** Main Emotes store */
  emotes: {
    /** Emote items */
    items: [],
    /** Emotes loading or not */
    loading: undefined,
    /** Most voted emote key. Used to highlight most voted emote */
    mostVotedKey: undefined,
    /**
     * Selected emote. User can select another emote after the vote but it's saving inside this property instead of changing `votedKey`.
     * This allows user to check recommended articles under another emotes but doesn't allow to check the vote.
     */
    selectedKey: votedEmoteCookie,
    /** Total emotes votes */
    totalVotes: 0,
    /** User voted emote */
    votedKey: votedEmoteCookie,
  },
});

export default initialState;
