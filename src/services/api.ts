import { imageUrl, recommendationImages, type Category, type ChatMessage, type Recommendation } from '../data'

export type ApiCategory = 'movies' | 'restaurants' | 'hotels'
export type HistoryMessage = { role: 'user' | 'assistant'; content: string }
type ApiRecommendation = { id: string; title: string; subtitle: string; matchScore?: number; rank?: number; imageUrl?: string; explanation: string; tags: string[] }
type ApiChatResponse =
  | { type: 'question'; category: ApiCategory; question: string; quickReplies: string[]; progress: { answered: number; total: number } }
  | { type: 'recommendations'; category: ApiCategory; source: 'qloo' | 'mock'; message: string; recommendations: ApiRecommendation[] }
type ApiEnvelope<T> = { data: T; error?: { message?: string } }

const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace(/\/$/, '')

export const toApiCategory = (category: Category): ApiCategory => category.toLowerCase() as ApiCategory

export async function requestChat(category: Category, answers: string[], conversationHistory: HistoryMessage[]) {
  const response = await fetch(`${apiBaseUrl}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category: toApiCategory(category), answers, conversationHistory }),
  })
  const payload = await response.json() as ApiEnvelope<ApiChatResponse>
  if (!response.ok) throw new Error(payload.error?.message ?? `TasteMate API error (${response.status})`)
  return payload.data
}

const fallbackImage: Record<Category, string> = {
  Movies: 'photo-1485846234645-a62644f84728',
  Restaurants: 'photo-1414235077428-338989a2e8c0',
  Hotels: 'photo-1566073771259-6a8506099945',
}

function mapRecommendation(category: Category, item: ApiRecommendation, isMock: boolean): Recommendation {
  const image = recommendationImages[category][item.title] ?? fallbackImage[category]
  return {
    title: item.title,
    subtitle: item.subtitle,
    image: item.imageUrl ?? imageUrl(image),
    imageSource: item.imageUrl ? 'url' : 'unsplash',
    score: item.matchScore,
    rank: item.rank,
    isMock,
    reason: item.explanation,
    tag: item.tags[0] ?? 'A THOUGHTFUL PICK',
  }
}

export function toChatMessage(category: Category, response: ApiChatResponse, id = Date.now()): ChatMessage {
  if (response.type === 'question') {
    return { id, from: 'mate', text: response.question, options: response.quickReplies }
  }
  return {
    id,
    from: 'mate',
    text: response.message,
    recommendations: response.recommendations.map((item) => mapRecommendation(category, item, response.source === 'mock')),
  }
}
