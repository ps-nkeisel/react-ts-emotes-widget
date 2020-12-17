import * as Cookies from 'js-cookie';

import articleConfig from 'config/article.config';
import { emotesAPIs } from 'services/apis';
import { getCompleteEmotes } from 'utils/emotes';

import { isSameSiteNoneIncompatible } from '@vuukle/utils';

export const getEmotes = (): Promise<Emotes.ParsedEmote[]> =>
  emotesAPIs
    .get()
    .then((response) => {
      return getCompleteEmotes(response.data);
    })
    .catch((error) => {
      /* istanbul ignore next */
      if (process.env.NODE_ENV === 'development') {
        // tslint:disable-next-line
        console.error('Emotes loading error:', error);
      }
      return [];
    });

/**
 * @name getVotedEmote
 * @description Get voted emote from the cookie to show that user already voted
 * @returns {number | undefined} - If emote found returns emote number if not then `undefined`
 */
export const getVotedEmote = (): Emotes.emoteNum | undefined => {
  const votedEmoteNumb = parseInt(Cookies.get(`${articleConfig.host}&${articleConfig.id}`) || '', 10);
  if (votedEmoteNumb >= 1 && votedEmoteNumb <= 6) {
    return votedEmoteNumb as Emotes.emoteNum;
  }
  return;
};

/**
 * Save Emote vote into cookies to read later and post voted emote to the server
 * @param {number} emoteNumber - emote number to save from 1 to 6
 * @returns {Promise} emotes APIs post response
 */
export const setEmote = (emoteNumber: Emotes.emoteNum): Promise<any> => {
  // Save voted emote to cookies so we will know that user voted
  const options: Cookies.CookieAttributes = isSameSiteNoneIncompatible()
    ? { expires: 60 }
    : {
        expires: 60,
        sameSite: 'none',
        secure: true,
      };
  Cookies.set(`${articleConfig.host}&${articleConfig.id}`, emoteNumber.toString(), options);
  return emotesAPIs.post(emoteNumber);
};
