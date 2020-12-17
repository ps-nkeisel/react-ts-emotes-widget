import { get, merge } from 'lodash';
import React from 'react';
import Communication from 'services/Communication';

export interface ITranslation {
  readonly comment: string;
  readonly comments: string;
  readonly header: string;
  readonly noRecommendations: string;
  readonly suggestionsHeader: string;
  readonly thanks: string;
  readonly vote: string;
  readonly votes: string;
}

const defaultTranslation = {
  comment: 'comment',
  comments: 'comments',
  header: 'What is your reaction?',
  noRecommendations: '😢 No recommendations. Please try another emote.',
  suggestionsHeader: 'You might like:',
  thanks: 'Thank you for voting!',
  vote: 'vote',
  votes: 'votes',
};

const TranslationContext = React.createContext(defaultTranslation);

class TranslationProvider extends React.Component<{}, ITranslation> {
  public state: ITranslation = defaultTranslation;

  public componentDidMount(): void {
    Communication.windowProxy.addEventListener((event: any) => {
      if (get(event, ['data', 'customText'])) {
        const updatedTranslation = merge(this.state, event.data.customText);
        this.setState(updatedTranslation as ITranslation);
      }
    });
  }

  public render() {
    const { children } = this.props;
    return <TranslationContext.Provider value={this.state}>{children}</TranslationContext.Provider>;
  }
}

interface ITranslationProps {
  translation: ITranslation;
}

function withTranslation<T>(WrappedComponent: React.ComponentType<T & ITranslationProps>) {
  // Try to create a nice displayName for React Dev Tools.
  // const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // tslint:disable-next-line:max-classes-per-file
  const ComponentWithTranslation: React.FC<T> = (props) => (
    // public static displayName = `withPages(${displayName})`;
    <TranslationContext.Consumer>
      {(translation) => <WrappedComponent {...props} translation={translation} />}
    </TranslationContext.Consumer>
  );
  return ComponentWithTranslation;
}

export default TranslationContext;
export { TranslationProvider, withTranslation };
