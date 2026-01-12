function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n))
}

function hexToRgb(hex) {
  const raw = String(hex || '').replace('#', '').trim()
  if (raw.length !== 6) return null
  const r = Number.parseInt(raw.slice(0, 2), 16)
  const g = Number.parseInt(raw.slice(2, 4), 16)
  const b = Number.parseInt(raw.slice(4, 6), 16)
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null
  return { r, g, b }
}

function rgbToHex({ r, g, b }) {
  const to = (x) => clamp(Math.round(x), 0, 255).toString(16).padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}

export function darkenHex(hex, amount = 0.08) {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  const k = 1 - clamp(amount, 0, 1)
  return rgbToHex({ r: rgb.r * k, g: rgb.g * k, b: rgb.b * k })
}


