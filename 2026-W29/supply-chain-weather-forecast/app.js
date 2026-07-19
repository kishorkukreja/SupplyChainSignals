fetch('./data/2026-W29.json').then(r=>r.json()).then(data=>{
  document.getElementById('headline').textContent=data.headline;
  document.getElementById('dek').textContent=data.dek;
  document.getElementById('horizon').textContent=data.forecast_horizon;
  document.getElementById('confidence').textContent=data.confidence;
  document.getElementById('stations').innerHTML=data.zones.map(z=>`<article class="station ${z.severity}"><p class="kicker">${z.name}</p><h3>${z.weather}</h3><p>${z.operator_meaning}</p><strong>Watch</strong><p>${z.watch}</p></article>`).join('');
  document.getElementById('cards').innerHTML=data.reference_cards.map(c=>`<article class="card"><span>${c.label}</span><strong>${c.value}</strong><p>${c.note}</p></article>`).join('');
  document.getElementById('translation').textContent=data.operator_translation;
  document.getElementById('watchlist').innerHTML=data.operator_watchlist.map(w=>`<li>${w}</li>`).join('');
  document.getElementById('insertTitle').textContent=data.newsletter_insert.title;
  document.getElementById('insertHeadline').textContent=data.newsletter_insert.headline;
  document.getElementById('insertBody').textContent=data.newsletter_insert.body;
  document.getElementById('insertOperator').textContent=data.newsletter_insert.operator_translation;
  document.getElementById('sources').innerHTML=data.sources.map(s=>`<li>${s}</li>`).join('');
}).catch(error=>{
  document.getElementById('headline').textContent='Weather data failed to load';
  document.getElementById('dek').textContent=String(error);
});
