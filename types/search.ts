/** @format */

export interface SearchRequest {
  brand: string
  keywords: string
  description: string
}

export interface SearchItem {
  available: boolean
  definitive: boolean
  domain: string
  price: number
  currency: string
  period: number
}

export interface SearchResponse {
  keywords: [string]
  domains: [string]
  results: [SearchItem]
}
