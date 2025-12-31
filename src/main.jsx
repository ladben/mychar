import React from 'react';
import ReactDOM from 'react-dom/client';
import { register } from 'swiper/element/bundle';
import './main.css';
import App from './App';

register();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
