import IStore from 'redux-zero/interfaces/Store';
import Communication from 'services/Communication';
import { getEmotes, setEmote } from 'side-effects/emotes';
import { findMostVotedEmoteKey, getTotalVotesFromEmotesArr, updateEmotesWithVote } from 'utils/emotes';

export default (store: IStore) => ({
  loadEmotes: async (state: Store.State) => {
    store.setState({ emotes: { ...state.emotes, loading: true } });

    try {
      const emotes = await getEmotes();
      const mostVotedKey = findMostVotedEmoteKey(emotes);

      /** Sync most voted emote with other widgets */
      Communication.postMostVotedEmote(
        typeof mostVotedKey === 'number' ? emotes.find((emote: Emotes.ParsedEmote) => emote.key === mostVotedKey) : {}
      );

      store.setState({
        emotes: {
          ...state.emotes,
          items: emotes,
          loading: false,
          mostVotedKey,
          totalVotes: getTotalVotesFromEmotesArr(emotes),
        },
      });
    } catch (e) {
      store.setState({
        emotes: { ...state.emotes, loading: false },
      });
    }
  },
  selectEmote: (state: Store.State, key: Emotes.emoteNum) => {
    // Save vote if user didn't vote or toggle selected emote
    if (!state.emotes.votedKey) {
      setEmote(key); // post to server
      const totalVotes = state.emotes.totalVotes + 1;
      const emotes = updateEmotesWithVote(state.emotes.items, key);
      const mostVotedKey = findMostVotedEmoteKey(emotes);

      /** Sync most voted emote with other widgets */
      Communication.postMostVotedEmote(
        typeof mostVotedKey === 'number' ? emotes.find((emote) => emote.key === mostVotedKey) : {}
      );

      return {
        emotes: {
          ...state.emotes,
          mostVotedKey,
          selectedKey: key,
          totalVotes,
          votedKey: key,
        },
      };
    } else {
      return {
        emotes: { ...state.emotes, selectedKey: key },
      };
    }
  },
});
