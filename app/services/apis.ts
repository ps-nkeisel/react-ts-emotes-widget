import { makeRequest } from '@vuukle/utils';
import articleConfig from 'config/article.config';
import { getToken } from './session';

/**
 * Grouped Emotes API requests.
 */
export const emotesAPIs = {
  /** Get emotes votes based on article id and domain */
  get: () =>
    makeRequest(
      'GET',
      `${process.env.API_URL}/api/v1/emote_ratings/getEmoteRatings`,
      {
        articleId: articleConfig.id,
        host: articleConfig.host,
        ver: process.env.VERSION || 'unknown',
      },
      undefined
    ),
  /**
   * Save emote vote on server
   * @param {number}  emote - emote number
   */
  post: (emote: Emotes.emoteNum) =>
    makeRequest(
      'POST',
      `${process.env.API_URL}/api/v1/emote_ratings`,
      {
        apiKey: articleConfig.apiKey,
        articleAvatar: articleConfig.img,
        articleId: articleConfig.id,
        emote,
        host: articleConfig.host,
        tag: articleConfig.tags,
        title: articleConfig.title,
        uri: articleConfig.url,
      },
      'application/json',
      getToken(),
      true
    ),
};

/**
 * Grouped Articles (recommended articles) APIs
 * get - get article based on selected emote
 */
export const articlesAPIs = {
  /**
   * Get recommendations based on selected emote
   * @param {number} emote - emote number/key based on we should receive articles/recommendations
   */
  get: (emote: Emotes.emoteNum) =>
    makeRequest(
      'GET',
      `${process.env.API_URL}/api/v1/emote_ratings/getEmotedArticlesByFilter`,
      {
        count: 6,
        emote,
        host: articleConfig.host,
        hours: 24,
      },
      undefined
    ),
};

export default {
  articlesAPIs,
  emotesAPIs,
};
