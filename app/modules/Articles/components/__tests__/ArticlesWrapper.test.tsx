import { TranslationProvider } from 'contexts/TranslationContext';
import { mount } from 'enzyme';
import * as React from 'react';
import ArticlesWrapper from '../ArticlesWrapper';

/**
 * Used to return an array of articles for passing as props,
 * while generating "unique" ids for every article.
 */
function getArticlesList() {
  const articles = [];
  const article = (index: number) => ({
    articleAvatar: '',
    articleId: index,
    commentCount: 10,
    host: 'mock-host',
    title: 'some-title',
    uri: 'http://mock-uri.com',
  });
  for (let i = 0; i < 6; i++) {
    articles.push(article(i));
  }
  return articles;
}

describe('Articles component', () => {
  it('should render articles', () => {
    const props = {
      articles: getArticlesList(),
      customCardStyles: {},
      loading: false,
    };
    const container = mount(
      <TranslationProvider>
        <ArticlesWrapper {...props} />
      </TranslationProvider>
    );
    const articlesContainer = container.find('.articles');
    expect(articlesContainer.children().length).toBe(props.articles.length);
  });
});
