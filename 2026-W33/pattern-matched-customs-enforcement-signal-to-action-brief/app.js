const views = Array.from(document.querySelectorAll('.view'));
const tabs = Array.from(document.querySelectorAll('[data-view-target]'));

const ownerLabels = {
  trade: 'Trade compliance',
  master: 'Product master data',
  sourcing: 'Sourcing / supplier management',
  logistics: 'Logistics',
  planning: 'Planning / S&OP',
  finance: 'Finance / pricing'
};

const decisionPlaybooks = {
  entry: {
    title: 'Hold approval until the origin claim has observable support.',
    action: 'Attach supplier origin support, routing evidence, broker notes, packaging/marking evidence where available and the human approver before releasing the entry response.',
    evidence: 'CBP pattern detection changes the review surface from forms alone to forms plus physical and behavioral evidence.',
    watch: ['CBP transshipment updates or detention patterns', 'Broker exception logs', 'USTR / Federal Register origin-treatment notices']
  },
  sku: {
    title: 'Treat product data as a duty-exposure control, not a catalog field.',
    action: 'Name one product-data owner for HTS, material composition, component provenance and counsel-approved treatment before commercial teams rely on the SKU position.',
    evidence: 'Section 232 derivative articles and drone/UAS origin categories make product attributes dated tariff variables.',
    watch: ['Aug. 27 derivative-duty comment window', 'Sept. 3 drone/UAS implementation', 'Master-data change requests']
  },
  supplier: {
    title: 'Convert supplier statements into defensible facility evidence.',
    action: 'Link supplier claim, facility disclosure, audit signal, unauthorized-production risk and legal/compliance approval before clearing the sourcing decision.',
    evidence: 'Forced-labor and supplier-monitoring signals mean supplier declarations can be challenged by inspections, audits or production evidence.',
    watch: ['Supplier audit exceptions', 'Forced-labor enforcement updates', 'Facility-disclosure gaps']
  },
  inventory: {
    title: 'Use simulation as a challenge step, not an auto-approval.',
    action: 'Compare the planned allocation or customer promise with simulation output, service risk and approval owner; record the override reason if humans release against the signal.',
    evidence: 'Target’s Proxima example shows inventory decisions being tested before physical release, while humans still own promises and exceptions.',
    watch: ['Pilot accuracy claims', 'On-shelf availability movement', 'August import and demand data']
  },
  route: {
    title: 'Make the route decision carry its own compliance context.',
    action: 'Tie the booking or fallback route to origin, rate/volume signal, inland-capacity exposure and customer promise before logistics executes the change.',
    evidence: 'Freight, import and Rhine signals can diverge; the physical move does not prove the economic or compliance claim.',
    watch: ['Descartes import actuals', 'NRF/Hackett forecasts', 'Xeneta/FreightWaves lane rates', 'Rhine Kaub levels']
  }
};

const frictionPrompts = {
  missing: 'First task: gather the proof now, not after the exception arrives.',
  conflict: 'First task: reconcile conflicting records and preserve the audit trail.',
  stale: 'First task: refresh the master or supplier data before relying on it.',
  approval: 'First task: name the human approver and escalation path.',
  monitoring: 'First task: assign the external watch item to a named owner.'
};

function showView(id) {
  views.forEach((view) => {
    const active = view.id === id;
    view.hidden = !active;
    view.classList.toggle('is-active', active);
  });
  tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.viewTarget === id));
}

tabs.forEach((tab) => tab.addEventListener('click', () => showView(tab.dataset.viewTarget)));

function formValues() {
  return Object.fromEntries(new FormData(document.getElementById('briefForm')).entries());
}

function buildBrief() {
  const values = formValues();
  const playbook = decisionPlaybooks[values.decision];
  const owner = ownerLabels[values.owner];
  const timing = values.timing === '24' ? 'within 24 hours' : values.timing === '72' ? 'within 72 hours' : values.timing === 'window' ? 'before the Aug. 27 / Sept. 3 policy clocks' : 'this week';

  document.getElementById('readoutDek').textContent = `Context: ${owner} owns a ${values.chain.replace('-', ' ')} decision due ${timing}.`;
  document.getElementById('recommendationTitle').textContent = playbook.title;
  document.getElementById('recommendationText').textContent = playbook.action;
  document.getElementById('rationaleText').textContent = `${playbook.evidence} Constraint priority: ${values.constraint}. ${frictionPrompts[values.friction]}`;

  const steps = [
    `${owner}: name the declared claim and the observed surface that could contradict it.`,
    `Trade / legal / finance partner: approve the defensible position or reserve before release.`,
    `Planning or customer owner: update promises only after the evidence and approval step are attached.`
  ];
  const ownerSteps = document.getElementById('ownerSteps');
  ownerSteps.innerHTML = steps.map((step) => `<li>${step}</li>`).join('');

  const watchList = document.getElementById('watchList');
  watchList.innerHTML = playbook.watch.map((item) => `<li>${item}</li>`).join('');

  showView('outputView');
}

document.getElementById('buildBrief').addEventListener('click', buildBrief);
buildBrief();
showView('startView');
