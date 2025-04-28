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

    public function recargarSaldo($documento, $celular, $valor)
    {
        try {
            $cliente = Cliente::where('documento', $documento)
                ->where('celular', $celular)
                ->first();

            if (!$cliente) {
                return "Cliente no encontrado.";
            }

            $cliente->saldo += $valor;
            $cliente->save();

            return "Saldo recargado exitosamente. Nuevo saldo: " . $cliente->saldo;
        } catch (\Exception $e) {
            return "Error al recargar saldo: " . $e->getMessage();
        }
    }

    // Metodo consultar pagar

    public function pagar($documento, $celular, $monto)
    {
        try {
            $cliente = Cliente::where('documento', $documento)
                ->where('celular', $celular)
                ->first();

            if (!$cliente) {
                return "Cliente no encontrado.";
            }

            if ($cliente->saldo < $monto) {
                return "Saldo insuficiente.";
            }

            // Token de 6 dígitos
            $token = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);

            $pagoPendiente = \App\Models\PagoPendiente::create([
                'cliente_id' => $cliente->id,
                'monto' => $monto,
                'token' => $token,
            ]);


            return "Se ha generado un token: {$token}. ID de sesión: {$pagoPendiente->id}";
        } catch (\Exception $e) {
            return "Error al iniciar pago: " . $e->getMessage();
        }
    }


    // Metodo consultar confirmar pago

}
