<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->options('/{any:.*}', function() {
    return response('OK', 200);
});

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/api/registro', 'ApiController@registro');
$router->post('/api/recargar', 'ApiController@recargar');
$router->post('/api/pagar', 'ApiController@pagar');
$router->post('/api/confirmar-pago', 'ApiController@confirmarPago');
$router->get('/api/consultar-saldo', 'ApiController@consultarSaldo');

