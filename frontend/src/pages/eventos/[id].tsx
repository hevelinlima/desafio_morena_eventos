import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import { AddressInfo, ContentAddress, EventContainer, EventSubtitle, EventTitle, GroupInfo, SubscriptionButton } from './styles';
import { CalendarBlank, MapPinLine } from 'phosphor-react';
import { Event } from '@/types/Event';
import { formatDate, formatDateWithWeekday, formatTime } from '@/utils/formatDate';

// interface Event {
//   id: number;
//   name: string;
//   description: string;
//   address: string;
//   city: string;
//   starts_at: string;
//   ends_at: string;
// }

export default function EventDetails() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/events_list/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Erro ao carregar evento.');
        }

        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      setError('Você precisa estar logado para se inscrever no evento.');
      return;
    }

    if (!user) {
      setError('Erro: Usuário não encontrado.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`http://localhost:8000/api/events/${id}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('token=')[1]}`,
        },
        body: JSON.stringify({ user_id: user.id })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar inscrição');
      }

      setSuccessMessage('Inscrição realizada com sucesso!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!event) {
    return <p>Evento não encontrado.</p>;
  }

  return (
    <EventContainer>
      <EventTitle>{event.name}</EventTitle>


      
      <AddressInfo>
        <GroupInfo>
            <MapPinLine size={24} weight="bold" />
            <ContentAddress>
              <p>{formatDateWithWeekday(event.starts_at)}</p>
              <span>Início: {formatTime(event.starts_at)} ・ Encerramento: {formatTime(event.ends_at)}</span>
            </ContentAddress>
          </GroupInfo>
          <GroupInfo>
            <CalendarBlank size={24} weight='bold' />
            <ContentAddress>
              <p>{event.city}</p>
              <span>{event.address} - {event.state} - {event.zipcode}</span>
            </ContentAddress>
          </GroupInfo>
        </AddressInfo>

      <EventSubtitle>Informações do evento</EventSubtitle>
      <p>{event.description}</p>


      {isAuthenticated ? (
        <SubscriptionButton onClick={handleRegister} disabled={loading}>
          {loading ? 'Inscrevendo...' : 'Inscrever'}
        </SubscriptionButton>
      ) : (
        <p>Você precisa estar logado para se inscrever no evento.</p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </EventContainer>
  );
}
