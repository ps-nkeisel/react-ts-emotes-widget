// tslint:disable:object-literal-sort-keys
/**
 * Generate an array of articles used for mocking purposes.
 */
export default function generateMockArticles(): Articles.ServerArticle[] {
  const articles: Articles.ServerArticle[] = [];
  const article = (id: number): Articles.ServerArticle => ({
    host: 'http://some-host.com',
    uri: 'http://some-uri.com',
    articleId: id,
    title: 'Some Title',
    articleAvatar: 'http://article-url.com',
    tag: 'some,tag',
    apiKey: 'api-key',
    commentCount: 200,
    likeCount: 100,
    emotes: {
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5,
      sixth: 6,
    },
  });
  for (let i = 0; i < 10; i++) {
    articles.push(article(i));
  }
  return articles;
}
