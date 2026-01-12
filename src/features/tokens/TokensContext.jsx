import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getSeedTokens } from './tokensSeed.js'
import { darkenHex } from './colorUtils.js'

const STORAGE_KEY = 'clm_tokens'

const TokensContext = createContext(null)

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

function normalizeTokens(t) {
  const seed = getSeedTokens()
  const next = { ...seed, ...(t || {}) }

  // Normalize a couple of common inputs (e.g. "16" -> "16px")
  if (typeof next.radius === 'number') next.radius = `${next.radius}px`
  if (typeof next.space === 'number') next.space = `${next.space}px`

  if (typeof next.radius === 'string' && /^\d+$/.test(next.radius)) next.radius = `${next.radius}px`
  if (typeof next.space === 'string' && /^\d+$/.test(next.space)) next.space = `${next.space}px`

  return next
}

export function TokensProvider({ children }) {
  const [tokens, setTokens] = useState(() => {
    const fromStorage = safeParse(localStorage.getItem(STORAGE_KEY))
    return normalizeTokens(fromStorage)
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
  }, [tokens])

  useEffect(() => {
    const root = document.documentElement

    const primary = tokens.primary
    const secondary = tokens.secondary

    root.style.setProperty('--clm-primary', primary)
    root.style.setProperty('--clm-primary-hover', darkenHex(primary, 0.1))
    root.style.setProperty('--clm-secondary', secondary)
    root.style.setProperty('--clm-secondary-hover', darkenHex(secondary, 0.08))

    root.style.setProperty('--clm-radius', tokens.radius)
    root.style.setProperty('--clm-space', tokens.space)
  }, [tokens])

  const api = useMemo(() => {
    function updateToken(key, value) {
      setTokens((t) => normalizeTokens({ ...t, [key]: value }))
    }

    function resetTokens() {
      setTokens(normalizeTokens(getSeedTokens()))
    }

    return { tokens, setTokens, updateToken, resetTokens }
  }, [tokens])

  return <TokensContext.Provider value={api}>{children}</TokensContext.Provider>
}

export function useTokens() {
  const ctx = useContext(TokensContext)
  if (!ctx) throw new Error('useTokens must be used within <TokensProvider>')
  return ctx
}


