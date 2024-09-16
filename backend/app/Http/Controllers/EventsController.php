<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Services\ViaCepService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventsController extends Controller
{

    protected $viaCepService;

    public function __construct(ViaCepService $viaCepService)
    {
        $this->viaCepService = $viaCepService;
    }

    public function index()
    {
        $events = Auth::user()->events; // Retorna todos os eventos criados pelo usuário
        return response()->json($events);
    }

    // Exibir os detalhes de um evento
    public function show($id)
    {
        $event = Events::find($id);

        if (!$event || $event->owner_id != Auth::id()) {
            return response()->json(['error' => 'Evento não encontrado ou acesso negado'], 403);
        }

        return response()->json($event);
    }

    // Criar um novo evento
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string',
            'zipcode' => 'required|string',
            'number' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
        ]);

        // Verificar o CEP
        $addressData = $this->viaCepService->getAddressByCep($validated['zipcode']);

        if (!$addressData) {
            return response()->json(['error' => 'CEP inválido'], 400);
        }

        $event = Events::create([
            'owner_id' => Auth::id(),
            'name' => $validated['name'],
            'description' => $validated['description'],
            'address' => $validated['address'] . ', ' . $validated['number'] . ', ' . $validated['city'] . ' - ' . $validated['state'],
        ]);

        return response()->json(['success' => 'Evento criado com sucesso', 'event' => $event]);
    }

    // Atualizar um evento existente
    public function update(Request $request, $id)
    {
        $event = Events::find($id);

        if (!$event || $event->owner_id != Auth::id()) {
            return response()->json(['error' => 'Evento não encontrado ou acesso negado'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string',
            'zipcode' => 'required|string',
            'number' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
        ]);

        // Verificar o CEP
        $addressData = $this->viaCepService->getAddressByCep($validated['zipcode']);

        if (!$addressData) {
            return response()->json(['error' => 'CEP inválido'], 400);
        }

        $event->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'address' => $validated['address'] . ', ' . $validated['number'] . ', ' . $validated['city'] . ' - ' . $validated['state'],
        ]);

        return response()->json(['success' => 'Evento atualizado com sucesso', 'event' => $event]);
    }

    // Remover um evento
    public function destroy($id)
    {
        $event = Events::find($id);

        if (!$event || $event->owner_id != Auth::id()) {
            return response()->json(['error' => 'Evento não encontrado ou acesso negado'], 403);
        }

        $event->delete();

        return response()->json(['success' => 'Evento removido com sucesso']);
    }
}
