/**
 * @description Common used types/interfaces for emotes
 */
declare namespace Emotes {
  type keys = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth';
  type emoteNum = 1 | 2 | 3 | 4 | 5 | 6;

  type KeyValue = {
    [key in keys]: number;
  };

  interface Emote {
    key: emoteNum;
    votes: number;
  }

  type EmotesArray = Emote[];

  interface ParsedEmote {
    key: emoteNum;
    votes: number;
    percent: number;
    name: string;
  }
}
