import { makeDevLog } from '@vuukle/utils';
import { getVotedEmote } from 'side-effects/emotes';
import { findMostVotedEmoteKey, getCompleteEmotes, getTotalVotesFromEmotesArr } from 'utils/emotes';

import IStore from 'redux-zero/interfaces/Store';

import store from '../store';

declare var Porthole: any;

interface IWindowProxy {
  addEventListener: (callback: (event: any) => void) => void;
  post: (data: object) => void;
}

class Communication {
  /** Global Porthole proxy used to send and receive events. */
  // TODO: should this be static? i.e. does this get recreated every
  // time it is instantiated.
  private static initialized: boolean = false;

  public static windowProxy: IWindowProxy =
    process.env.NODE_ENV !== 'test'
      ? new Porthole.WindowProxy(window.location.href)
      : // Generate different object signature for test environments.
        { addEventListener: () => null, post: (data: any) => makeDevLog(data, 'log') };

  /**
   * @name postMostVotedEmote
   * @description sync most voted emote with other widgets
   * @param {object} mostVotedEmote
   */
  public static postMostVotedEmote = (mostVotedEmote: Emotes.ParsedEmote | {} = {}): void => {
    Communication.windowProxy.post({ syncWidget: { mostVotedEmote } });
  };

  /** Initialize Porthole event listener */
  public static init = () => {
    if (Communication.initialized) {
      makeDevLog('error', 'Communication has been initialized already.');
    } else {
      Communication.initialized = true;
    }

    /** ⚠ Attach event listener to receive messages about any changes from other widgets */
    Communication.windowProxy.addEventListener(Communication.listener);

    /** Attach windowProxy to window object in dev mode so it's possible to mock messages */
    if (process.env.NODE_ENV === 'development') {
      (window as any).windowProxy = Communication.windowProxy;
    }
  };

  /** Listens to Porthole events */
  public static listener = (event: any) => {
    if (event.data.emoteData) {
      const completeEmotes = getCompleteEmotes(event.data.emoteData);
      const mostVotedKey = findMostVotedEmoteKey(completeEmotes);

      /** Sync most voted emote with other widgets */
      Communication.postMostVotedEmote(
        typeof mostVotedKey === 'number'
          ? completeEmotes.find((emote: Emotes.ParsedEmote) => emote.key === mostVotedKey)
          : {}
      );

      (store as IStore).setState({
        ...store.getState(),
        emotes: {
          items: completeEmotes,
          loading: false,
          mostVotedKey,
          totalVotes: getTotalVotesFromEmotesArr(completeEmotes),
          votedKey: getVotedEmote(),
        },
      });
    }
  };
}

export default Communication;
