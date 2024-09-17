<?php

namespace App\Http\Controllers;

use App\Models\EventGuest;
use App\Models\Events;
use App\Models\User;
use App\Services\ViaCepService;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
        $events = Events::all(); // Retorna todos os eventos cadastrados
        return response()->json($events);
    }

    // Exibir os detalhes de um evento
    public function show($id)
    {
        $event = Events::find($id);

        if (!$event) {
            return response()->json(['error' => 'Evento não encontrado'], 404);
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
            'starts_at' => 'required|date_format:Y-m-d H:i:s',
            'ends_at' => 'required|date_format:Y-m-d H:i:s',
            'max_subscription' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        // Verificar o CEP
        $addressData = $this->viaCepService->getAddressByCep($validated['zipcode']);

        if (!$addressData) {
            return response()->json(['error' => 'CEP inválido'], Response::HTTP_BAD_REQUEST);
        }

        // Verifica se o Auth::id() está retornando o ID corretamente
        $ownerId = Auth::id();
        if (!$ownerId) {
            return response()->json(['error' => 'Usuário não autenticado'], Response::HTTP_FORBIDDEN);
        }

        try {
            $starts_at = new DateTime($validated['starts_at']);
            $ends_at = new DateTime($validated['ends_at']);

            $event = new Events();
            $event->name = $validated['name'];
            $event->description = $validated['description'];
            $event->address = $validated['address'] . ', ' . $validated['number'] . ', ' . $validated['city'] . ' - ' . $validated['state'];
            $event->complement = $validated['complement'] ?? '';
            $event->zipcode = $validated['zipcode'];
            $event->number = $validated['number'];
            $event->city = $validated['city'];
            $event->state = $validated['state'];
            $event->starts_at = $starts_at;
            $event->ends_at = $ends_at;
            $event->max_subscription = $validated['max_subscription'];
            $event->is_active = $validated['is_active'];
            $event->owner_id = $ownerId;
            $event->save();

            $eventGuest = new EventGuest();
            $eventGuest->event_id = $event->id;
            $eventGuest->user_id = $ownerId;
            $eventGuest->save();

            return response()->json(['success' => 'Evento criado com sucesso', 'event' => $event]);
        } catch (\Throwable $th) {
            return response()->json(['success' => false, 'error' => $th->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
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

    public function eventsByUser($userId)
    {
        // Verifica se o usuário existe
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'Usuário não encontrado'], 404);
        }

        // Retorna todos os eventos criados pelo usuário especificado
        $events = $user->events; 

        return response()->json($events);
    }
}
