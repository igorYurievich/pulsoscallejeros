import { useEffect, useState } from 'react'

export default function CountryInput({ countries, value, onChange, label }) {
  const [query, setQuery] = useState(value.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]+\s*/u, ''))
  useEffect(() => setQuery(value.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]+\s*/u, '')), [value])
  return <label className="country-input">{label}<input list="country-options" value={query} placeholder="Buscar país" onChange={(event) => { const next = event.target.value; setQuery(next); const match = countries.find((country) => country.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]+\s*/u, '').toLowerCase() === next.toLowerCase()); if (match) onChange(match) }} /></label>
}
