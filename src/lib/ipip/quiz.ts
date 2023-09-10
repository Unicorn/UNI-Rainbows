/** @format */

import { IPIPChoices, IPIPQuestion } from './types'
import questions from './data/en.questions.json'
import choices from './data/en.choices.json'

export function getChoices(): IPIPChoices {
  try {
    return choices as unknown as IPIPChoices
  } catch (error) {
    throw new Error('Choices not found. Try another language input.')
  }
}

export function getQuestions(): IPIPQuestion[] {
  try {
    return questions as unknown as IPIPQuestion[]
  } catch (error) {
    throw new Error('Questions not found. Try another language input.')
  }
}
