async function loadForecast() {
  const response = await fetch('./data/2026-W32.json');
  if (!response.ok) throw new Error(`Could not load forecast data: ${response.status}`);
  return response.json();
}

function list(items) {
  return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

function renderStation(station) {
  return `
    <article class="station" id="${station.id}">
      <span>${station.owner}</span>
      <h3>${station.label}</h3>
      <p class="condition">${station.condition}</p>
      ${list(station.facts)}
      <div class="decision">
        <p><b>Decision:</b> ${station.decision}</p>
        <p><b>Watch:</b> ${station.watch}</p>
      </div>
    </article>
  `;
}

function render(data) {
  document.getElementById('forecast-title').textContent = data.title;
  document.getElementById('forecast-subtitle').textContent = `${data.subtitle} Source mode: ${data.sourceMode}.`;
  document.getElementById('insert-headline').textContent = data.newsletterInsert.headline;
  document.getElementById('insert-copy').textContent = data.newsletterInsert.copy;
  document.getElementById('weather-stations').innerHTML = data.stations.map(renderStation).join('');
  document.getElementById('sources').innerHTML = data.sources.map(source => `<li>${source}</li>`).join('');
}

loadForecast().then(render).catch(error => {
  document.getElementById('forecast-title').textContent = 'Forecast data unavailable';
  document.getElementById('forecast-subtitle').textContent = error.message;
});
