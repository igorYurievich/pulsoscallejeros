import { useState } from 'react'

const dateValue = (date) => { const [day, month, year] = date.split('/').map(Number); return new Date(year, month - 1, day).getTime() }

export default function HistoryPage({ events, futureEvents, copy }) {
  const [expanded, setExpanded] = useState(null)
  const [query, setQuery] = useState('')
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const upcoming = futureEvents.filter((event) => dateValue(event.date) > today.getTime() - 86400000).sort((a, b) => dateValue(a.date) - dateValue(b.date))
  const finished = events.filter((event) => dateValue(event.date) <= today.getTime()).sort((a, b) => dateValue(b.date) - dateValue(a.date))
  const needle = query.trim().toLowerCase()
  const filtered = finished.filter((event) => !needle || `${event.date} ${event.retador} ${event.oponente} ${event.winner}`.toLowerCase().includes(needle))
  const render = (items, empty, future = false) => <div className="history-list">{items.length ? items.map((event) => { const key = `${event.date}-${event.retador}-${event.oponente}-${event.hand}`; const open = expanded === key; return <article key={key} className={`history-item event-${future ? 'future' : event.rankingStatus || 'neutral'}${open ? ' is-expanded' : ''}`} role="button" tabIndex="0" aria-expanded={open} onClick={() => setExpanded(open ? null : key)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(open ? null : key) } }}><div className="history-date">{event.date}</div><div className="history-main"><strong>{event.retador}</strong><span>vs</span><strong>{event.oponente}</strong></div><div className="history-meta"><span>{event.hand}</span>{future ? <span>{event.retadorRank} vs {event.oponenteRank}</span> : <><span>{event.result}</span><span>{event.winner}</span></>}</div>{event.notes ? <p>{event.notes}</p> : null}</article> }) : <p className="history-empty">{empty}</p>}</div>
  return <section className="history-section standalone-page"><div className="section-heading"><div><p className="eyebrow alt">{copy.fullHistory}</p></div><a href="/" className="ghost-btn">{copy.backToRanking}</a></div><div className="history-subsections"><section className="history-subsection"><h3>{copy.upcomingEvents}</h3>{render(upcoming, copy.noUpcomingEvents, true)}</section><section className="history-subsection"><h3>{copy.circuitEvents}</h3><input className="history-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={copy.searchFinishedEvents} aria-label={copy.searchFinishedEvents} />{render(filtered, copy.noMatchingEvents)}</section></div></section>
}
