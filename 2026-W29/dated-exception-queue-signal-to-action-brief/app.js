const views = [...document.querySelectorAll('.view')];
const tabs = [...document.querySelectorAll('[data-view-target]')];
function showView(name){
  views.forEach(v=>{const on=v.dataset.view===name; v.classList.toggle('is-active',on); v.hidden=!on;});
  document.querySelectorAll('.view-tab').forEach(t=>t.classList.toggle('is-active',t.dataset.viewTarget===name));
  window.scrollTo({top:0,behavior:'smooth'});
}
tabs.forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.viewTarget)));
const playbook = {
  'Brazil-origin goods / suppliers': ['Customs','exposed, exempt, uncertain and missing-document list','Classify Brazil-origin SKUs before July 22; model landed cost only after exemption status is separated.','supplier cannot prove exemption or origin status'],
  'Apparel, textiles or forced-labor proof exposure': ['Legal / trade compliance','forced-labor proof packet and docket calendar','Tie transcript themes, supplier evidence and origin proof to actual SKUs before committing inventory.','proof gap remains before filing window closes'],
  'Steel inputs or equipment suppliers': ['Procurement','product-code, quota and substitute file','Check UK/EU quota status, product category and substitute approvals before promising cost or availability.','quota unavailable or alternate grade unapproved'],
  'Trans-Pacific or inland capacity commitment': ['Logistics','protected booking and inland-capacity list','Reserve space for customer-critical orders; label optional pull-forward separately from demand.','late arrival threatens customer promise'],
  'EU-bound shipment files': ['Customs operations','ICS2 cargo-data cleanup file','Audit classification and ENS fields before departure rather than when cargo hits the border.','missing classification or ENS detail'],
  'Transformers, breakers or switchgear': ['Capital projects','reservation and approval file','Move long-lead electrical equipment into project-risk governance before normal procurement cadence fails.','lead time exceeds project float'],
  'Mixed import portfolio': ['S&OP lead','single dated exception board','Sort the portfolio into clocked rows and assign the first owner per row before debating macro risk.','multiple files wait for the same executive meeting']
};
function generate(){
  const exposure = document.getElementById('exposure').value;
  const deadline = document.getElementById('deadline').value;
  const constraint = document.getElementById('constraint').value;
  const evidence = document.getElementById('evidence').value;
  const authority = document.getElementById('authority').value;
  const friction = document.getElementById('friction').value;
  const [owner,file,move,fail] = playbook[exposure];
  document.getElementById('readoutIntro').textContent = `${exposure}: treat ${deadline.toLowerCase()} as the operating clock. The first constraint is ${constraint.toLowerCase()}, not generic volatility.`;
  document.getElementById('recommendationText').textContent = `Open the ${file}; make ${owner} the first accountable owner.`;
  document.getElementById('recommendationRationale').textContent = `Evidence state: ${evidence.toLowerCase()}. Decision authority: ${authority.toLowerCase()}. Main friction: ${friction.toLowerCase()}. The failure mode is ${fail}.`;
  const queue = [
    [owner, 'Primary decision', move],
    ['Finance', 'Margin / cash check', 'Refresh landed-cost and working-capital assumptions after classification, quota or booking status is known; do not price from a blended risk score.'],
    ['Legal / compliance', 'Proof and docket check', evidence.includes('scattered') || evidence.includes('Partial') ? 'Create one evidence owner and escalation path today.' : 'Confirm proof maps to SKU, origin, supplier and clock.'],
    ['Logistics / operations', 'Service promise check', 'Protect bookings or customer commitments that fail if the exception file slips.'],
    ['Executive owner', 'Escalation gate', `Escalate only if ${fail}; otherwise keep the file moving at the functional level.`]
  ];
  document.getElementById('ownerQueue').innerHTML = queue.map(([o,k,d])=>`<article class="owner-item"><span>${k}</span><strong>${o}</strong><p>${d}</p></article>`).join('');
  showView('output-readout');
}
document.getElementById('generateBrief').addEventListener('click', generate);
