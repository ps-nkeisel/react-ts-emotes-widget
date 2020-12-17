import getLuminance from 'polished/lib/color/getLuminance';
import * as React from 'react';
import styled from 'styled-components';

import EmoteImage from '@vuukle/emote-image';
import Tag from '@vuukle/tag';
import articleConfig from 'config/article.config';

interface IProps {
  emote: Emotes.ParsedEmote;
  isVoted?: boolean;
  isMostVoted?: boolean;
  isSelected?: boolean;
  onSelect: (key: Emotes.emoteNum) => void;
  className?: string;
  size?: string;
  customBadgeStyles?: object | undefined;
  hideLabels?: boolean | undefined;
}

const Emote: React.FunctionComponent<IProps> = ({
  emote,
  isVoted = false,
  isSelected = false,
  isMostVoted = false,
  customBadgeStyles = {},
  hideLabels = false,
  onSelect,
  ...props
}) => (
  <button onClick={() => onSelect(emote.key)} {...props}>
    <Tag
      pill={true}
      className="emote__badge"
      style={isMostVoted ? { fontWeight: 'bold', ...customBadgeStyles } : { ...customBadgeStyles }}
    >
      {emote.percent}%
    </Tag>
    <EmoteImage
      emoteKey={emote.key}
      className="emote__img"
      customConfig={{ img: articleConfig.images, name: articleConfig.names }}
    />
    {!hideLabels && <span className="emote__name">{emote.name}</span>}
  </button>
);

const StyledEmote = styled(Emote)<IProps>`
  position: relative;
  border: none;
  background: transparent;
  padding: 0 5px;
  outline: none !important;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  height: 100%;

  @media (max-width: 480px) {
    font-size: 12px;
    flex: 0 0 18.5%;
  }

  @media (max-width: 400px) {
    flex: 0 0 22.5%;
  }

  .emote__badge {
    position: absolute;
    right: 5px;
    top: 3px;
    z-index: 5;
  }

  .emote__img,
  .emote__name {
    transition: all 0.1s linear;
  }

  .emote__badge {
    z-index: 1;
  }

  .emote__img {
    padding: 5px;
    max-height: ${(props) => props.size || '80px'};
    max-width: ${(props) => props.size || '80px'};
  }

  .emote__name {
    display: inline-block;
    height: 20px;
    line-height: 18px;
    text-transform: capitalize;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 2rem;
  }

  @media (hover: hover) {
    &:hover,
    &:focus {
      .emote__name,
      .emote__img {
        transform: scale(1.02);
      }
      .emote__name {
        padding-left: 6px;
        padding-right: 6px;
        border-radius: 2rem;
      }
    }
  }

  ${(props) => {
    const bg = props.isVoted ? props.theme.primaryColor || '#228be6' : props.isSelected ? '#e3e5e7' : 'transparent';
    return `
      .emote__name {
        background: ${bg};
        color: ${props.isVoted ? (getLuminance(bg) < 0.3 ? '#fff' : '#454d5d') : props.theme.textColor};
      }
      &:hover .emote__name {
        background: ${props.isVoted ? props.theme.primaryColor || '#228be6' : '#e3e5e7'};
        color: ${props.isVoted ? (getLuminance(bg) < 0.3 ? '#fff' : '#454d5d') : props.theme.textColor};
      }
      `;
  }};
`;

export default StyledEmote;
