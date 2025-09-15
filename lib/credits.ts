let credits = 5

export function getCredits(): number {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('credits')
    if (stored !== null) {
      credits = parseInt(stored, 10)
    }
  }
  return credits
}

export function setCredits(value: number) {
  credits = value
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('credits', String(value))
  }
}

export function decrementCredit(): number {
  const current = getCredits()
  if (current > 0) {
    setCredits(current - 1)
  }
  return getCredits()
}

export function hasCredits(): boolean {
  return getCredits() > 0
}
