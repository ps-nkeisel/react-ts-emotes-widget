import { emoteNum } from '@vuukle/emote-image';
import * as vuukleUtils from '@vuukle/utils';
import generateMockArticles from 'side-effects/__mocks__/generateMockArticles';
import { createTitleExcerpt, getArticles } from '../articles';
jest.mock('services/apis', () => ({
  articlesAPIs: {
    // Keep async on this function in order to maintain a promise chain.
    get: jest
      .fn()
      .mockImplementationOnce(async (emote: emoteNum) => ({
        data: generateMockArticles(),
      }))
      .mockImplementationOnce(async () => {
        throw new Error();
      }),
  },
}));

(vuukleUtils as any).getTextFromHTML = jest.fn((HTMLString: string): string => {
  const para = document.createElement('p');
  para.innerHTML = HTMLString;
  return (para.textContent && para.textContent.trim()) || '';
});

describe('articles side-effects', () => {
  it('getArticles should return a list of articles', async () => {
    const response = await getArticles(1);
    // Assert that response works.
    expect(response.length).toBeGreaterThan(0);
    // Assert that catch will return empty array.
    const newResponse = await getArticles(2);
    expect(newResponse).toEqual([]);
  });

  it('createTitleExcerpt returns an excerpt', () => {
    const title = 'a'.repeat(150);
    // Assert that it returns an excerpt with ...
    expect(createTitleExcerpt(title, 120)).toBe(title.slice(0, 120) + '...');
    // Assert that it will remove exceeding 120 characters
    const word = 'word '.repeat(40);
    expect(createTitleExcerpt(word, 120)).toBe(word.slice(0, 120).trim());
  });
});
