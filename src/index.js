import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importar Provider de react-redux
import store from './redux/store'; // Importar tu store desde la ubicación correcta
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Envolver App con Provider y pasar el store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
