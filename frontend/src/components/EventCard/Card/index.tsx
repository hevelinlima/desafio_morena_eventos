import React from 'react';
import { CardAddress, CardContainer, CardDate, CardTitle } from './styles';
import { formatDate } from '@/utils/formatDate';

interface CardProps {
  title: string;
  eventDate: string;
  address: string;
}

export function Card({ title, eventDate, address }: CardProps) {
  return (
    <CardContainer>
      <CardDate>{formatDate(eventDate)}</CardDate>
      <CardTitle>{title}</CardTitle>
      <CardAddress>{address}</CardAddress>
    </CardContainer>
  );
}
