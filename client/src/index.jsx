import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './overview/overview.jsx';
// import List from './questions and answers/questionsList.jsx';
import Comparison from './related items and comparison/Comparsion.jsx';

let App = () => (
  <div>
    <Overview />
    {/* <List />  tied list directly into overview for prop drilling */}
    {/* <Comparison /> */}
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
