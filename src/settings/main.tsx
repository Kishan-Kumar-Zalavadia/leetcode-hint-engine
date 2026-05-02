import React from 'react';
import { createRoot } from 'react-dom/client';
import { SettingsApp } from './App';
import '../sidepanel/index.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <SettingsApp />
    </React.StrictMode>
  );
}
