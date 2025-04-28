import React from 'react';
import { Form, Input, InputNumber, Button, notification } from 'antd';

function Recargar() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await fetch('http://localhost:8001/api/recargar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      notification.success({
        message: 'Éxito',
        description: data.message,
      });
      form.resetFields();
    } catch (error) {
        notification.error({
            message: 'Error',
            description: 'Ocurrió un error, por favor intenta más tarde',
          });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Recargar Saldo</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="documento" label="Documento" rules={[{ required: true, message: 'Ingrese el documento' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="celular" label="Celular" rules={[{ required: true, message: 'Ingrese el celular' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="valor" label="Valor a recargar" rules={[{ required: true, message: 'Ingrese el valor' }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Recargar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Recargar;
