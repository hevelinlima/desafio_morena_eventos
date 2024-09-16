<?php 

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ViaCepService
{
    protected $baseUrl = 'https://viacep.com.br/ws/';

    public function getAddressByCep($cep)
    {
        $response = Http::get($this->baseUrl . $cep . '/json/');
        
        if ($response->successful()) {
            return $response->json();
        }

        return null; 
    }
}
