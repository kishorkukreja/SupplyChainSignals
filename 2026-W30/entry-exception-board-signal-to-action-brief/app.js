const views = [...document.querySelectorAll('.view')];
const tabs = [...document.querySelectorAll('[data-view-target]')];

function showView(name) {
  views.forEach((view) => {
    const active = view.dataset.view === name;
    view.classList.toggle('is-active', active);
    view.hidden = !active;
  });
  document.querySelectorAll('.view-tab').forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.viewTarget === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach((button) => button.addEventListener('click', () => showView(button.dataset.viewTarget)));

const playbook = {
  'Covered import portfolio / mixed origins': {
    owner: 'COO or trade compliance lead',
    file: 'one entry exception board',
    move: 'Create rows for product, origin, HTS, mechanism, exemption status, vessel status, entry deadline, customer commitment and owner.',
    fail: 'each function keeps a different exposure file'
  },
  'India-linked products': {
    owner: 'Procurement with trade compliance',
    file: 'exempt / exposed product-family split',
    move: 'Separate the reported exempt and exposed product families before applying the 10% country headline to quotes or purchase orders.',
    fail: 'the country rate hides product-level treatment'
  },
  'Brazil-linked products': {
    owner: 'Trade compliance with finance',
    file: 'Brazil stacked-duty review',
    move: 'Split Brazil rows into exposed, exempt, stacked and uncertain before finance refreshes landed cost or margin reserves.',
    fail: 'the company models one tariff while the real treatment depends on product and mechanism'
  },
  'Apparel or textile shipment': {
    owner: 'Trade compliance',
    file: 'origin-proof and broker-instruction packet',
    move: 'Tie supplier proof, HTS, TRQ or exemption language and vessel status to the entry filing before the transition clock closes.',
    fail: 'broker instructions arrive after the transition window'
  },
  'Generic drug / API input': {
    owner: 'Procurement and quality',
    file: 'qualification runway board',
    move: 'Treat the reported two-year qualifying window as runway for API, site, packaging, validation and commercial renegotiation work.',
    fail: 'a duty-free window is mistaken for safety instead of qualification time'
  },
  'Retail or ecommerce import surge': {
    owner: 'S&OP lead with logistics',
    file: 'pull-forward and customer-promise review',
    move: 'Separate import-volume strength from demand strength, then decide which customer commitments need service or price caveats.',
    fail: 'pull-forward inventory is treated as confirmed demand'
  }
};

function generateBrief() {
  const exposure = document.getElementById('exposure').value;
  const deadline = document.getElementById('deadline').value;
  const constraint = document.getElementById('constraint').value;
  const evidence = document.getElementById('evidence').value;
  const authority = document.getElementById('authority').value;
  const friction = document.getElementById('friction').value;
  const selected = playbook[exposure];

  document.getElementById('readoutIntro').textContent = `${exposure}: treat ${deadline.toLowerCase()} as the operating clock. The first constraint is ${constraint.toLowerCase()}, not a generic tariff forecast.`;
  document.getElementById('recommendationText').textContent = `Open the ${selected.file}; make ${selected.owner} the first accountable owner.`;
  document.getElementById('recommendationRationale').textContent = `Evidence state: ${evidence.toLowerCase()}. Decision authority: ${authority.toLowerCase()}. Main friction: ${friction.toLowerCase()}. The failure mode is ${selected.fail}.`;

  const queue = [
    [selected.owner, 'Primary decision', selected.move],
    ['Finance', 'Margin / reserve check', 'Refresh landed-cost and customer-price exposure only after the row has confirmed product, origin, HTS, exemption and entry timing.'],
    ['Logistics / broker', 'Entry execution', deadline.includes('28 July') || friction.includes('Broker') ? 'Confirm vessel or warehouse status and send broker instructions before the cutoff.' : 'Confirm whether timing changes duty, service or customer communication.'],
    ['Sales / customer owner', 'Commitment language', constraint.includes('Service') || friction.includes('Customer') ? 'Add service or price caveats before the quote is accepted.' : 'Confirm no customer promise depends on an unowned exception row.'],
    ['Executive sponsor', 'Escalation gate', `Escalate only if ${selected.fail}; otherwise keep the board moving at the functional-owner level.`]
  ];

  document.getElementById('ownerQueue').innerHTML = queue
    .map(([owner, label, detail]) => `<article class="owner-item"><span>${label}</span><strong>${owner}</strong><p>${detail}</p></article>`)
    .join('');
  showView('output-readout');
}

document.getElementById('generateBrief').addEventListener('click', generateBrief);
