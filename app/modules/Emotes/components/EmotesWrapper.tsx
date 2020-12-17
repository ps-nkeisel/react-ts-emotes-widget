import * as React from 'react';
import styled from 'styled-components';
import Emote from './Emote';

interface IProps {
  emotes: Emotes.ParsedEmote[];
  selectedEmote?: Emotes.emoteNum | undefined;
  mostVotedEmote?: Emotes.emoteNum | undefined;
  votedEmote?: Emotes.emoteNum | undefined;
  size?: string;
  onSelect: (key: Emotes.emoteNum) => void;
  className?: string;
  customBadgeStyles?: object | undefined;
  hideLabels?: boolean | undefined;
}

const EmotesWrapper: React.FunctionComponent<IProps> = ({
  emotes,
  onSelect,
  selectedEmote,
  votedEmote,
  mostVotedEmote,
  size,
  className,
  customBadgeStyles,
  hideLabels,
}) => {
  return (
    <div className={`emotes-wrapper--${emotes.length} ${className}`}>
      {emotes.map((emote, idx) => (
        <Emote
          key={idx}
          emote={emote}
          isVoted={votedEmote === emote.key}
          isSelected={selectedEmote === emote.key}
          isMostVoted={mostVotedEmote === emote.key}
          onSelect={onSelect}
          size={size}
          tab-index={idx}
          customBadgeStyles={customBadgeStyles}
          hideLabels={hideLabels}
          className="emote"
        />
      ))}
    </div>
  );
};

const sizesMap = {
  big: {
    1: '20%',
    2: '50%',
    3: '33%',
    4: '25%',
    5: '20%',
    6: '16.6%',
  },
  small: {
    1: '30%',
    2: '50%',
    3: '33%',
    4: '25%',
    5: '25%',
    6: '22%',
  },
};

const StyledEmotesWrapper = styled(EmotesWrapper)<IProps>`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .emote {
    flex: 0 0 ${(props) => sizesMap.big[props.emotes.length]};
  }

  @media (max-width: 400px) {
    .emote {
      flex: 0 0 ${(props) => sizesMap.small[props.emotes.length]};
    }
  }

  @media (max-width: 480px) {
    max-width: 100%; /* To fix overextending wrapper div for iOS safari */
    width: 100vw; /* To fix overextending wrapper div for iOS safari */

    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
`;

export default StyledEmotesWrapper;
