<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    protected function soapClient()
    {
        return new \SoapClient(null, [
            'location' => 'http://127.0.0.1:8000/soap-server',
            'uri' => 'http://localhost',
            'trace' => 1,
            'exceptions' => true,
            'soap_version' => SOAP_1_1,
        ]);
    }

    public function registro(Request $request)
    {
        $client = $this->soapClient();

        $response = $client->__soapCall('registroCliente', [
            $request->input('documento'),
            $request->input('nombres'),
            $request->input('email'),
            $request->input('celular'),
        ]);

        return response()->json([
            'message' => $response,
        ]);
    }

    public function recargar(Request $request)
    {
        $client = $this->soapClient();

        $response = $client->__soapCall('recargarSaldo', [
            $request->input('documento'),
            $request->input('celular'),
            $request->input('valor'),
        ]);

        return response()->json([
            'message' => $response,
        ]);
    }

    public function pagar(Request $request)
    {
        $client = $this->soapClient();

        $response = $client->__soapCall('pagar', [
            $request->input('documento'),
            $request->input('celular'),
            $request->input('monto'),
        ]);

        return response()->json([
            'message' => $response,
        ]);
    }

    public function confirmarPago(Request $request)
    {
        $client = $this->soapClient();

        $response = $client->__soapCall('confirmarPago', [
            $request->input('session_id'),
            $request->input('token'),
        ]);

        return response()->json([
            'message' => $response,
        ]);
    }

    public function consultarSaldo(Request $request)
    {
        $client = $this->soapClient();

        $response = $client->__soapCall('consultarSaldo', [
            $request->input('documento'),
            $request->input('celular'),
        ]);

        return response()->json([
            'message' => $response,
        ]);
    }
}
