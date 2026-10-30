export type Category = 'Movies' | 'Restaurants' | 'Hotels'
export type Recommendation = { title: string; subtitle: string; image: string; imageSource?: 'url' | 'unsplash'; score?: number; rank?: number; isMock?: boolean; reason: string; tag: string }
export type ChatMessage = { id: number; from: 'mate' | 'you'; text: string; options?: string[]; recommendations?: Recommendation[] }

export const categories: { name: Category; icon: string; description: string; count: string }[] = [
  { name: 'Movies', icon: '▣', description: 'Your next stay-up-late favorite.', count: 'FILM & SERIES' },
  { name: 'Restaurants', icon: '✳', description: 'A table you’ll be glad you booked.', count: 'FOOD & DRINK' },
  { name: 'Hotels', icon: '⌂', description: 'A little getaway, made for you.', count: 'PLACES TO STAY' },
]

export const recommendationImages: Record<Category, Record<string, string>> = {
  Movies: {
    'The Grand Budapest Hotel': 'photo-1535016120720-40c646be5580',
    'Little Miss Sunshine': 'photo-1489599849927-2ee91cede3ba',
    'About Time': 'photo-1485846234645-a62644f84728',
  },
  Restaurants: {
    'The Greenhouse Table': 'photo-1414235077428-338989a2e8c0',
    'Olive & Ember': 'photo-1517248135467-4c7edcad34c4',
    'Juniper Room': 'photo-1515003197210-e0cd7184f8b5',
  },
  Hotels: {
    'Casa Solana': 'photo-1571896349842-33c89424de2d',
    'The Alder House': 'photo-1566073771259-6a8506099945',
    'Stillwater Lodge': 'photo-1445019980597-93fa8acb246c',
  },
}

export const imageUrl = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`
