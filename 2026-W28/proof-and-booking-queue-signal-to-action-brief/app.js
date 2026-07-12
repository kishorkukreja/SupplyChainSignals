const views = [...document.querySelectorAll('.view')];
const tabs = [...document.querySelectorAll('[data-view-target]')];
function showView(name){
  views.forEach(v=>{const on=v.dataset.view===name; v.classList.toggle('is-active',on); v.hidden=!on;});
  document.querySelectorAll('.view-tab').forEach(t=>t.classList.toggle('is-active',t.dataset.viewTarget===name));
  window.scrollTo({top:0,behavior:'smooth'});
}
tabs.forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.viewTarget)));
const lanes = {
  'Book or delay receipts': ['Booking','Logistics / S&OP','Sort early receipts by customer-order quality. Separate front-loaded inventory from true demand before approving more speed.'],
  'Build proof files': ['Proof','Trade compliance / Legal','Create SKU-level origin, supplier and forced-labor evidence files from the USTR category exposure.'],
  'Reprice landed cost': ['Cost','Finance','Refresh duties, refunds, WCI, diesel and surcharge assumptions without double-counting temporary costs.'],
  'Escalate constrained inputs': ['Strategic inputs','Procurement','Move constrained inputs out of normal buying and into allocation or approval rules.'],
  'Separate demand from timing': ['Booking','Planning / S&OP','Compare early receipts with actual orders before reading July as a demand boom.']
};
function generate(){
  const product = document.getElementById('productFamily').value;
  const decision = document.getElementById('decisionDue').value;
  const constraint = document.getElementById('constraint').value;
  const proof = document.getElementById('proofReadiness').value;
  const timing = document.getElementById('inventoryTiming').value;
  const authority = document.getElementById('authority').value;
  const [lane, owner, action] = lanes[decision];
  document.getElementById('readoutIntro').textContent = `${product}: ${decision.toLowerCase()} is the first live decision. Treat this as a ${lane.toLowerCase()} lane problem, not a generic risk headline.`;
  document.getElementById('recommendationText').textContent = `${lane} lane first; keep the other three visible.`;
  document.getElementById('recommendationRationale').textContent = `${constraint} is the binding constraint. Current proof state: ${proof.toLowerCase()}. Inventory timing: ${timing.toLowerCase()}. Approval model: ${authority.toLowerCase()}.`;
  const queue = [
    [owner, 'Primary move', action],
    ['Trade compliance / Legal', 'Proof check', proof.includes('Weak') ? 'Block external commitments until supplier and origin files are mapped to SKUs.' : 'Confirm which exposed SKUs already have usable evidence files.'],
    ['Finance', 'Cost check', 'Update freight, diesel, duty and refund assumptions once; document what is temporary versus structural.'],
    ['Procurement', 'Input check', product.includes('Food') ? 'Review ingredient families, cold-chain capacity and fuel-sensitive suppliers.' : 'Flag constrained parts that need allocation rules before customer commitments.'],
    ['S&OP', 'Demand check', timing.includes('early') ? 'Label early receipts separately so front-loading is not mistaken for demand strength.' : 'Watch July/August order quality before changing the forecast.']
  ];
  document.getElementById('ownerQueue').innerHTML = queue.map(([o,k,d])=>`<article class="owner-item"><span>${k}</span><strong>${o}</strong><p>${d}</p></article>`).join('');
  showView('output-readout');
}
document.getElementById('generateBrief').addEventListener('click', generate);
