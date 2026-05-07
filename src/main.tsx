import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {getPageFromPathname} from './routing';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

const prerenderPathname = rootElement.dataset.prerenderPathname;
const canHydrate =
  rootElement.hasChildNodes() &&
  (!prerenderPathname || getPageFromPathname(prerenderPathname) === getPageFromPathname(window.location.pathname));

if (canHydrate) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
