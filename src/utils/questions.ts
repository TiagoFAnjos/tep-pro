import type { Question } from '../types/question'

export function cleanQuestions(data: unknown): Question[] {
  if (!Array.isArray(data)) return []

  return (data as Question[]).filter((question) =>
    Boolean(question.title?.trim())
  )
}
