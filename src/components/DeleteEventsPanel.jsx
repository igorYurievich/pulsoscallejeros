import { useState } from 'react'

const parseDate = (date) => {
	const [day, month, year] = date.split('/').map(Number)
	return new Date(year, month - 1, day).getTime()
}

export default function DeleteEventsPanel({ items, future, onDelete }) {
	const [status, setStatus] = useState('')
	const sortedItems = [...items].sort((first, second) => parseDate(second.date) - parseDate(first.date))

	return <section className="modify-results-panel"><h3>{future ? 'Modificar eventos próximos' : 'Modificar resultados'}</h3>{status ? <p className="save-status">{status}</p> : null}<div className="modify-results-list">{sortedItems.map((item) => <article className="modify-result-item" key={`${item.date}-${item.retador}-${item.oponente}-${item.hand}`}><div><strong>{item.retador} vs {item.oponente}</strong><span>{item.date} · {item.hand}</span></div><div className="modify-result-meta"><span>{future ? `${item.retadorRank} vs ${item.oponenteRank}` : `${item.result} · ${item.winner}`}</span><button type="button" className="delete-event-btn" onClick={async () => { if (!window.confirm(`¿Eliminar ${item.retador} vs ${item.oponente}?`)) return; await onDelete(item); setStatus('Eliminado.') }}>Eliminar</button></div></article>)}</div></section>
}
