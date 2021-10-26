import React from 'react';
import { configure } from 'axios-hooks'
import ReactDOM from 'react-dom';
import LRU from 'lru-cache';

import axios from './config/axios.config';
import App from './App';
import reportWebVitals from './reportWebVitals';


const cache = new LRU({ max: 10 })

configure({ axios, cache })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
