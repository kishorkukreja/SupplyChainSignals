async function loadForecast() {
  const response = await fetch('./data/2026-W36.json');
  if (!response.ok) throw new Error(`Could not load forecast: ${response.status}`);
  return response.json();
}

function severityLabel(severity) {
  return { red: 'Red weather', orange: 'Orange watch', yellow: 'Yellow watch' }[severity] || 'Watch';
}

function render(data) {
  document.getElementById('headline').textContent = data.headline;
  document.getElementById('dek').textContent = data.dek;
  document.getElementById('horizon').textContent = data.forecast_horizon;
  document.getElementById('confidence').textContent = data.confidence;
  document.getElementById('sourceMode').textContent = data.source_mode;

  document.getElementById('zonesGrid').innerHTML = data.zones.map((zone) => `
    <article class="weather-card" data-severity="${zone.severity}">
      <span>${zone.name} · ${severityLabel(zone.severity)}</span>
      <h3>${zone.weather}</h3>
      <p>${zone.operator_meaning}</p>
      <p><strong>Watch:</strong> ${zone.watch}</p>
    </article>
  `).join('');

  document.getElementById('referenceCards').innerHTML = data.reference_cards.map((card) => `
    <article><span>${card.label}</span><strong>${card.value}</strong><p>${card.note}</p></article>
  `).join('');

  document.getElementById('operatorWatchlist').innerHTML = data.operator_watchlist.map((item) => `<li>${item}</li>`).join('');
  document.getElementById('insertTitle').textContent = data.newsletter_insert.title;
  document.getElementById('insertBody').textContent = `${data.newsletter_insert.headline} ${data.newsletter_insert.body}`;
  document.getElementById('insertTranslation').textContent = data.newsletter_insert.operator_translation;
}

loadForecast().then(render).catch((error) => {
  document.getElementById('headline').textContent = 'Forecast unavailable';
  document.getElementById('dek').textContent = error.message;
});
