declare namespace Store {
  interface EmotesState {
    loading: boolean;
    votedKey: Emotes.emoteNum;
    selectedKey: Emotes.emoteNum;
    mostVotedKey: Emotes.emoteNum;
    totalVotes: number;
    items: Emotes.ParsedEmote[];
  }

  interface ArticlesState {
    loading: boolean;
    items: Articles.Article[];
  }

  interface State {
    emotes: EmotesState;
    articles: ArticlesState;
  }
}
