import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

document.body.style.backgroundColor = "#000044";
document.body.style.margin = '0px';
document.body.style.padding = '0px';
document.body.style.color = "white";

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );