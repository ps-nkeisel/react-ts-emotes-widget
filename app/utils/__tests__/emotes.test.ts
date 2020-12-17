import generateMockEmotes from 'side-effects/__mocks__/generateMockEmotes';
import { findMostVotedEmoteKey, getCompleteEmotes, getTotalVotesFromEmotesArr, updateEmotesWithVote } from '../emotes';
import { getPercentFromTotal } from '../index';

it('getTotalVotesFromEmotesArr should return total number of votes across emotes', () => {
  // generateMockEmotes returns 6 items with 10 votes each
  expect(getTotalVotesFromEmotesArr(generateMockEmotes())).toBe(60);
});

it('findMostVotedEmoteKey should return the most voted emote', () => {
  // Generate emotes with 10 votes each
  const emotes = generateMockEmotes();
  // Assign 20 votes to the first emote
  emotes[0].votes = 20;
  // Assert that the first emote is the most voted for
  expect(findMostVotedEmoteKey(emotes)).toBe(1);
  // Assign 40 more votes to the fourth emote
  emotes[3].votes = 50;
  // Assert that the fourth emote is the most voted for
  expect(findMostVotedEmoteKey(emotes)).toBe(4);
});

it('updateEmotesWithVote should update the amount of votes and percentage for the given emote', () => {
  const emotes = generateMockEmotes();
  // Update votes for the second emote (it mutates the array as well as returning it)
  updateEmotesWithVote(emotes, 2);
  // Assert that the emotes array is different from the default one (the reference value has changed)
  expect(emotes).not.toEqual(generateMockEmotes());
  // Assert that the values are correct for the updated emote
  expect(emotes[1].votes).toBe(11);
  expect(emotes[1].percent).toBe(getPercentFromTotal(11, getTotalVotesFromEmotesArr(emotes)));
});

it('getCompleteEmotes', () => {
  const emotes = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6 };
  const parsedEmotes = getCompleteEmotes(emotes);
  // Assert that 6 elements are returned.
  expect(parsedEmotes.length).toBe(6);
  // Assert that every element has a percentage.
  parsedEmotes.forEach((emote) => {
    expect(typeof emote.percent).toBe('number');
    expect(emote.percent).toBeGreaterThanOrEqual(0);
  });
});
