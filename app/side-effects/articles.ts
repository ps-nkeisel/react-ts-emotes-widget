import { flowRight, sum } from 'lodash';

import { getTextFromHTML, truncateString } from '@vuukle/utils';
import articleConfig from 'config/article.config';
import { articlesAPIs } from 'services/apis';
import { getPercentFromTotal } from 'utils';

/**
 * Get recommendations based on selected emote and format articles
 * @param emoteNum - emote number i.e 1|2|3|4|5|6
 */
export const getArticles = (emoteNum: Emotes.emoteNum): Promise<Articles.Article[]> =>
  articlesAPIs
    .get(emoteNum)
    .then((response) => parseArticles(response.data))
    .catch((err) => {
      /* istanbul ignore next */
      if (process.env.NODE_ENV === 'development') {
        // tslint:disable-next-line
        console.log('recommended articles loading error:', err);
      }
      return [];
    });

/**
 * @name parseArticles
 * @description filter not valid articles and assign mostVotedEmote to article
 * @param {Articles.Article[]} response - articles array
 */
function parseArticles(response: Articles.ServerArticle[]): Articles.Article[] {
  return filterArticles(response).map(
    flowRight(
      calculateMostVotedEmote,
      createArticleUri,
      createArticleExcerpt
    )
  );
}

/**
 * Create needed article url for article
 * @param article
 */
function createArticleUri(article: Articles.ServerArticle): Articles.ServerArticle {
  // TODO: remove once server issue fixed.
  let linkBase = articleConfig.link;
  if (articleConfig.link.match('www.') && article.uri.match('www.')) {
    linkBase = articleConfig.link.replace('www.', '');
  }

  article.uri = `${process.env.API_URL}/stats/External?source=emote_recommendations&url=${linkBase.replace(
    '[url]',
    article.uri
  )}`;
  return article;
}

/**
 * @name createTitleExcerpt
 * @param {string} title to truncate
 * @param {number} maxLength - max string length
 * @return {string} excerpt
 */
export const createTitleExcerpt = (title: string, maxLength: number) =>
  truncateString(getTextFromHTML(title), maxLength);

function createArticleExcerpt(article: Articles.ServerArticle) {
  return {
    ...article,
    excerpt: createTitleExcerpt(article.title, 120),
  };
}

/**
 * @name filterArticles
 * @description removes articles same as currently opened or articles with bad titles
 * @param articles - articles list to filter
 */
function filterArticles(articles: Articles.ServerArticle[]): Articles.ServerArticle[] {
  return articles.filter(
    (article) => typeof article.title === 'string' && article.title.length > 0 && article.articleId !== articleConfig.id
  );
}

/**
 * @name calculateMostVotedEmote
 * @description add most voted emote to article if it exists
 * @param {Articles.Article} article - article instance Object
 * @returns {Articles.Article}
 */
function calculateMostVotedEmote(article: Articles.ServerArticle): Articles.Article {
  if (!article.emotes) {
    return article;
  }
  const emotes = [
    article.emotes.first,
    article.emotes.second,
    article.emotes.third,
    article.emotes.fourth,
    article.emotes.fifth,
    article.emotes.sixth,
  ];
  const totalEmotes = sum(emotes);
  const mostVotedEmoteIndex = emotes.indexOf(Math.max(...emotes));

  if (totalEmotes <= 0) {
    return article;
  } else {
    return {
      ...article,
      mostVotedEmote: {
        key: (mostVotedEmoteIndex + 1) as Emotes.emoteNum,
        percent: getPercentFromTotal(emotes[mostVotedEmoteIndex], totalEmotes),
      },
    };
  }
}
