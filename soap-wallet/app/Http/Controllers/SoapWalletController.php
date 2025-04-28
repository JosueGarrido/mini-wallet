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
        try {
            $cliente = Cliente::where('documento', $documento)
                ->where('celular', $celular)
                ->first();

            if (!$cliente) {
                return "Cliente no encontrado.";
            }

            return "Saldo actual: " . $cliente->saldo;
        } catch (\Exception $e) {
            return "Error al consultar saldo: " . $e->getMessage();
        }
    }


    // Metodo recargar saldo

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

    // Metodo pagar

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

            // Envió de correo
            \Mail::to($cliente->email)->send(new \App\Mail\TokenDePago($token));

            return "Se ha generado un token y enviado al correo. ID de sesión: {$pagoPendiente->id}";
        } catch (\Exception $e) {
            return "Error al iniciar pago: " . $e->getMessage();
        }
    }


    // Metodo confirmar pago
    public function confirmarPago($session_id, $token)
    {
        try {
            $pagoPendiente = \App\Models\PagoPendiente::find($session_id);

            if (!$pagoPendiente) {
                return "No se encontró la sesión de pago.";
            }

            if ($pagoPendiente->token !== $token) {
                return "Token incorrecto.";
            }

            $cliente = Cliente::find($pagoPendiente->cliente_id);

            if (!$cliente) {
                return "Cliente no encontrado.";
            }

            if ($cliente->saldo < $pagoPendiente->monto) {
                return "Saldo insuficiente para confirmar pago.";
            }

            $cliente->saldo -= $pagoPendiente->monto;
            $cliente->save();

            $pagoPendiente->delete(); // Eliminar el registro del pago pendiente

            return "Pago confirmado exitosamente. Saldo actual: " . $cliente->saldo;
        } catch (\Exception $e) {
            return "Error al confirmar pago: " . $e->getMessage();
        }
    }


}
