import * as React from 'react';
import { connect } from 'redux-zero/react';

import Communication from 'services/Communication';
import actions from '../actions';
import ArticlesWrapper from './ArticlesWrapper';

interface IStateProps {
  articles: Store.ArticlesState;
  selectedEmoteKey: Emotes.emoteNum | undefined;
  loadArticles: () => void;
}
interface IState {
  customCardStyles: object;
}

class Articles extends React.Component<{} & IStateProps, IState> {
  public state = {
    customCardStyles: {},
  };

  public componentDidMount(): void {
    /** Add porthole listener to receive custom styles for our article component */
    Communication.windowProxy.addEventListener((e: any) => {
      if (e instanceof Object && e.data instanceof Object && e.data.cardStyles instanceof Object) {
        this.setState({ customCardStyles: e.data.cardStyles });
      }
    });

    if (typeof this.props.selectedEmoteKey === 'number') {
      this.props.loadArticles();
    }
  }

  public componentDidUpdate(prevProps: Readonly<{} & IStateProps>, prevState: Readonly<IState>, snapshot?: any): void {
    if (prevProps.selectedEmoteKey !== this.props.selectedEmoteKey) {
      this.props.loadArticles();
    }
  }

  public render() {
    const { articles, selectedEmoteKey } = this.props;
    // Don't show articles if 'forEmote' is not passed to container props.
    if (!selectedEmoteKey) {
      return null;
    }

    return (
      <ArticlesWrapper
        articles={articles.items}
        loading={articles.loading}
        customCardStyles={this.state.customCardStyles}
      />
    );
  }
}

const mapToProps = ({ emotes, articles }: Store.State) => ({
  articles,
  selectedEmoteKey: emotes.selectedKey,
});
export default connect(
  mapToProps,
  actions
)(Articles);
