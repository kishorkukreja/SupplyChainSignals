const state = {
  exposure: 'Food ingredient or commodity category',
  decision: 'Protect scarce supplier capacity',
  cause: 'Weather or commodity shock',
  owner: 'Category team',
  constraint: 'Service level',
  falsifier: 'Commodity/category data diverges'
};

const views = document.querySelectorAll('.view');
const tabs = document.querySelectorAll('.view-tab');

function showView(id) {
  views.forEach((view) => { view.hidden = view.id !== id; });
  tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.view === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach((tab) => tab.addEventListener('click', () => showView(tab.dataset.view)));
document.querySelectorAll('[data-jump]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.jump)));

const form = document.getElementById('briefForm');
const reset = document.getElementById('resetBrief');

function valuesFromForm() {
  return Object.fromEntries(new FormData(form).entries());
}

function actionVerb(decision) {
  if (decision.includes('Protect')) return 'Protect only the supplier capacity tied to the proven cause';
  if (decision.includes('inventory')) return 'Stage inventory behind the cause family, not the headline';
  if (decision.includes('premium')) return 'Approve premium freight only after lane evidence matches the symptom';
  if (decision.includes('price')) return 'Rewrite customer price language around the named driver';
  if (decision.includes('compliance')) return 'Escalate treatment proof before cash or entry promises move';
  return 'Hold spend until the attribution file is clean enough to assign an owner';
}

function rationaleFor(v) {
  const map = {
    'Food ingredient or commodity category': 'Field-to-fork pressure is category-specific: sugar weather, cereal logistics, oils, dairy and meat do not share one operating response.',
    'Manufacturing input / supplier delivery': 'Manufacturing delivery pressure and price pressure can reflect supplier lead time rather than broad demand strength.',
    'Services supplier or indirect spend': 'Services demand and prices strengthened while supplier deliveries eased, so the owner is not necessarily the same as a manufacturing bottleneck.',
    'Ocean freight / import lane': 'A September import air pocket, carrier behavior and lane pricing must stay separate before bookings or surcharges change.',
    'AI hardware / power equipment project': 'Chip flow, transformers, cooling and grid connections are different constraints; treating them as generic AI demand misallocates capital.',
    'Auto/localization program': 'A stoppage or localization delay can be weak demand, parts shortage, tooling economics or policy timing; one headline is not enough.'
  };
  return map[v.exposure] || 'Pressure is not a cause; attribution quality decides the action owner.';
}

function queueFor(v) {
  return [
    `${v.owner}: name the symptom and the metric family before clearing ${v.decision.toLowerCase()}.`,
    `Proof: collect one source-of-record update tied to ${v.cause.toLowerCase()}, plus one counter-signal.`,
    `Decision gate: optimize for ${v.constraint.toLowerCase()} only if ${v.falsifier.toLowerCase()} does not break the attribution.`
  ];
}

function watchFor(v) {
  const base = [
    'Port of Los Angeles, Descartes, NRF/Hackett or customs data confirming or rejecting the September import-air-pocket warning.',
    'FAO or country-level updates on sugar, cereals, Black Sea routes, drought and fertilizer flows.',
    'Utility collateral, study-fee or permitting filters for data-center load requests.'
  ];
  if (v.exposure.includes('Food')) return [base[1], 'Supplier commentary separating category-specific weather, route and fertilizer causes.', 'Customer price acceptance by category rather than basket average.'];
  if (v.exposure.includes('freight') || v.exposure.includes('Ocean')) return [base[0], 'Carrier or forwarder evidence that fuel and canal surcharges hold delivered cost above demand-implied levels.', 'Clean dated lane evidence before Drewry metadata is charted.'];
  if (v.exposure.includes('AI')) return [base[2], 'Power-equipment lead-time commentary separating chips from transformers and grid timing.', 'Air-cargo or cooling-system component signals.'];
  if (v.exposure.includes('Services')) return ['Next ISM Services price and new-order readings.', 'Supplier delivery evidence that confirms easing rather than hidden bottlenecks.', 'Customer renewal or surcharge acceptance by service category.'];
  return ['Next ISM manufacturing prices, supplier deliveries, imports and backlog readings.', 'Supplier confirmation that lead time, allocation or demand is the real cause.', 'Customer order mix evidence that falsifies the assumed constraint.'];
}

function renderReadout(values) {
  Object.assign(state, values);
  document.getElementById('readoutIntro').textContent = `${values.exposure}: ${values.owner} owns the next move because the likely cause is ${values.cause.toLowerCase()}.`;
  document.getElementById('decisionText').textContent = actionVerb(values.decision) + '.';
  document.getElementById('rationaleText').textContent = rationaleFor(values);
  document.getElementById('failureText').textContent = `Failure mode: ${values.owner} optimizes for ${values.constraint.toLowerCase()} before ${values.cause.toLowerCase()} is proven.`;
  document.getElementById('ownerQueue').innerHTML = queueFor(values).map((item) => `<li>${item}</li>`).join('');
  document.getElementById('watchlist').innerHTML = watchFor(values).map((item) => `<li>${item}</li>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderReadout(valuesFromForm());
  showView('outputReadoutView');
});

reset.addEventListener('click', () => {
  form.reset();
  renderReadout(valuesFromForm());
});

renderReadout(state);
