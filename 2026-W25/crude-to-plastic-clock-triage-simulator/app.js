const $ = (id) => document.getElementById(id);

const inputs = {
  containers: $('containers'),
  currentRate: $('currentRate'),
  laterRate: $('laterRate'),
  pullDays: $('pullDays'),
  carryPct: $('carryPct'),
  cargoValue: $('cargoValue'),
  stockoutPenalty: $('stockoutPenalty'),
  stockoutDays: $('stockoutDays'),
  tariffExposure: $('tariffExposure'),
  warehouseReadiness: $('warehouseReadiness'),
  demandConfidence: $('demandConfidence'),
  policyMode: $('policyMode')
};

const outputs = {
  premiumFreight: $('premiumFreight'),
  carryingCost: $('carryingCost'),
  clockBenefit: $('clockBenefit'),
  netValue: $('netValue'),
  decisionBadge: $('decisionBadge'),
  recommendation: $('recommendation'),
  scenarioNotes: $('scenarioNotes'),
  gaugeFill: $('gaugeFill')
};

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const num = (el) => Number(el.value);

function showView(target) {
  document.querySelectorAll('.view').forEach((view) => view.classList.toggle('active', view.id === target));
  document.querySelectorAll('.tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.target === target));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function labelOutputs() {
  Object.entries(inputs).forEach(([key, input]) => {
    if (input.tagName !== 'INPUT') return;
    const out = input.parentElement.querySelector('output');
    if (!out) return;
    const value = num(input);
    if (['currentRate', 'laterRate', 'cargoValue', 'stockoutPenalty', 'tariffExposure'].includes(key)) {
      out.value = fmt.format(value);
    } else if (key === 'carryPct') {
      out.value = `${value.toFixed(1)}%`;
    } else {
      out.value = String(value);
    }
  });
}

function calculate() {
  const containers = num(inputs.containers);
  const currentRate = num(inputs.currentRate);
  const laterRate = num(inputs.laterRate);
  const pullDays = num(inputs.pullDays);
  const carryPct = num(inputs.carryPct) / 100;
  const cargoValue = num(inputs.cargoValue);
  const stockoutPenalty = num(inputs.stockoutPenalty);
  const stockoutDays = num(inputs.stockoutDays);
  const tariffExposure = num(inputs.tariffExposure);
  const warehouse = Number(inputs.warehouseReadiness.value);
  const demand = Number(inputs.demandConfidence.value);
  const mode = inputs.policyMode.value;

  const premiumFreight = Math.max(0, currentRate - laterRate) * containers;
  const totalCargoValue = cargoValue * containers;
  const carryingCost = totalCargoValue * carryPct * (pullDays / 365);
  const serviceBenefit = stockoutPenalty * stockoutDays * demand;
  const complianceBenefit = tariffExposure * Math.max(demand, 0.55);
  const readinessPenalty = (1 - warehouse) * (premiumFreight + carryingCost + totalCargoValue * 0.012);

  let modeAdjustment = 0;
  if (mode === 'split') modeAdjustment = -premiumFreight * 0.42 + serviceBenefit * -0.18;
  if (mode === 'redesign') modeAdjustment = -premiumFreight * 0.65 - complianceBenefit * 0.25 + totalCargoValue * 0.018;

  const clockBenefit = serviceBenefit + complianceBenefit;
  const netValue = clockBenefit - premiumFreight - carryingCost - readinessPenalty + modeAdjustment;
  const ratio = clockBenefit / Math.max(1, premiumFreight + carryingCost + readinessPenalty);

  outputs.premiumFreight.textContent = fmt.format(premiumFreight);
  outputs.carryingCost.textContent = fmt.format(carryingCost);
  outputs.clockBenefit.textContent = fmt.format(clockBenefit);
  outputs.netValue.textContent = fmt.format(netValue);
  outputs.gaugeFill.style.width = `${Math.max(5, Math.min(100, ratio * 50))}%`;

  outputs.decisionBadge.className = 'decision';
  if (netValue > 150000 && warehouse > 0.7 && demand > 0.7) {
    outputs.decisionBadge.textContent = 'Pull forward: named clock pays';
    outputs.decisionBadge.classList.add('good');
    outputs.recommendation.textContent = 'Approve premium movement, but tie it to the specific clock that produced the value. Book warehouse labor and preserve the source evidence behind the tariff/compliance assumption.';
  } else if (netValue > 0) {
    outputs.decisionBadge.textContent = 'Split: buy option value';
    outputs.recommendation.textContent = 'Move the SKU tranche with customer penalty or tariff exposure first. Hold the rest until the next rate print or policy date confirms the clock.';
  } else {
    outputs.decisionBadge.textContent = 'Wait/redesign: premium is not justified';
    outputs.decisionBadge.classList.add('bad');
    outputs.recommendation.textContent = 'Do not treat a freight headline as demand proof. Redirect effort into packaging redesign, supplier qualification, item-master evidence, or lane alternatives.';
  }

  const notes = [];
  if (currentRate >= 3969) notes.push('Freight input is at or above the W25 Drewry composite WCI reference, so the premium needs a named business clock.');
  if (pullDays > 35) notes.push('Long pull-forward windows make carrying cost visible; check whether goods will still match demand mix when they arrive.');
  if (warehouse < 0.75) notes.push('Warehouse readiness is the weak link; Port of LA fluidity does not guarantee local receiving capacity.');
  if (tariffExposure > 250000) notes.push('Tariff/compliance exposure is large enough to justify SKU-level evidence work before the purchase order moves.');
  if (demand < 0.6) notes.push('Demand confidence is low; prefer split shipments or redesign over broad frontloading.');
  if (mode === 'redesign') notes.push('Redesign mode assumes packaging simplification/lightweighting can absorb part of the crude-to-plastic cost pressure.');
  outputs.scenarioNotes.innerHTML = notes.map((note) => `<li>${note}</li>`).join('') || '<li>Balanced case: decision depends on next route-rate print and customer penalty clock.</li>';
}

function init() {
  document.querySelectorAll('[data-target]').forEach((button) => {
    button.addEventListener('click', () => showView(button.dataset.target));
  });
  Object.values(inputs).forEach((input) => input.addEventListener('input', () => {
    labelOutputs();
    calculate();
  }));
  labelOutputs();
  calculate();
}

init();
