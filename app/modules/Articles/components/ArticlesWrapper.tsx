import * as React from 'react';
import styled from 'styled-components';

import Card from '@vuukle/card';
import EmoteBadge from '@vuukle/emote-badge';
import Loader from '@vuukle/loader';
import Tag from '@vuukle/tag';
import articleConfig from 'config/article.config';
import { withTranslation } from 'contexts/TranslationContext';

interface IProps {
  articles: Articles.Article[];
  customCardStyles: {
    [key: string]: any;
  };
  loading: boolean;
  className?: string;
}

const ArticlesWrapper = withTranslation<IProps>(
  ({ articles, loading, className, customCardStyles, translation, ...props }) => {
    if (!loading && articles.length <= 0) {
      return <p className={className}>{translation.noRecommendations}</p>;
    }

    return (
      <div className={className} {...props}>
        {loading && <Loader size="20px" />}

        {!loading && <h2>{translation.suggestionsHeader}</h2>}

        {!loading && (
          <div className="articles">
            {articles.map((article: Articles.Article) => (
              <Card
                key={article.articleId}
                heading={article.excerpt || article.title}
                img={article.articleAvatar}
                link={article.uri}
                linkRel="noopener nofollow"
                linkTarget={!articleConfig.openInSameTab ? '_blank' : '_top'}
                customStyles={customCardStyles}
                mode={articleConfig.theme.totWideImg ? 'vertical' : 'horizontal'}
                className="article"
              >
                {article.commentCount > 0 && (
                  <Tag style={{ marginRight: '5px' }}>
                    {article.commentCount} {translation.comments /* Comments */}
                  </Tag>
                )}
                {article.mostVotedEmote && (
                  <EmoteBadge
                    emoteKey={article.mostVotedEmote.key}
                    customConfig={{
                      img: articleConfig.images,
                      name: articleConfig.names,
                    }}
                  >
                    {article.mostVotedEmote.percent}%
                  </EmoteBadge>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }
);

const StyledArticleWrapper = styled(ArticlesWrapper)<IProps>`
  ${(props) => !props.loading && props.articles.length <= 0 && `text-align: center;`};
  > h2 {
    font-size: 1rem;
    color: ${(props) => props.theme.textColor};
  }

  .articles {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 1px; /* In some browsers article cards borders overflow, it's fixing it */
  }
  .article {
    flex: 0 49%;
    margin-bottom: 10px;
  }

  @media (max-width: 450px) {
    .article {
      flex: 0 100%;
    }
  }
`;

export default StyledArticleWrapper;
