/** @format */

export interface RegisterForm {
  name: string
  email: string
  reason: string
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
