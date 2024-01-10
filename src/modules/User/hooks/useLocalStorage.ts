import { useCallback, useState } from 'react'

// eslint-disable-next-line import/prefer-default-export
export function useLocalStorage<T>(key: string, initialValue: T) {
  const readInitialValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
      localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    } catch (error) {
      console.warn(
        `Error getting item in localStorage with key “${key}”:`,
        error
      )
      localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState(readInitialValue)

  const setStoredStateValue = (value: any) => {
    let newValue
    if (typeof value === 'function') {
      const fn = value
      newValue = fn(storedValue)
    } else {
      newValue = value
    }
    localStorage.setItem(key, JSON.stringify(newValue))
    setStoredValue(newValue)
  }

  return [storedValue, setStoredStateValue]
}
