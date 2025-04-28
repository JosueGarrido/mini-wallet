<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagoPendiente extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'monto',
        'token',
    ];

    protected $table = 'pagos_pendientes';
}
