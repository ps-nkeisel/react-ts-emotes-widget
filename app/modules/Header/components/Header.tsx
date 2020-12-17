import * as React from 'react';
import styled from 'styled-components';

import Link from '@vuukle/link';
import Tag from '@vuukle/tag';
import { withTranslation } from 'contexts/TranslationContext';

interface IProps {
  /**
   * Determines if use voted or not so we will show different titles in header
   * @default false
   */
  isVoted: boolean;
  /**
   * Number of votes to show inside badge
   * @default 0
   */
  votes: number;
  /**
   * Hide Vuukle branding
   * @default false
   */
  hideBranding: boolean;
  /**
   * Emotes header className generated styled-components or passed from higher order component
   */
  className?: string;
}

/**
 * @render react
 * @name EmotesHeader
 * @description Emotes header component
 */
const EmotesHeader = withTranslation<IProps>(
  ({ isVoted = false, votes = 0, className, translation, hideBranding = false }) => {
    return (
      <header className={className}>
        <div>
          <h2>
            {isVoted
              ? translation.thanks /* 'Thank you for voting' */
              : translation.header /* 'What is your reaction?' */}
          </h2>
          {votes > 0 && (
            <Tag pill={true}>
              {votes} {votes === 1 ? translation.vote /* Vote */ : translation.votes /* Votes */}
            </Tag>
          )}
        </div>
        <div>
          {!hideBranding && (
            <small>
              <Link
                light={true}
                href="https://vuukle.com"
                target="_blank"
                title="Vuukle Engagement Platform"
                rel="noopener nofollow"
              >
                <span>Powered by</span> Vuukle
              </Link>
            </small>
          )}
        </div>
      </header>
    );
  }
);

/**
 * @render react
 * @name StyledEmotesHeader
 * @description EmotesHeader with added styles
 */
const StyledEmotesHeader = styled(EmotesHeader)<IProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${(props) => props.theme.textColor};
  h2 {
    margin: 0 5px 0 0;
    line-height: 1em;
    font-size: 1em;
    display: inline-block;
    color: inherit;
  }
  > div:last-child {
    margin-left: 10px;
    position: relative;
    flex: 1;
    > * {
      float: right;
      line-height: 20px;
      margin-left: 5px;
    }
    &:after {
      border-top: 1px solid #e6e6e6;
      height: 1px;
      overflow: hidden;
      display: block;
      margin-top: 10px;
      content: '';
    }
  }
  @media (max-width: 370px) {
    > div:last-child span {
      display: none;
    }
  }
`;

export default StyledEmotesHeader;
