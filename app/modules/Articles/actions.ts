import IStore from 'redux-zero/interfaces/Store';
import { getArticles } from 'side-effects/articles';

export default (store: IStore) => ({
  loadArticles: async (state: Store.State) => {
    const selectedEmoteKey = state.emotes.selectedKey;

    if (!selectedEmoteKey) {
      return {};
    }

    store.setState({
      articles: {
        ...state.articles,
        items: [],
        loading: true,
      },
    });

    try {
      const articles = await getArticles(selectedEmoteKey);
      return {
        articles: {
          ...state.articles,
          items: articles,
          loading: false,
        },
      };
    } catch (e) {
      return { articles: { loading: false, items: [] } };
    }
  },
});
