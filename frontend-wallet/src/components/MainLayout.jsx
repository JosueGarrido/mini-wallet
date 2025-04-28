import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function MainLayout() {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" items={[
            { key: '1', label: <Link to="/registro">Registro</Link> },
            { key: '2', label: <Link to="/recargar">Recargar</Link> },
            { key: '3', label: <Link to="/pagar">Pagar</Link> },
            { key: '4', label: <Link to="/confirmar-pago">Confirmar Pago</Link> },
            { key: '5', label: <Link to="/consultar-saldo">Consultar Saldo</Link> },
        ]} />
      </Header>
      <Content style={{ padding: '2rem' }}>
        <Outlet /> {/* Aquí se renderizan las páginas */}
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2025 Proyecto Full Stack - Billetera Virtual</Footer>
    </Layout>
  );
}

export default MainLayout;
