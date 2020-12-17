import { emoteNum } from '@vuukle/emote-image';

/**
 * Returns an array of emotes, should be 6 by default, and that's
 * also the max amount.
 */
export default function generateMockEmotes() {
  const emotes = [];
  const emote = (index: number) => ({
    key: index as emoteNum,
    name: 'some-name',
    percent: index * 10,
    votes: 10,
  });
  for (let i = 1; i <= 6; i++) {
    emotes.push(emote(i));
  }
  return emotes;
}
