import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './overview/overview.jsx';
import QaIndex from './questions and answers/qaIndex.jsx';
// import Comparison from './related items and comparison/Comparsion.jsx';

let App = () => (
  <div>
    <Overview />
    <QaIndex />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
