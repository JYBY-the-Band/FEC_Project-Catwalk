import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './overview/overview.jsx';

let App = () => (
  <div>
    <Overview />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));