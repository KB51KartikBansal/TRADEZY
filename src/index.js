import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import AuthState from "./context/auth/AuthState.jsx"

import DashboardState from "./context/dashboard/DashboardState";
import "./index.css"
import TradeState from './context/trade/TradeState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //on build it will renders only ones it is rendered 2 time because of strict mode 
 
      <AuthState>
        <DashboardState>
          <TradeState>
         <App />
          </TradeState>
         </DashboardState>
         </AuthState>

</React.StrictMode> 
);

