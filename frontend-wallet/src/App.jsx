import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/registro">Registro</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/recargar">Recargar</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/pagar">Pagar</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/confirmar-pago">Confirmar Pago</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/consultar-saldo">Consultar Saldo</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
          ¡Bienvenido a la Mini Wallet!
        </h1>
        <p style={{ textAlign: 'center' }}>
          Selecciona una opción del menú para empezar.
        </p>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2025 Josue Garrido - Billetera Virtual</Footer>
    </Layout>
  );
}

export default App;
