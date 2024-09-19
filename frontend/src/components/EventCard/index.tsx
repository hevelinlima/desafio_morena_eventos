import React from 'react';
import { useRouter } from 'next/router'; 
import { Card } from './Card';

interface EventCardProps {
  event: {
    id: number;
    name: string;
    address: string;
    city: string;
    starts_at: string;
  };
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter(); 

  const handleCardClick = () => {
    router.push(`/eventos/${event.id}`);
  };

  const { name, address, starts_at } = event;

  return (
    <div onClick={handleCardClick}>
      <Card
        title={name}
        address={address}
        eventDate={starts_at}
      />
    </div>
  );
}
