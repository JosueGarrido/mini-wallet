import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout.jsx';
import Registro from './pages/Registro.jsx';
import Recargar from './pages/Recargar.jsx';
import 'antd/dist/reset.css';
import Pagar from './pages/Pagar.jsx';
import ConfirmarPago from './pages/ConfirmarPago.jsx';
import ConsultarSaldo from './pages/ConsultarSaldo.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="registro" element={<Registro />} />
          <Route path="recargar" element={<Recargar />} />
          <Route path="pagar" element={<Pagar />} />
          <Route path="confirmar-pago" element={<ConfirmarPago />} />
          <Route path="consultar-saldo" element={<ConsultarSaldo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
