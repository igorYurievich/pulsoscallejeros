import { useState } from 'react'

function PlayerPicker({ label, rankings, value, onChange }) {
  const [query, setQuery] = useState('')
  const options = rankings.filter((fighter) => !query || `${fighter.name} ${fighter.alias}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <label className="event-player-picker">
      {label}
      <input type="search" placeholder="Buscar jugador" value={query} onChange={(event) => setQuery(event.target.value)} />
      <select value={value} onChange={(event) => onChange(event.target.value)} required>
        <option value="">Selecciona un jugador</option>
        {options.map((fighter) => <option key={`${fighter.name}-${fighter.rank}`} value={`${fighter.name}-${fighter.rank}`}>{fighter.rank}. {fighter.name}</option>)}
      </select>
    </label>
  )
}

export default function EventResultPanel({ rankings, futureEvents, onRecord }) {
  const [hand, setHand] = useState('left')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [retadorKey, setRetadorKey] = useState('')
  const [oponenteKey, setOponenteKey] = useState('')
  const [retadorScore, setRetadorScore] = useState('')
  const [oponenteScore, setOponenteScore] = useState('')
  const [winnerKey, setWinnerKey] = useState('')
  const [held, setHeld] = useState('yes')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('')
  const list = rankings[hand]
  const retador = list.find((fighter) => `${fighter.name}-${fighter.rank}` === retadorKey)
  const oponente = list.find((fighter) => `${fighter.name}-${fighter.rank}` === oponenteKey)
  const future = futureEvents.find((event) => event.retador === retador?.name && event.oponente === oponente?.name && event.hand === (hand === 'left' ? 'Izquierda' : 'Derecha'))

  const submit = async (event) => {
    event.preventDefault()
    if (!retador || !oponente || retadorKey === oponenteKey) return
    try {
      await onRecord({ date, hand, retador, oponente, wasHeld: held === 'yes', score: `${retadorScore}-${oponenteScore}`, winner: winnerKey === retadorKey ? retador : oponente, notes, futureEvent: future })
      setStatus('Evento guardado en la historia.')
    } catch {
      setStatus('No se pudo guardar el evento.')
    }
  }

  return (
    <form className="event-results-form" onSubmit={submit}>
      <div className="event-results-heading"><div><p className="eyebrow alt">Resultados</p><h3>Registrar resultado</h3></div></div>
      <div className="event-results-grid">
        <label>Fecha<input type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label>
        <label>Mano<select value={hand} onChange={(event) => { setHand(event.target.value); setRetadorKey(''); setOponenteKey(''); setWinnerKey('') }}><option value="left">Izquierda</option><option value="right">Derecha</option></select></label>
        <div className="event-player-score-group">
          <strong className="event-player-score-title">Retador</strong>
          <PlayerPicker label="Jugador" rankings={list} value={retadorKey} onChange={(value) => { setRetadorKey(value); setWinnerKey('') }} />
          {held === 'yes' ? <label>Puntos<input type="number" min="0" max="7" value={retadorScore} onChange={(event) => setRetadorScore(event.target.value)} required /></label> : null}
        </div>
        <div className="event-player-score-group">
          <strong className="event-player-score-title">Oponente</strong>
          <PlayerPicker label="Jugador" rankings={list} value={oponenteKey} onChange={(value) => { setOponenteKey(value); setWinnerKey('') }} />
          {held === 'yes' ? <label>Puntos<input type="number" min="0" max="7" value={oponenteScore} onChange={(event) => setOponenteScore(event.target.value)} required /></label> : null}
        </div>
        <label>¿Se celebró?<select value={held} onChange={(event) => setHeld(event.target.value)}><option value="yes">Sí</option><option value="no">No</option></select></label>
        {held === 'yes' ? <label>Ganador<select value={winnerKey} onChange={(event) => setWinnerKey(event.target.value)} required><option value="">Selecciona ganador</option><option value={retadorKey}>{retador?.name}</option><option value={oponenteKey}>{oponente?.name}</option></select></label> : null}
        <label className="event-notes-field">Notas<textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows="3" /></label>
      </div>
      {status ? <p className="save-status">{status}</p> : null}
      <button type="submit" className="primary-btn">Guardar resultado</button>
    </form>
  )
}
