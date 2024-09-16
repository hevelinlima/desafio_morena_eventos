<?php

namespace App\Http\Controllers;

use App\Models\EventGuest;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventGuestsCOntroller extends Controller
{
    public function store(Request $request, $eventId)
    {
        $event = Events::find($eventId);

        if (!$event || $event->owner_id != Auth::id()) {
            return response()->json(['error' => 'Evento não encontrado ou acesso negado'], 403);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        EventGuest::create([
            'event_id' => $eventId,
            'user_id' => $validated['user_id'],
        ]);

        return response()->json(['success' => 'Convidado adicionado com sucesso']);
    }

    // Remover um convidado de um evento
    public function destroy($eventId, $guestId)
    {
        $event = Events::find($eventId);

        if (!$event || $event->owner_id != Auth::id()) {
            return response()->json(['error' => 'Evento não encontrado ou acesso negado'], 403);
        }

        $guest = EventGuest::where('event_id', $eventId)->where('user_id', $guestId)->first();

        if (!$guest) {
            return response()->json(['error' => 'Convidado não encontrado'], 404);
        }

        $guest->delete();

        return response()->json(['success' => 'Convidado removido com sucesso']);
    }

    // Listar convidados de um evento
    public function index($eventId)
    {
        $event = Events::find($eventId);

        if (!$event || $event->owner_id != Auth::id()) {
            return response()->json(['error' => 'Evento não encontrado ou acesso negado'], 403);
        }

        $guests = $event->guests()->with('user')->get();

        return response()->json($guests);
    }
}
