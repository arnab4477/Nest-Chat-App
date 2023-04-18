import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ChatContext, UserContext } from './contexts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContext>
      <ChatContext>
        <Router>
          <App />
        </Router>
      </ChatContext>
    </UserContext>
  </React.StrictMode>
);
