import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Registro from './pages/Registro.jsx'
import Recargar from './pages/Recargar.jsx'
import Pagar from './pages/Pagar.jsx'
import ConfirmarPago from './pages/ConfirmarPago.jsx'
import ConsultarSaldo from './pages/ConsultarSaldo.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recargar" element={<Recargar />} />
        <Route path="/pagar" element={<Pagar />} />
        <Route path="/confirmar-pago" element={<ConfirmarPago />} />
        <Route path="/consultar-saldo" element={<ConsultarSaldo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
