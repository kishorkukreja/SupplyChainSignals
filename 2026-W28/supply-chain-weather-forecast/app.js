fetch('./data/2026-W28.json').then(r=>r.json()).then(data=>{
  document.getElementById('headline').textContent=data.headline;
  document.getElementById('dek').textContent=data.dek;
  document.getElementById('horizon').textContent=data.forecast_horizon;
  document.getElementById('confidence').textContent=data.confidence;
  document.getElementById('stations').innerHTML=data.zones.map(z=>`<article class="station ${z.severity}"><p class="kicker">${z.name}</p><h3>${z.weather}</h3><p>${z.operator_meaning}</p><strong>Watch</strong><p>${z.watch}</p></article>`).join('');
  document.getElementById('cards').innerHTML=data.reference_cards.map(c=>`<article class="card"><span>${c.label}</span><strong>${c.value}</strong><p>${c.note}</p></article>`).join('');
  document.getElementById('translation').textContent=data.operator_translation;
  document.getElementById('watchlist').innerHTML=data.operator_watchlist.map(w=>`<li>${w}</li>`).join('');
});
