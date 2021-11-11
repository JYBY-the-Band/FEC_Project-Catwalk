import React from 'react';
import ReactDOM from 'react-dom';
import QaIndex from './questions and answers/qaIndex.jsx';

const App = () => (
  <div>
    <QaIndex />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
