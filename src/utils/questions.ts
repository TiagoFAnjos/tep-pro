import type { Question } from '../types/question'
import { normalizeQuestionRecord } from './portugueseText'

export function cleanQuestions(data: unknown): Question[] {
  if (!Array.isArray(data)) return []

  return (data as Question[])
    .filter((question) => Boolean(question.title?.trim()))
    .map((question) => normalizeQuestionRecord(question))
}
