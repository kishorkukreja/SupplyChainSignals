const views = [...document.querySelectorAll('.view')];
const tabs = [...document.querySelectorAll('.view-tab')];

const laneCopy = {
  origin: {
    lane: 'Origin proof',
    owner: 'Trade compliance',
    decision: 'Move the shipment or supplier into an origin-proof exception file before approving the customer promise.',
    rationale: 'Reuters transshipment reporting and official USTR/Federal Register signals make origin proof an inspection-ready record, not a policy note.',
    queue: ['Attach supplier, routing, marking, packaging and entry evidence to the exposed record.', 'Name the legal/compliance approver and broker handoff owner.', 'Set the failure mode: missing proof, mismatch, delayed entry or customer promise at old landed cost.'],
    watch: ['CBP enforcement or CSMS updates', 'USTR and Federal Register corrections', 'Reported transshipment inspection patterns']
  },
  classification: {
    lane: 'Product classification',
    owner: 'Trade compliance + master data',
    decision: 'Freeze the product-master-data row until HTS, classification and approval evidence are attached.',
    rationale: 'Drone duties, Section 232 derivative proposals and tariff updates show that classification is still a live owner file.',
    queue: ['List exposed SKUs and the master-data fields that drive tariff treatment.', 'Assign one owner for HTS, product description, country and exemption evidence.', 'Escalate only rows where the decision changes cost, compliance or customer terms.'],
    watch: ['Federal Register classification notices', 'Counsel-reviewed product decisions', 'Broker exception and filing-error logs']
  },
  freight: {
    lane: 'Freight capacity',
    owner: 'Logistics',
    decision: 'Separate volume, rate, booking and fallback-route cards before changing a lane plan.',
    rationale: 'July imports rose while Far East-U.S. rates fell. Rhine low water adds a separate fallback-capacity watch. Averaging them hides the decision.',
    queue: ['Tag the customer or inventory promise tied to the booking.', 'Attach lane card, fallback option and approval threshold.', 'Set a stand-down trigger if rates, water levels or actual demand invalidate the premium move.'],
    watch: ['Descartes and NRF/Hackett import updates', 'Xeneta/FreightWaves rate cards', 'Rhine Kaub water-level and rail/truck fallback evidence']
  },
  inventory: {
    lane: 'Inventory simulation',
    owner: 'Planning / S&OP',
    decision: 'Treat the AI or digital-twin result as an exception note that still needs approval.',
    rationale: 'AI can shorten the review loop while buffers shrink, but it does not own supplier commitments, tariff positions or customer promises.',
    queue: ['Record the simulation result, assumption owner and business decision it changes.', 'Ask S&OP to approve trust, rerun or override.', 'Capture the failure mode if input data, freshness, demand or capacity assumptions prove wrong.'],
    watch: ['AI planning controls and audit trails', 'Inventory-buffer evidence', 'Pilot-to-rollout performance claims']
  },
  storage: {
    lane: 'Storage / supplier compliance',
    owner: 'Procurement + quality',
    decision: 'Create a supplier or site proof file before rerouting, promising availability or accepting inventory.',
    rationale: 'The farm-to-fork lens shows the same proof problem across FAO input divergence, Target fresh-food simulation and Maharashtra warehouse suspensions.',
    queue: ['Attach inspection, supplier, storage-temperature or food-safety evidence to the row.', 'Name quality/compliance approval and procurement fallback.', 'Set the failure mode: permit issue, freshness loss, unavailable substitute or customer promise breach.'],
    watch: ['FAO category moves', 'Food-safety inspection actions', 'Supplier proof and availability changes']
  }
};

const decisionModifiers = {
  approve: 'Approval governance should lead the readout.',
  promise: 'Customer-promise risk is the action boundary.',
  broker: 'Broker, legal and compliance instructions must be explicit.',
  route: 'Routing and fallback choices need logistics approval.',
  simulate: 'Simulation output is useful only when the override owner is named.'
};

const constraintModifiers = {
  compliance: 'Bias toward inspection-ready evidence before speed.',
  service: 'Protect service-critical demand and publish the falsifier.',
  margin: 'Do not absorb tariff, freight or expedite cost without finance/customer approval.',
  capital: 'Challenge early receipts, refunds and prepaid capacity against cash discipline.',
  speed: 'Use a narrow 72-hour loop: owner, proof, approval and failure mode.'
};

function showView(id) {
  views.forEach(view => { view.hidden = view.id !== id; });
  tabs.forEach(tab => tab.classList.toggle('is-active', tab.dataset.view === id));
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

tabs.forEach(tab => tab.addEventListener('click', () => showView(tab.dataset.view)));
document.querySelectorAll('[data-jump]').forEach(button => button.addEventListener('click', () => showView(button.dataset.jump)));

function fillList(id, items) {
  const target = document.getElementById(id);
  target.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    target.appendChild(li);
  });
}

document.getElementById('brief-form').addEventListener('submit', event => {
  event.preventDefault();
  const exposure = document.getElementById('exposure').value;
  const decision = document.getElementById('decision').value;
  const owner = document.getElementById('owner').selectedOptions[0].textContent;
  const constraint = document.getElementById('constraint').value;
  const friction = document.getElementById('friction').selectedOptions[0].textContent;
  const copy = laneCopy[exposure];

  document.getElementById('recommendation-title').textContent = `${copy.lane}: put ${copy.owner} and ${owner} in the same verified exception file.`;
  document.getElementById('recommendation-summary').textContent = `${decisionModifiers[decision]} ${constraintModifiers[constraint]} Main friction to remove: ${friction}.`;
  document.getElementById('decision-copy').textContent = copy.decision;
  document.getElementById('rationale-copy').textContent = copy.rationale;
  fillList('owner-queue', copy.queue);
  fillList('watchlist', copy.watch);
  showView('output-readout-view');
});

fillList('owner-queue', ['Choose a lane in Brief Builder.', 'Attach source, owner and proof artifact.', 'Write the deadline, approval and failure mode before the next meeting.']);
fillList('watchlist', ['CBP/USTR and Federal Register updates', 'Descartes, NRF/Hackett, FreightWaves and Xeneta lane cards', 'Rhine Kaub water levels', 'AI planning controls', 'FAO category moves and food-safety inspections']);
