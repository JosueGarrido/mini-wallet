import React from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';

function Pagar() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await fetch('http://localhost:8001/api/pagar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      message.success(data.message);
      form.resetFields();
    } catch (error) {
      message.error('Error al iniciar pago');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Pagar</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="documento" label="Documento" rules={[{ required: true, message: 'Ingrese el documento' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="celular" label="Celular" rules={[{ required: true, message: 'Ingrese el celular' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="monto" label="Monto a pagar" rules={[{ required: true, message: 'Ingrese el monto' }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Pagar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Pagar;
