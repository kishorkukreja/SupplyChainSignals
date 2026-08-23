const tabs = document.querySelectorAll('.view-tab');
const views = document.querySelectorAll('.view');

function showView(id) {
  views.forEach((view) => { view.hidden = view.id !== id; });
  tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.view === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach((tab) => tab.addEventListener('click', () => showView(tab.dataset.view)));
document.querySelectorAll('[data-jump]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.jump)));

const exposureCopy = {
  beef: 'Beef exposure: use the 90-day import window as a price-and-availability bridge, not as proof that domestic herd capacity has recovered.',
  lettuce: 'Fresh produce exposure: treat a low lettuce price as a trust signal until food safety and qualified supplier scale are proved.',
  oils: 'Edible-oil exposure: substitution toward soyoil buys input flexibility but moves stress into another origin, port and commodity lane.',
  sugar: 'Sugar exposure: policy tools can cap near-term pressure, but they need an expiry date and a domestic-supply read.',
  grain: 'Grain exposure: alternate origins may protect supply but often transfer the problem into landed cost, vessel risk and insurance.',
  retail: 'Retail exposure: price cuts can defend traffic while shifting the uncovered gap to finance and replenishment owners.'
};

const ownerNames = {
  procurement: 'Category procurement',
  foodsafety: 'Food safety / quality',
  merchandising: 'Merchandising / commercial',
  finance: 'Finance',
  logistics: 'Logistics',
  policy: 'Policy / government affairs'
};

const constraintCopy = {
  herd: 'The slow constraint is biological herd rebuild, so do not let a short import window reset longer-cycle assumptions.',
  supplier: 'The slow constraint is qualified supplier scale, so substitution must include qualification, volume and service proof.',
  trust: 'The slow constraint is trust recovery, so falling price may be broken demand rather than available safe supply.',
  route: 'The slow constraint is route reliability, so alternate origin math must include freight, insurance and timing.',
  crop: 'The slow constraint is crop or commodity availability, so relief should be tied to a named source and next data release.',
  budget: 'The slow constraint is budget or margin absorption, so finance needs the bridge amount, owner and stop date.'
};

const watchlists = {
  beef: ['Final supplier-country mechanics for the U.S. beef import action.', 'U.S. cattle herd rebuilding signals and plant closure or reopening announcements.', 'Producer response if imports soften prices before capacity can rebuild.'],
  lettuce: ['Taylor Farms customer actions and recall updates.', 'Lettuce demand recovery versus additional food-safety evidence.', 'Buyer statements about qualified alternate supplier scale.'],
  oils: ['September sunflower and soyoil import data for India.', 'Black Sea shipment delays and port handling constraints.', 'Relative soyoil pricing versus sunflower availability.'],
  sugar: ['Whether India finalizes sugar imports, stock limits or mill-allocation changes.', 'Festival-demand signals and wholesale price behavior.', 'Domestic mill response to any government measure.'],
  grain: ['Black Sea vessel movements, insurance conditions and attack risk.', 'Replacement-origin price spreads and landed-cost changes.', 'Buyer announcements about origin switching.'],
  retail: ['Retailer price-cut breadth and duration.', 'Basket weakness versus traffic improvement.', 'Supplier funding requests and margin-bridge expiry dates.']
};

function selected(id) { return document.getElementById(id).value; }

function buildQueue(values) {
  const owner = ownerNames[values.owner];
  return [
    `${owner}: open a relief-gap file naming the exact relief lever, exposed category and expiry point.`,
    `Procurement + operations: prove what capacity remains unresolved — ${constraintCopy[values.constraint].toLowerCase()}`,
    `Finance: approve a margin bridge only with a stop date and a trigger for when the upstream constraint returns to the P&L.`,
    `Commercial owner: revise any customer or shelf promise that depends on relief lasting longer than the evidence supports.`,
    `Executive sponsor: document the failure mode: ${document.querySelector(`#friction option[value="${values.friction}"]`).textContent}.`
  ];
}

document.getElementById('brief-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const values = {
    exposure: selected('exposure'), relief: selected('relief'), constraint: selected('constraint'),
    decision: selected('decision'), owner: selected('owner'), friction: selected('friction')
  };
  const reliefText = document.querySelector(`#relief option[value="${values.relief}"]`).textContent;
  const decisionText = document.querySelector(`#decision option[value="${values.decision}"]`).textContent;
  const owner = ownerNames[values.owner];
  document.getElementById('recommendation-title').textContent = `${owner} owns the first relief-gap file.`;
  document.getElementById('recommendation-summary').textContent = `${exposureCopy[values.exposure]} The near-term decision is to ${decisionText.toLowerCase()} using ${reliefText.toLowerCase()}.`;
  document.getElementById('decision-copy').textContent = `Approve the relief only as a timed bridge. Require ${owner} to show what capacity, trust, route or supply has actually been replaced before extending the promise.`;
  document.getElementById('rationale-copy').textContent = `${constraintCopy[values.constraint]} W34's signal is that relief changes the commercial edge first; upstream capacity changes later, if it changes at all.`;
  const queue = document.getElementById('owner-queue');
  queue.innerHTML = '';
  buildQueue(values).forEach((item) => { const li = document.createElement('li'); li.textContent = item; queue.appendChild(li); });
  const watch = document.getElementById('watchlist');
  watch.innerHTML = '';
  watchlists[values.exposure].forEach((item) => { const li = document.createElement('li'); li.textContent = item; watch.appendChild(li); });
  showView('output-readout-view');
});
