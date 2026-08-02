const views = [...document.querySelectorAll('.view')];
const targets = [...document.querySelectorAll('[data-view-target]')];

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

targets.forEach((button) => button.addEventListener('click', () => showView(button.dataset.viewTarget)));

const playbook = {
  'Mixed-origin import portfolio': {
    owner: 'COO with trade compliance',
    file: 'portfolio entry proof board',
    move: 'Create rows for product family, origin, HTS, authority, exemption status, vessel or warehouse status, supplier proof, broker instruction, landed cost, customer exposure and named owner.',
    fail: 'each function works from a different exposure file'
  },
  'Apparel / textile shipment': {
    owner: 'Sourcing lead with trade compliance',
    file: 'cotton-to-closet proof packet',
    move: 'Tie country placement, quota feasibility, cotton-input proof, supplier labor evidence and lead-time risk to the entry row before the next supplier commitment.',
    fail: 'a country sourcing decision ignores proof capacity and quota timing'
  },
  'Supplier with forced-labor proof exposure': {
    owner: 'Procurement risk owner',
    file: 'supplier evidence request and escalation log',
    move: 'Ask for origin, component, labor and entity-list evidence now; mark rows as blocked until proof can be used by customs, broker and finance.',
    fail: 'supplier evidence arrives after the broker or customer decision is locked'
  },
  'Parcel-heavy retail import flow': {
    owner: 'Retail operations lead',
    file: 'parcel entry and customer-promise queue',
    move: 'Separate fast-moving parcel rows from bulk shipments, then decide which customer promises need price, service or timing caveats.',
    fail: 'small-package handling hides treatment errors until customer service sees them'
  },
  'Multi-country bill of material': {
    owner: 'Product compliance owner',
    file: 'BOM origin and treatment crosswalk',
    move: 'Match component origin, supplier proof and HTS treatment before finance refreshes landed cost or sales changes language.',
    fail: 'country-level assumptions overwrite component-level proof gaps'
  },
  'Customer order already quoted': {
    owner: 'Finance and sales owner',
    file: 'customer caveat and reserve record',
    move: 'Freeze blanket surcharge language until the row confirms tariff authority, exemption state, entry timing and refund/protest recordkeeping.',
    fail: 'customers receive a price change that does not match the entry evidence'
  }
};

function value(id) {
  return document.getElementById(id).value;
}

function generateBrief() {
  const exposure = value('exposure');
  const deadline = value('deadline');
  const constraint = value('constraint');
  const evidence = value('evidence');
  const authority = value('authority');
  const friction = value('friction');
  const selected = playbook[exposure];

  document.getElementById('readoutIntro').textContent = `${exposure}: treat ${deadline.toLowerCase()} as the clock. The first constraint is ${constraint.toLowerCase()}, and the evidence state is ${evidence.toLowerCase()}.`;
  document.getElementById('recommendationText').textContent = `Open the ${selected.file}; make ${selected.owner} the accountable first owner.`;
  document.getElementById('recommendationRationale').textContent = `Decision authority: ${authority.toLowerCase()}. Implementation friction: ${friction.toLowerCase()}. The failure mode to prevent is that ${selected.fail}.`;

  const queue = [
    [selected.owner, 'Primary decision', selected.move],
    ['Trade compliance / customs broker', 'Treatment and filing', 'Confirm authority, HTS, exemption status, in-transit status and entry instruction before the file reaches customs.'],
    ['Procurement', 'Supplier proof', friction.includes('Supplier') ? 'Escalate missing supplier proof today; blocked proof means blocked entry confidence.' : 'Attach supplier proof and owner name to each row before commercial language changes.'],
    ['Finance', 'Landed cost / reserve', 'Separate freight relief from duty, refund, protest and documentation risk before updating margin or reserves.'],
    ['Sales / customer owner', 'Customer language', constraint.includes('Service') || friction.includes('Customer') ? 'Add service or price caveats before the quote is accepted.' : 'Confirm no customer promise depends on an unowned proof row.']
  ];

  document.getElementById('ownerQueue').innerHTML = queue
    .map(([owner, label, detail]) => `<article class="owner-item"><span>${label}</span><strong>${owner}</strong><p>${detail}</p></article>`)
    .join('');
  showView('output-readout');
}

document.getElementById('generateBrief').addEventListener('click', generateBrief);
