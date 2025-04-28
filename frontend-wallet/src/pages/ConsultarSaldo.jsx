import React, { useState } from 'react';
import { Form, Input, Button, message, notification } from 'antd';

function ConsultarSaldo() {
  const [form] = Form.useForm();
  const [saldo, setSaldo] = useState('');

  const onFinish = async (values) => {
    try {
      const query = new URLSearchParams(values).toString();
      const res = await fetch(`http://localhost:8001/api/consultar-saldo?${query}`);
      const data = await res.json();
      setSaldo(data.message);
    } catch (error) {
        notification.error({
            message: 'Error',
            description: 'Ocurrió un error, por favor intenta más tarde',
        });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Consultar Saldo</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="documento" label="Documento" rules={[{ required: true, message: 'Ingrese el documento' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="celular" label="Celular" rules={[{ required: true, message: 'Ingrese el celular' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Consultar
          </Button>
        </Form.Item>
      </Form>
      {saldo && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <h2>{saldo}</h2>
        </div>
      )}
    </div>
  );
}

export default ConsultarSaldo;
