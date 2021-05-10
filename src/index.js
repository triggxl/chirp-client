import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './components/font-awesome';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);