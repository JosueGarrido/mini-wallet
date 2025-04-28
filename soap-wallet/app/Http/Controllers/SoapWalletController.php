<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;

use Illuminate\Http\Request;
use App\Models\Cliente;

class SoapWalletController extends Controller
{
    public function server(Request $request): Response
    {
        $options = [
            'uri' => 'http://localhost',
        ];

        $server = new \SoapServer(null, $options);
        $server->setObject($this);

        ob_start();
        $server->handle();
        $response = ob_get_clean();

        return response($response, 200)
            ->header('Content-Type', 'text/xml');
    }



    // Metodo registro de cliente
    public function registroCliente($documento, $nombres, $email, $celular)
    {
        try {
            $cliente = Cliente::create([
                'documento' => $documento,
                'nombres' => $nombres,
                'email' => $email,
                'celular' => $celular,
                'saldo' => 0,
            ]);
            return "Cliente registrado correctamente.";
        } catch (\Exception $e) {
            return "Error al registrar cliente: " . $e->getMessage();
        }
    }

    // Metodo consultar saldo
    public function consultarSaldo($documento, $celular)
    {
        $cliente = Cliente::where('documento', $documento)
            ->where('celular', $celular)
            ->first();

        if (!$cliente) {
            return "Cliente no encontrado.";
        }

        return "Saldo actual: " . $cliente->saldo;
    }

    // Metodo consultar recargar saldo

    // Metodo consultar pagar

    // Metodo consultar confirmar pago
    
}
