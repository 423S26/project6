import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';
//expires March 22, 2026
registerLicense("Ngo9BigBOggjHTQxAR8/V1JHaF5cWWdCekx0R3xbf1x2ZFRMZFRbRnVPIiBoS35RcEVgW3pfcnRdR2JUU0BxVEFe")

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
