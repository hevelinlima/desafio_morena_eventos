"use client";

import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Event } from "@/types/Event";
import { EventCard } from "@/components/EventCard";
import { CardsGrid, HomeContainer, HomeTitle } from "../home/styles";

function MeusEventos() {
  const { getUser, isAuthenticated, user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsFetched, setEventsFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserEvents = async (userId: number) => {
      const token = getCookie("token");
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}/events`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          throw new Error('Erro ao buscar eventos');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setEventsFetched(true); 
      }
    };

    if (isAuthenticated && !eventsFetched) {
      getUser().then(() => {
        if (user) {
          fetchUserEvents(user.id);
        }
      });
    }
  }, [isAuthenticated, user, eventsFetched]);

  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

  if (!isAuthenticated) {
    return <p>Você precisa estar logado para ver seus eventos.</p>;
  }

  return (
    <HomeContainer>
      <HomeTitle>Meus Eventos</HomeTitle>
      {loading ? (
        <p>Carregando eventos...</p>
      ) : events.length > 0 ? (
        <CardsGrid>
          {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
        </CardsGrid>
      ) : (
        <p>Nenhum evento disponível.</p>
      )}
    </HomeContainer>
  );
}

export default MeusEventos;
