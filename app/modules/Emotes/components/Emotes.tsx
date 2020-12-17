import * as React from 'react';
import { connect } from 'redux-zero/react';

import articleConfig from 'config/article.config';
import EmotesWrapper from 'modules/Emotes/components/EmotesWrapper';
import Header from 'modules/Header/components/Header';
import actions from '../actions';

import Communication from 'services/Communication';

interface IStateProps {
  emotes: Store.EmotesState;
  selectEmote: (key: Emotes.emoteNum) => void;
  loadEmotes: () => void;
}

interface IState {
  customBadgeStyles: object;
}

class Emotes extends React.Component<{} & IStateProps, IState> {
  public state = {
    customBadgeStyles: {},
  };

  public componentDidMount(): void {
    // if comments is enabled, the emotes are gotten through Porthole Communication
    if (!articleConfig.commentsEnabled) {
      // otherwise we get emotes from the server
      this.props.loadEmotes();
    }
    /** Add porthole listener to receive custom styles for our article component */
    Communication.windowProxy.addEventListener((e: any) => {
      if (e instanceof Object && e.data instanceof Object && e.data.badgeStyles instanceof Object) {
        this.setState({ customBadgeStyles: e.data.badgeStyles });
      }
    });
  }

  public render() {
    const { emotes } = this.props;

    if (this.props.emotes.loading) {
      return null;
    }

    return (
      <div>
        {!articleConfig.hideAllLabels && (
          <Header isVoted={!!emotes.votedKey} votes={emotes.totalVotes} hideBranding={articleConfig.commentsEnabled} />
        )}
        <EmotesWrapper
          emotes={emotes.items}
          onSelect={this.props.selectEmote}
          votedEmote={emotes.votedKey}
          selectedEmote={emotes.selectedKey}
          mostVotedEmote={emotes.mostVotedKey}
          size={articleConfig.iconsSize + 'px'}
          customBadgeStyles={this.state.customBadgeStyles}
          hideLabels={articleConfig.hideAllLabels}
        />
      </div>
    );
  }
}

const mapToProps = ({ emotes }: Store.State) => ({ emotes });

export default connect(
  mapToProps,
  actions
)(Emotes);
