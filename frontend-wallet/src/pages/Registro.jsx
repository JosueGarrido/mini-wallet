import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';

function Registro() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await fetch('http://localhost:8001/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      notification.success({
        message: 'Éxito',
        description: data.message,
        placement: 'topRight',
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Ocurrió un error, por favor intenta más tarde',
        placement: 'topRight',
      });
    }
  };

  const openNotification = () => {
    notification.success({
      message: 'Test',
      description: 'Notificación de prueba funcionando',
      placement: 'topRight',
    });
  };
  

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Registro de Cliente</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="documento" label="Documento" rules={[{ required: true, message: 'Ingrese el documento' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="nombres" label="Nombres" rules={[{ required: true, message: 'Ingrese los nombres' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Ingrese el email' }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item name="celular" label="Celular" rules={[{ required: true, message: 'Ingrese el celular' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Registrar
          </Button>
        </Form.Item>
      </Form>

      <div style={{ padding: '2rem' }}>
      <Button type="primary" onClick={openNotification}>
        Probar Notificación
      </Button>
      </div>
    </div>
  );
}

export default Registro;
