fetch('./data/2026-W30.json')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('headline').textContent = data.headline;
    document.getElementById('dek').textContent = data.dek;
    document.getElementById('horizon').textContent = data.forecast_horizon;
    document.getElementById('confidence').textContent = data.confidence;
    document.getElementById('stations').innerHTML = data.zones
      .map((zone) => `<article class="station ${zone.severity}"><p class="kicker">${zone.name}</p><h3>${zone.weather}</h3><p>${zone.operator_meaning}</p><strong>Watch</strong><p>${zone.watch}</p></article>`)
      .join('');
    document.getElementById('cards').innerHTML = data.reference_cards
      .map((card) => `<article class="card"><span>${card.label}</span><strong>${card.value}</strong><p>${card.note}</p></article>`)
      .join('');
    document.getElementById('translation').textContent = data.operator_translation;
    document.getElementById('watchlist').innerHTML = data.operator_watchlist.map((item) => `<li>${item}</li>`).join('');
    document.getElementById('insertTitle').textContent = data.newsletter_insert.title;
    document.getElementById('insertHeadline').textContent = data.newsletter_insert.headline;
    document.getElementById('insertBody').textContent = data.newsletter_insert.body;
    document.getElementById('insertOperator').textContent = data.newsletter_insert.operator_translation;
    document.getElementById('sources').innerHTML = data.sources.map((source) => `<li>${source}</li>`).join('');
  })
  .catch((error) => {
    document.getElementById('headline').textContent = 'Weather data failed to load';
    document.getElementById('dek').textContent = String(error);
  });
