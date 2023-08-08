/** @format */

export type IPIPKeyed = 'plus' | 'minus'

export interface IPIPChoice {
  text: string
  score: 1 | 2 | 3 | 4 | 5
  color: 1 | 2 | 3 | 4 | 5
}

export interface IPIPChoices {
  plus: IPIPChoice[]
  minus: IPIPChoice[]
}

export interface IPIPQuestion {
  id: string
  text: string
  keyed: IPIPKeyed
  domain: string
  facet: number
}

export interface IPIPItem extends IPIPQuestion {
  num: number
  score: number
}

export interface IPIPAnswer {
  id: string
  domain: string
  facet: number
  score: number
}

export interface IPIPAnswers {
  language: string
  answers: IPIPAnswer[]
}

export function getChoices(): IPIPChoices {
  try {
    return require('./data/en.choices.json')
  } catch (error) {
    throw new Error('Choices not found. Try another language input.')
  }
}

export function getQuestions(): IPIPQuestion[] {
  try {
    return require(`./data/en.questions.json`)
  } catch (error) {
    throw new Error('Questions not found. Try another language input.')
  }
}
