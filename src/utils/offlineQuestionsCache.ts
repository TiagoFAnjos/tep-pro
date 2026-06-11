import type { Question } from '../types/question'
import { cleanQuestions } from './questions'

const dbName = 'tep-pro-offline'
const storeName = 'cache'
const cacheKey = 'questions'
const localStorageKey = 'tep-pro:questions-cache'

type QuestionsCachePayload = {
  questions: Question[]
  cachedAt: string
}

export async function saveQuestionsToOfflineCache(questions: Question[]) {
  if (!isBrowser() || !questions.length) return

  const cleaned = cleanQuestions(questions)
  const previous = await loadOfflineQuestionsCache()
  const merged = mergeQuestions(previous.questions, cleaned)
  const payload: QuestionsCachePayload = {
    questions: merged,
    cachedAt: new Date().toISOString(),
  }

  try {
    const database = await openDatabase()
    await setValue(database, cacheKey, payload)
  } catch (error) {
    console.log('IndexedDB cache unavailable', error)
    try {
      window.localStorage.setItem(localStorageKey, JSON.stringify(payload))
    } catch (storageError) {
      console.log('Local cache unavailable', storageError)
    }
  }
}

export async function loadOfflineQuestionsCache(): Promise<QuestionsCachePayload> {
  const emptyPayload = {
    questions: [],
    cachedAt: '',
  }

  if (!isBrowser()) return emptyPayload

  try {
    const database = await openDatabase()
    const payload = await getValue<QuestionsCachePayload>(database, cacheKey)

    if (payload?.questions?.length) {
      return {
        questions: cleanQuestions(payload.questions),
        cachedAt: payload.cachedAt,
      }
    }
  } catch (error) {
    console.log('IndexedDB cache read failed', error)
  }

  try {
    const raw = window.localStorage.getItem(localStorageKey)
    if (!raw) return emptyPayload

    const payload = JSON.parse(raw) as QuestionsCachePayload

    return {
      questions: cleanQuestions(payload.questions),
      cachedAt: payload.cachedAt,
    }
  } catch (error) {
    console.log('Local cache read failed', error)
    return emptyPayload
  }
}

export function formatCacheDate(value: string) {
  if (!value) return ''

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function mergeQuestions(current: Question[], incoming: Question[]) {
  const byKey = new Map<string, Question>()

  for (const question of current) {
    byKey.set(questionKey(question), question)
  }

  for (const question of incoming) {
    byKey.set(questionKey(question), question)
  }

  return Array.from(byKey.values()).sort((a, b) =>
    String(a.title || '').localeCompare(String(b.title || ''))
  )
}

function questionKey(question: Question) {
  return String(question.id || question.title || crypto.randomUUID())
}

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1)

    request.onupgradeneeded = () => {
      request.result.createObjectStore(storeName)
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function setValue(database: IDBDatabase, key: string, value: unknown) {
  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    store.put(value, key)
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
}

function getValue<T>(database: IDBDatabase, key: string) {
  return new Promise<T | undefined>((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.get(key)

    request.onsuccess = () => resolve(request.result as T | undefined)
    request.onerror = () => reject(request.error)
  })
}
