export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Tech' | 'Music' | 'Art' | 'Business' | 'Workshop' | 'Sports';
  description: string;
  image_url: string;
  price: number;
  spots: number;
}

export interface UserRegistration {
  name: string;
  email: string;
  ticketType: 'General' | 'VIP';
  eventId: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export type ViewState = 'HOME' | 'EVENT_DETAILS' | 'SUCCESS';

// Reusable icons props
export interface IconProps {
  className?: string;
  size?: number;
}
