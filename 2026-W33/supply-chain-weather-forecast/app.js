async function loadForecast() {
  const response = await fetch('./data/2026-W33.json');
  if (!response.ok) throw new Error(`Unable to load forecast data: ${response.status}`);
  return response.json();
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderStation(station) {
  const card = el('article', 'station-card');
  card.id = station.id;
  card.appendChild(el('span', 'station-condition', station.condition));
  card.appendChild(el('h3', null, station.label));
  card.appendChild(el('p', 'owner', `Owner: ${station.owner}`));
  const facts = el('ul', 'facts');
  station.facts.forEach(fact => facts.appendChild(el('li', null, fact)));
  card.appendChild(facts);
  const decision = el('p', 'decision', station.decision);
  card.appendChild(decision);
  card.appendChild(el('p', 'watch', `Watch: ${station.watch}`));
  return card;
}

function renderSources(sources) {
  const list = document.getElementById('sources');
  list.innerHTML = '';
  sources.forEach(source => list.appendChild(el('li', null, source)));
}

loadForecast().then(data => {
  document.getElementById('forecast-title').textContent = `${data.week}: ${data.title}`;
  document.getElementById('forecast-subtitle').textContent = data.subtitle;
  document.getElementById('insert-headline').textContent = data.newsletterInsert.headline;
  document.getElementById('insert-copy').textContent = data.newsletterInsert.copy;
  const stations = document.getElementById('weather-stations');
  stations.innerHTML = '';
  data.stations.forEach(station => stations.appendChild(renderStation(station)));
  renderSources(data.sources);
}).catch(error => {
  document.getElementById('forecast-title').textContent = 'Forecast data unavailable';
  document.getElementById('forecast-subtitle').textContent = error.message;
});
