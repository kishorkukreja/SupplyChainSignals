const severityColor = { red: '#e11016', orange: '#d6782f', yellow: '#d5ad42' };

async function loadForecast() {
  const response = await fetch('./data/2026-W31.json');
  if (!response.ok) {
    throw new Error(`Could not load forecast JSON: ${response.status}`);
  }
  return response.json();
}

function stationTemplate(zone) {
  return `<article class="station" style="--severity:${severityColor[zone.severity] || '#d5ad42'}">
    <div>
      <p class="kicker">${zone.name}</p>
      <h3>${zone.weather}</h3>
      <p>${zone.operator_meaning}</p>
    </div>
    <p class="weather">Watch: ${zone.watch}</p>
  </article>`;
}

function referenceTemplate(card) {
  return `<article class="reference-card"><span>${card.label}</span><strong>${card.value}</strong><p>${card.note}</p></article>`;
}

function renderForecast(data) {
  document.getElementById('headline').textContent = data.headline;
  document.getElementById('summary').textContent = data.dek;
  document.getElementById('dek').textContent = `${data.forecast_horizon} · ${data.confidence} confidence · ${data.chain_candidate}`;
  document.getElementById('stationGrid').innerHTML = data.zones.map(stationTemplate).join('');
  document.getElementById('referenceGrid').innerHTML = data.reference_cards.map(referenceTemplate).join('');
  document.getElementById('operatorTranslation').textContent = data.operator_translation;
  document.getElementById('watchList').innerHTML = data.operator_watchlist.map((item) => `<li>${item}</li>`).join('');
  document.getElementById('sourceList').innerHTML = data.sources.map((item) => `<li>${item}</li>`).join('');
}

loadForecast().then(renderForecast).catch((error) => {
  document.getElementById('headline').textContent = 'Forecast unavailable';
  document.getElementById('summary').textContent = error.message;
});
