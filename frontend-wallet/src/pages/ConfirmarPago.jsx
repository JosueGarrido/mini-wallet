import React from 'react';
import { Form, Input, Button, message } from 'antd';

function ConfirmarPago() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await fetch('http://localhost:8001/api/confirmar-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      message.success(data.message);
      form.resetFields();
    } catch (error) {
      message.error('Error al confirmar pago');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Confirmar Pago</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="session_id" label="ID de sesión" rules={[{ required: true, message: 'Ingrese el ID de sesión' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="token" label="Token de confirmación" rules={[{ required: true, message: 'Ingrese el token' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Confirmar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ConfirmarPago;
