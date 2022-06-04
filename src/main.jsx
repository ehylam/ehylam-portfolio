import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import AnimatedRoutes from './components/AnimatedRoutes';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Nav />
    <AnimatedRoutes />
  </BrowserRouter>
)
