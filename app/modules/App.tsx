import * as React from 'react';

import articleConfig from 'config/article.config';
import Articles from 'modules/Articles';
import Emotes from 'modules/Emotes';

const App: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <Emotes />
      {!articleConfig.hideArticles && <Articles />}
    </div>
  );
};

export default App;
