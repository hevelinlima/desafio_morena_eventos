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
        try {
            $event = Events::find($eventId);
            if (!$event || $event->owner_id != Auth::id()) {
                return response()->json(['error' => 'Evento não encontrado ou acesso negado'], 403);
            }

            $validated = $request->validate([
                'user_id' => 'required|exists:users,id'
            ]);

            $eventGuestExists = EventGuest::where('event_id', $eventId)
                ->where('user_id', $validated['user_id'])
                ->exists();

            if ($eventGuestExists) {
                return response()->json([
                    'message' => 'Convidado já está inscrito no evento.'
                ], 409); 
            }

            $newEventGuest = new EventGuest();
            $newEventGuest->event_id = $eventId;
            $newEventGuest->user_id = $validated['user_id'];
            $newEventGuest->save();

            return response()->json([
                'success' => true,
                'data' => $newEventGuest
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }
    }

    // Remove um convidado de um evento
    public function destroy($eventId, $guestId)
    {
        $event = Events::find($eventId);

        if (!$event || $event->owner_id != Auth::id()) {
            return response()->json(['error' => 'Evento não encontrado ou acesso negado'], 403);
        }

        $guest = EventGuest::where('event_id', $eventId)
            ->where('user_id', $guestId)
            ->first();

        if (!$guest) {
            return response()->json(['error' => 'Convidado não encontrado'], 404);
        }

        $guest->delete();

        return response()->json(['success' => 'Convidado removido com sucesso']);
    }

    // Lista os convidados de um evento
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
