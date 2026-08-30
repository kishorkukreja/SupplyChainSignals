const views = Array.from(document.querySelectorAll('.view'));
const tabs = Array.from(document.querySelectorAll('.view-tab'));

function showView(id) {
  views.forEach((view) => { view.hidden = view.id !== id; });
  tabs.forEach((tab) => { tab.classList.toggle('is-active', tab.dataset.view === id); });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (event) => {
  const tab = event.target.closest('[data-view]');
  const target = event.target.closest('[data-view-target]');
  if (tab) showView(tab.dataset.view);
  if (target) showView(target.dataset.viewTarget);
});

const copy = {
  auto: {
    title: 'Put auto parts on a boundary-first capacity file.',
    rationale: 'The 1 January 2027 auto clock is not just a rate scenario; it decides which parts, plants and suppliers are protected by a deal or exposed by it.',
    watch: ['Canada auto talks on content rules and parts capacity', 'Any change to the 1 January 2027 tariff threat', 'VW supervisory board outcome on 4 September']
  },
  food: {
    title: 'Treat food exposure as product-list and naming risk, not one food index.',
    rationale: 'Seafood leaving Canada\'s list and cheese names entering trade talks show that product access can change before shipments move.',
    watch: ['Final Canadian product coverage before 8 September', 'Further removals after seafood and fish', 'Official U.S.-Mexico language on cheese names']
  },
  packaging: {
    title: 'Move packaging materials into a product-master-data review.',
    rationale: 'Pulp, paper, corrugated, aluminum, steel, glass and tin mill steel exposure depends on material, name and classification boundaries.',
    watch: ['Official Canada product tables', 'Material-specific tariff or exemption language', 'Customer price-file caveats tied to packaging inputs']
  },
  industrial: {
    title: 'Separate strategic input localization from tariff-rate modeling.',
    rationale: 'CXMT, Lenovo and polysilicon items are watch lanes; act only where a product boundary changes supplier allocation or capacity priority.',
    watch: ['China manufacturing PMI and high-tech export detail', 'Follow-on CXMT and Lenovo capacity evidence', 'Polysilicon policy updates']
  },
  mixed: {
    title: 'Create one boundary register, then split owners by product family.',
    rationale: 'A mixed portfolio should not average policy, freight, food and capacity data. It needs product-level source-of-record ownership.',
    watch: ['Final product lists and exemptions', 'Freight indexes kept as separate context', 'Company-specific capacity decisions']
  }
};

const decisionText = {
  classify: 'Confirm coverage against the source-of-record product boundary.',
  supplier: 'Protect suppliers or plants that become strategic if the boundary hardens.',
  pricing: 'Update customer price and availability language with boundary caveats.',
  inventory: 'Decide what to pull forward, hold or release before the boundary changes.',
  cash: 'Separate tariff cost, refund cash, reserves and working-capital treatment.'
};

const failureText = {
  'stale-list': 'Teams act on an announcement-day list after the boundary has moved.',
  'data-gap': 'A product is priced, sourced or promised under the wrong name, HTS, label or origin field.',
  'capacity-sticky': 'Supplier or plant capacity is lost before the negotiation or definition settles.',
  'customer-promise': 'Commercial promises stable price or availability before the product boundary is settled.',
  'finance-unclear': 'Temporary relief, refund cash and permanent tariff cost are treated as the same thing.'
};

function value(id) { return document.getElementById(id).value; }

function generateBrief() {
  const family = value('family');
  const decision = value('decision');
  const constraint = value('constraint');
  const owner = value('owner');
  const friction = value('friction');
  const clock = value('clock');
  const selected = copy[family];

  document.getElementById('recommendationTitle').textContent = selected.title;
  document.getElementById('recommendationBody').textContent = `${selected.rationale} Optimize for ${constraint.replace('-', ' ')} by having ${owner} own the first decision, not by waiting for a cleaner tariff headline.`;
  document.getElementById('decisionOut').textContent = decisionText[decision];
  document.getElementById('ownerOut').textContent = owner;
  document.getElementById('failureOut').textContent = failureText[friction];

  const clockText = {
    vw: '4 September: check whether VW converts trade and demand pressure into supplier or plant decisions.',
    canada: '8 September: verify final Canadian coverage, removals and rate buckets before commitments go live.',
    auto: '1 January 2027: track whether the Canadian auto tariff threat hardens, changes or becomes a capacity-preservation deal.',
    cheese: 'Cheese-name talks: watch official U.S.-Mexico language on protected names and market access.',
    freight: 'Freight readings: keep Drewry, Xeneta, Freightos and port data separate from product-boundary exposure.'
  }[clock];

  const queue = [
    `Trade compliance: capture the latest authority, effective date and caveat for the exposed product family.`,
    `Product master data: reconcile names, HTS, composition, labels, material and country treatment against the boundary.`,
    `${owner}: decide whether the local action is classify, protect, price, inventory or cash treatment.`,
    `Finance and commercial: add customer and margin caveats where the boundary is not final.`,
    `Operating lead: set a 72-hour review tied to ${clockText}`
  ];

  document.getElementById('ownerQueue').innerHTML = queue.map((item) => `<li>${item}</li>`).join('');
  document.getElementById('watchList').innerHTML = [...selected.watch, clockText].map((item) => `<li>${item}</li>`).join('');
  showView('output-readout');
}

document.getElementById('buildBrief').addEventListener('click', generateBrief);
generateBrief();
showView('start');
