import type { Event } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Future Tech Summit 2024',
    date: '2024-10-15',
    time: '09:00 AM',
    location: 'Moscone Center, San Francisco',
    category: 'Tech',
    description: 'Join industry leaders to discuss the future of AI, Quantum Computing, and Blockchain. Keynote speakers from top tech giants will reveal the next big things.',
    image_url: 'https://picsum.photos/800/600?random=1',
    price: 299,
    spots: 150
  },
  {
    id: '2',
    title: 'Neon Nights Music Festival',
    date: '2024-11-02',
    time: '04:00 PM',
    location: 'Downtown Park, Austin',
    category: 'Music',
    description: 'An immersive electronic music experience featuring top global DJs, laser shows, and interactive art installations under the stars.',
    image_url: 'https://picsum.photos/800/600?random=2',
    price: 120,
    spots: 2000
  },
  {
    id: '3',
    title: 'Modern Abstract Art Gala',
    date: '2024-10-20',
    time: '07:00 PM',
    location: 'The Met, New York',
    category: 'Art',
    description: 'A black-tie event showcasing the latest in abstract expressionism. Meet the artists and acquire exclusive pieces.',
    image_url: 'https://picsum.photos/800/600?random=3',
    price: 50,
    spots: 300
  },
  {
    id: '4',
    title: 'Startup Founder Bootcamp',
    date: '2024-11-15',
    time: '10:00 AM',
    location: 'WeWork, London',
    category: 'Business',
    description: 'A comprehensive 2-day workshop for early-stage founders covering fundraising, product-market fit, and scaling teams.',
    image_url: 'https://picsum.photos/800/600?random=4',
    price: 0, // Free event
    spots: 50
  },
  {
    id: '5',
    title: 'Culinary Masterclass: Italian',
    date: '2024-10-25',
    time: '06:00 PM',
    location: 'Sur La Table, Chicago',
    category: 'Workshop',
    description: 'Learn to make authentic pasta from scratch with Chef Mario. Includes wine pairing and a 3-course dinner.',
    image_url: 'https://picsum.photos/800/600?random=5',
    price: 150,
    spots: 20
  },
  {
    id: '6',
    title: 'Green Energy Expo',
    date: '2024-12-05',
    time: '08:00 AM',
    location: 'Convention Center, Berlin',
    category: 'Tech',
    description: 'Discover the latest innovations in renewable energy, electric vehicles, and sustainable living.',
    image_url: 'https://picsum.photos/800/600?random=6',
    price: 75,
    spots: 500
  }
];
