import React from 'react';
import ReactDOM from 'react-dom';
import QaIndex from './questions and answers/qaIndex.jsx';

let App = () => (
  <div>
    <QaIndex></QaIndex>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
