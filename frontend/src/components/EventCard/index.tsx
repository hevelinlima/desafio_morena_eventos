import React from 'react';
import { Card } from './Card'; 

interface EventCardProps {
  event: {
    name: string;
    address: string;
    city: string;
    starts_at: string;
  };
}

export function EventCard({ event }: EventCardProps) {
  const {
    name,
    address,
    starts_at,
  } = event;

  return (
    <Card
      title={name}
      address={address}
      eventDate={starts_at}
    />
  );
}
