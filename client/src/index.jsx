import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './overview/overview.jsx';
import QaIndex from './questions and answers/qaIndex.jsx';

let App = () => (
  <div>
    <Overview />
    <QaIndex />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
