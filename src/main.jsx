import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import App from './App.jsx';
import { getRouterBasename } from './routerBasename.js';
import './styles/theme.css';
import './styles/base.css';
import './styles/layout.css';

const routerBasename = getRouterBasename(import.meta.env.BASE_URL);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
    <Analytics />
  </StrictMode>,
);
