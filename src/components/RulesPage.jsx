export default function RulesPage({ rules, copy }) {
  const visibleRules = rules.filter((rule) => !rule.title.includes('Máximo 5') && !rule.title.includes('Maximum 5') && !rule.title.includes('Максимум 5'))
  return <section className="rules-page standalone-page"><div className="section-heading"><div><p className="eyebrow alt">{copy.rules}</p><h2>{copy.gameRules}</h2></div><a href="/" className="ghost-btn">{copy.backToRanking}</a></div><article className="rules-card"><ul className="rule-list">{visibleRules.map((rule, index) => <li key={rule.title}><span className="rule-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{rule.title}</strong><span>{rule.text}</span></div></li>)}</ul></article></section>
}
