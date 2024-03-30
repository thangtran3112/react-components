import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchTree from './checkbox-tree/SearchTree.tsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchTree />
  </React.StrictMode>,
);
