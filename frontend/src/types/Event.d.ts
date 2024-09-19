export interface Event {
  id: number;
  name: string;
  description: string;
  address: string;
  zipcode: string;
  number: string;
  city: string;
  state: string;
  starts_at: string; 
  ends_at: string; 
  max_subscription: number;
  is_active: boolean;
}