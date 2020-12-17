import articleConfig from 'config/article.config';
import { getPercentFromTotal } from 'utils';

/**
 * @name getTotalVotesFromEmotesArr
 * @description calculate total votes from emotes array
 * @param {Emotes.EmotesArray} emotes
 * @returns {number} sum of all emote votes
 */
export const getTotalVotesFromEmotesArr = (emotes: Emotes.EmotesArray): number => {
  return emotes.reduce((sum, elm) => sum + elm.votes, 0);
};

export const getCompleteEmotes = (emotes: Emotes.KeyValue): Emotes.ParsedEmote[] => {
  const parsedEmotes = removeDisabledEmotes(emotesToArray(emotes));
  const totalVotes = getTotalVotesFromEmotesArr(parsedEmotes);

  return parsedEmotes.map((emoteElem) => ({
    ...emoteElem,
    img: articleConfig.images[emoteElem.key],
    name: articleConfig.names[emoteElem.key],
    percent: getPercentFromTotal(emoteElem.votes, totalVotes),
  }));
};

/**
 * @name findMostVotedEmoteKey
 * @description get key of most voted emote inside emotes object
 * @returns {Emotes.emoteNum}
 */
export const findMostVotedEmoteKey = (emotes: Emotes.ParsedEmote[]): Emotes.emoteNum | undefined => {
  const mostVotedEmote = emotes.reduce((a, b) => (a.votes > b.votes ? a : b));
  return mostVotedEmote.votes > 0 ? (mostVotedEmote.key as Emotes.emoteNum) : undefined;
};

/**
 * @name updateEmotesWithVote
 * @description
 * @param {Array} emotes - emotes array to update
 * @param {number} votedKey - emotes number to add votes to
 * @return {Array} Emotes array with updated votes and percentage
 */
export const updateEmotesWithVote = (emotes: Emotes.ParsedEmote[], votedKey: Emotes.emoteNum): Emotes.ParsedEmote[] => {
  const totalVotes = getTotalVotesFromEmotesArr(emotes) + 1;
  return emotes.map((item) => {
    if (item.key === votedKey) {
      item.votes += 1;
    }
    // Update percentage
    item.percent = getPercentFromTotal(item.votes, totalVotes || 0);
    return item;
  });
};

// ==============================
// HELPERS
// ==============================
/**
 * @name emotesToArray
 * @description Convert Emotes object (from server response) to Array
 * @param {Emotes.KeyValue} emotes - emotes object from response i.e. {first: 1, second: 2, ...}
 * @returns {Emotes.EmotesArray} - emotes converted to array [{key: first, votes: 1}, ...]
 */
function emotesToArray(emotes: Emotes.KeyValue): Emotes.EmotesArray {
  return Object.values(emotes).map((emoteVotes, idx) => ({
    key: (idx + 1) as Emotes.emoteNum,
    votes: emoteVotes,
  }));
}

/**
 * @name removeDisabledEmotes
 * @description remove emotes if indexes exist inside config in disable prop.
 * @param {Emotes.EmotesArray} emotes
 * @returns removed emotes if indexes exist in `disable` prop otherwise same array
 */
function removeDisabledEmotes(emotes: Emotes.EmotesArray): Emotes.EmotesArray {
  // Remove emotes if publisher disabled them inside config
  if (articleConfig.disable.length > 0) {
    return emotes.filter((value, idx) => articleConfig.disable.indexOf(idx + 1) === -1);
  }
  return emotes;
}
