async function loadForecast() {
  const response = await fetch('./data/2026-W33.json');
  const data = await response.json();

  document.getElementById('headline').textContent = data.headline;
  document.getElementById('dek').textContent = data.dek;
  document.getElementById('horizon').textContent = data.forecastHorizon;
  document.getElementById('confidence').textContent = data.confidence;

  document.getElementById('stationGrid').innerHTML = data.stations.map((station) => `
    <article class="station">
      <span><i class="severity ${station.severity}"></i> ${station.condition}</span>
      <h3>${station.label}</h3>
      <p><strong>Owner:</strong> ${station.owner}</p>
      <ul>${station.facts.map((fact) => `<li>${fact}</li>`).join('')}</ul>
      <p><strong>Operator meaning:</strong> ${station.operatorMeaning}</p>
      <p><strong>Watch:</strong> ${station.watch}</p>
    </article>
  `).join('');

  document.getElementById('referenceCards').innerHTML = data.referenceCards.map((card) => `
    <article class="card">
      <span>${card.label}</span>
      <strong>${card.value}</strong>
      <p>${card.note}</p>
    </article>
  `).join('');

  const insert = data.newsletterInsert;
  document.getElementById('newsletterCopy').innerHTML = `
    <h3>${insert.title}: ${insert.headline}</h3>
    <p>${insert.body}</p>
    <p><strong>Operator translation:</strong> ${insert.operatorTranslation}</p>
  `;
}

loadForecast().catch((error) => {
  document.getElementById('dek').textContent = `Forecast failed to load: ${error.message}`;
});
