async function loadForecast() {
  const response = await fetch('./data/2026-W34.json');
  const forecast = await response.json();
  document.getElementById('dek').textContent = forecast.dek;
  document.getElementById('headline').textContent = forecast.headline;
  renderStations(forecast.stations);
  renderCards(forecast.reference_cards);
  renderWatchlist(forecast.operator_watchlist);
  renderNewsletter(forecast.newsletter_insert);
}

function renderStations(stations) {
  const root = document.getElementById('stations');
  root.innerHTML = '';
  stations.forEach((station) => {
    const article = document.createElement('article');
    article.className = `station ${station.severity}`;
    article.innerHTML = `
      <p class="owner">${station.owner}</p>
      <h3>${station.label}</h3>
      <span class="condition">${station.condition}</span>
      <ul>${station.facts.map((fact) => `<li>${fact}</li>`).join('')}</ul>
      <p>${station.operatorMeaning || station.operator_meaning}</p>
      <p><b>Watch:</b> ${station.watch}</p>
    `;
    root.appendChild(article);
  });
}

function renderCards(cards) {
  const root = document.getElementById('referenceCards');
  root.innerHTML = '';
  cards.forEach((card) => {
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `<h3>${card.label}</h3><strong>${card.value}</strong><p>${card.note}</p>`;
    root.appendChild(article);
  });
}

function renderWatchlist(items) {
  const root = document.getElementById('watchlist');
  root.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    root.appendChild(li);
  });
}

function renderNewsletter(insert) {
  document.getElementById('newsletterTitle').textContent = insert.title + ': ' + insert.headline;
  document.getElementById('newsletterBody').textContent = insert.body;
  document.getElementById('operatorTranslation').textContent = 'Operator translation: ' + insert.operator_translation;
}

loadForecast().catch((error) => {
  document.getElementById('headline').textContent = 'Forecast data failed to load';
  console.error(error);
});
