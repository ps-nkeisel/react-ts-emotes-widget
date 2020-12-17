import '../polyfills';
import 'url-search-params-polyfill';

import { stringToArray } from '@vuukle/utils';

// ⚠️ NOTE: 'Article' word used later means article under which widget is loaded.
interface IConfig {
  // 🔽 MAIN Configuration 🔽
  /** [REQUIRED] Unique article ID */
  id: string | null;
  /** [REQUIRED] Site domain where Article exists */
  host: string | null;
  /** [REQUIRED] Article URL */
  url: string | null;
  /** [REQUIRED] Domain/Site/Account API key */
  apiKey: string | null;
  /** [REQUIRED] Article Title */
  title: string | null;
  /** Article Image */
  img: string | null;
  /** Article tags */
  tags: string | null;
  /** Article Link builder */
  link: string;

  // 🔽 SECONDARY Configuration 🔽
  /**
   * We have section to load recommended articles in our widgets.
   * By default we show articles only from domain widget is currently opened.
   * If `true` then articles will be shown account based and not domain based
   */
  globalRecommendations: boolean;
  /** Widget is opened on AMP article */
  amp: boolean;
  /** Open Recommendations in the same tab */
  openInSameTab: boolean;
  theme: {
    /** Determines if widget is loaded on dark theme */
    darkMode: boolean;
    /** Primary widget color */
    color: string | null;
    /** Custom font-family */
    font: string | null;
    cardStyles?: any | null;
    badgeStyles?: any | null;
    totWideImg: boolean;
  };

  // 🔽 EMOTES Configuration 🔽
  iconsSize: number;
  /** Custom emote names */
  names: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
  };
  /** Custom Emotes images */
  images: {
    1: string | null;
    2: string | null;
    3: string | null;
    4: string | null;
    5: string | null;
    6: string | null;
  };
  /** Publishers can disable emotes. For example to disable first and fourth emote publisher will set: [1,4] */
  disable: number[];
  /** Hide recommended articles */
  hideArticles: boolean;
  /** Hide all emote labels */
  hideAllLabels: boolean;
  /** Indicates if comments widget is on the page or not. Hide branding from the widget if comments is enabled */
  commentsEnabled: boolean;
}

const searchParams = new URLSearchParams(window.location.search);

/* tslint:disable:object-literal-sort-keys */
const config: IConfig = {
  id: searchParams.get('articleId'),
  host: searchParams.get('host'),
  url: searchParams.get('url'),
  apiKey: searchParams.get('apiKey'),
  title: searchParams.get('title'),
  img: searchParams.get('img'),
  tags: searchParams.get('tags'),

  amp: searchParams.get('amp') === 'true',
  globalRecommendations: searchParams.get('gr') === 'true',
  openInSameTab: searchParams.get('openInSameTab') === 'true',

  theme: {
    darkMode: searchParams.get('darkMode') === 'true',
    color: searchParams.get('color'),
    font: searchParams.get('font'),
    totWideImg: searchParams.get('totWideImg') === 'true',
  },

  iconsSize: (() => {
    const iconsSize = searchParams.get('iconsSize') || '80';
    return parseInt(iconsSize, 10) || 80;
  })(),

  names: {
    1: searchParams.get('first') || 'Happy',
    2: searchParams.get('second') || 'Unmoved',
    3: searchParams.get('third') || 'Amused',
    4: searchParams.get('fourth') || 'Excited',
    5: searchParams.get('fifth') || 'Angry',
    6: searchParams.get('sixth') || 'Sad',
  },
  images: {
    1: searchParams.get('firstImg'),
    2: searchParams.get('secondImg'),
    3: searchParams.get('thirdImg'),
    4: searchParams.get('fourthImg'),
    5: searchParams.get('fifthImg'),
    6: searchParams.get('sixthImg'),
  },
  disable: stringToArray(searchParams.get('disable')),
  hideArticles: searchParams.get('hideArticles') === 'true',
  hideAllLabels: searchParams.get('hideAllLabels') === 'true',
  link: searchParams.get('link') || `http://[url]`,
  commentsEnabled: searchParams.get('commentsEnabled') === 'true',
};

if ((window as any).VUUKLE_CONFIG) {
  config.theme.cardStyles =
    (window as any).VUUKLE_CONFIG &&
    (window as any).VUUKLE_CONFIG.theme &&
    (window as any).VUUKLE_CONFIG.theme.cardStyles;
  config.theme.badgeStyles =
    (window as any).VUUKLE_CONFIG &&
    (window as any).VUUKLE_CONFIG.theme &&
    (window as any).VUUKLE_CONFIG.theme.badgeStyles;
}

/* istanbul ignore next */

/** Set default values for Development mode, so we will not need to pass params to URL */
if (process.env.NODE_ENV === 'development') {
  if (!config.id) {
    config.id = '1906';
  }
  if (!config.host) {
    config.host = 'blog.vuukle.com';
  }
  if (!config.url) {
    config.url = 'https://blog.vuukle.com/vuukle-goes-live-on-nextbigfuture-com/';
  }
  if (!config.apiKey) {
    config.apiKey = 'ead41e46-a5fd-11e2-bc97-bc764e0492cc';
  }
  if (!config.title) {
    config.title = 'Vuukle Audience Platform goes Live on NextBigFuture.com';
  }
}

export default config;
