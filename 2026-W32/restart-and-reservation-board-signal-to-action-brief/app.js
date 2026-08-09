const views = [...document.querySelectorAll('.view')];
const tabs = [...document.querySelectorAll('.view-tab')];

const laneCopy = {
  restart: {
    lane: 'Restart clock',
    owner: 'Logistics',
    decision: 'Run a Monday restart check before confirming the customer promise.',
    rationale: 'Typhoon Dolphin evidence supports a live recovery clock, not a blanket congestion claim. Assign the node, vessel, flight and customer-promise review first.',
    queue: ['Confirm status for exposed port, airport, rail and vessel nodes.', 'Tag orders promised off affected nodes and name the customer owner.', 'Set a falsifier: if recovery clears by close of business, stand down premium routing.'],
    watch: ['Yangshan and Ningbo restart status', 'Shanghai airport recovery', 'Zhejiang/Fujian ferry and port updates']
  },
  entry: {
    lane: 'Entry file',
    owner: 'Trade compliance',
    decision: 'Move the shipment into an entry-file exception queue with broker and master-data ownership.',
    rationale: 'CBP/USTR timing turned policy into sequence work: country bucket, Chapter 99 code, exemption proof, entry date and broker instruction.',
    queue: ['List entries crossing the July 24 effective window or in-transit treatment.', 'Assign one owner for origin evidence, HTSUS sequence and broker instruction.', 'Escalate only files where proof is missing or the customer promise assumes the old landed cost.'],
    watch: ['CBP CSMS updates', 'Federal Register corrections or clarifications', 'ACE filing errors and broker exception logs']
  },
  freight: {
    lane: 'Freight/import lane',
    owner: 'Logistics + planning',
    decision: 'Keep each freight card separate and change only the bookings tied to live demand.',
    rationale: 'NRF/Hackett TEU forecasts, Freightos lane cards and Drewry WCI answer different questions. A softer import calendar does not automatically release every reservation.',
    queue: ['Identify bookings tied to pulled-forward or uncertain demand.', 'Separate premium-service commitments from buffer-stock movements.', 'Ask finance/sales to approve any promise that depends on a mixed freight signal.'],
    watch: ['Drewry WCI update', 'Freightos/FreightWaves Asia-North America cards', 'July port actuals and next NRF/Hackett forecast']
  },
  scarce: {
    lane: 'Scarce input',
    owner: 'Procurement + finance',
    decision: 'Protect only supplier reservations that map to profitable or service-critical demand.',
    rationale: 'ISM prices, slow deliveries and scarce-component lists show input-time pressure even as the import peak fades.',
    queue: ['Rank scarce inputs by customer/project consequence, not headline drama.', 'Name the approval owner for progress payment, qualification, hedge or stand-down.', 'Set a falsifier: what evidence would release the slot or cancel the premium action?'],
    watch: ['Next ISM supplier-delivery and price readings', 'Supplier progress-payment demands', 'Polysilicon December 4 implementation detail']
  },
  food: {
    lane: 'Food-input lane',
    owner: 'Procurement + logistics',
    decision: 'Treat food-price and Black Sea signals as trigger cards for procurement and logistics, not proof of a broad food shock.',
    rationale: 'FAO category moves and Odesa port damage point to specific input and route checks. The useful move is trigger ownership.',
    queue: ['Identify exposed wheat, vegetable oil, meat, dairy or sugar categories.', 'Assign a procurement owner and logistics owner for route and price triggers.', 'Decide what price or port evidence changes buy timing or customer communication.'],
    watch: ['FAO category updates', 'Odesa and Black Sea cargo-flow evidence', 'Supplier quote validity windows']
  }
};

const decisionModifiers = {
  promise: 'Customer promise governance should lead the readout.',
  reserve: 'Supplier-slot reservation is the action boundary.',
  file: 'Entry-file cleanup is the first constraint to clear.',
  booking: 'Booking discipline matters more than interpreting a market mood.',
  cash: 'Margin and working-capital approval must precede protection spend.'
};

const constraintModifiers = {
  service: 'Bias toward protecting service-critical demand and make the stand-down trigger explicit.',
  margin: 'Do not absorb tariff, freight or expedite cost without a customer or finance decision.',
  capital: 'Challenge early receipts and prepaid slots that no longer map to demand.',
  compliance: 'No promise should outrun origin proof, exemption evidence or broker instruction.',
  speed: 'Use a narrow 72-hour queue: owner, trigger, next decision and falsifier.'
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

  document.getElementById('recommendation-title').textContent = `${copy.lane}: put ${copy.owner} and ${owner} in the same 72-hour queue.`;
  document.getElementById('recommendation-summary').textContent = `${decisionModifiers[decision]} ${constraintModifiers[constraint]} Main friction to remove: ${friction}.`;
  document.getElementById('decision-copy').textContent = copy.decision;
  document.getElementById('rationale-copy').textContent = copy.rationale;
  fillList('owner-queue', copy.queue);
  fillList('watchlist', copy.watch);
  showView('output-readout-view');
});

fillList('owner-queue', ['Choose an exposure in Brief Builder.', 'Assign one primary owner.', 'Write the trigger and falsifier before the next meeting.']);
fillList('watchlist', ['Monday coastal-node recovery', 'CBP CSMS updates', 'Drewry/Freightos lane cards', 'July port actuals', 'Odesa, Port Hedland and dated policy implementation']);
