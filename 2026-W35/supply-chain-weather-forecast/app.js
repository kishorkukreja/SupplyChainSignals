const severityColor = { red: '#e11016', orange: '#f07b2d', yellow: '#dec66b', gray: '#777777' };

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

async function loadForecast() {
  const response = await fetch('./data/2026-W35.json');
  if (!response.ok) throw new Error(`Could not load forecast data: ${response.status}`);
  const data = await response.json();

  document.getElementById('weekLabel').textContent = `${data.week} · ${data.title}`;
  document.getElementById('headline').textContent = data.headline;
  document.getElementById('dek').textContent = data.dek;
  document.getElementById('sourceMode').textContent = data.sourceMode || data.source_mode;
  document.getElementById('horizon').textContent = `${data.forecastHorizon || data.forecast_horizon} · confidence ${data.confidence}`;

  document.getElementById('referenceCards').innerHTML = data.reference_cards.map((card) => `
    <article><span>${card.label}</span><strong>${card.value}</strong><p>${card.note}</p></article>
  `).join('');

  document.getElementById('stations').innerHTML = data.stations.map((station) => `
    <article class="station" style="--severity:${severityColor[station.severity] || severityColor.gray}">
      <span>${station.label}</span>
      <h3>${station.condition}</h3>
      <p class="owner">Owner: ${station.owner}</p>
      <ul>${listItems(station.facts)}</ul>
      <p class="operator">Operator read: ${station.operatorMeaning || station.operator_meaning}</p>
      <p>Watch: ${station.watch}</p>
    </article>
  `).join('');

  document.getElementById('insertHeadline').textContent = data.newsletter_insert.headline;
  document.getElementById('insertBody').textContent = data.newsletter_insert.body;
  document.getElementById('insertTranslation').textContent = data.newsletter_insert.operator_translation;
}

loadForecast().catch((error) => {
  document.getElementById('headline').textContent = 'Forecast data unavailable';
  document.getElementById('dek').textContent = error.message;
});
