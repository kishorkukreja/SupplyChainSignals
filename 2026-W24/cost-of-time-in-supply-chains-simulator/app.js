const scenarioActions = document.querySelector("#scenarioActions");
const portfolioTable = document.querySelector("#portfolioTable");
const selectedScenario = document.querySelector("#selectedScenario");
const scenarioBadge = document.querySelector("#scenarioBadge");
const scenarioSummary = document.querySelector("#scenarioSummary");
const summaryGrid = document.querySelector("#summaryGrid");
const portfolioValue = document.querySelector("#portfolioValue");
const reasonBars = document.querySelector("#reasonBars");
const portfolioRecommendation = document.querySelector("#portfolioRecommendation");
const portfolioRationale = document.querySelector("#portfolioRationale");
const resetPortfolio = document.querySelector("#resetPortfolio");
const viewTabs = document.querySelectorAll("[data-view-target]");
const views = document.querySelectorAll("[data-view]");

const clockLabels = {
  carrier: "Carrier clock",
  policy: "Policy clock",
  compliance: "Compliance clock",
  retail: "Retail clock",
  finance: "Finance clock",
  supplier: "Supplier clock",
};

const scenarios = {
  premium: {
    name: "The premium works",
    badge: "Early movement protects service",
    summary: "Freight stays expensive, but demand absorbs the pull-forward and documentation lands before the deadline.",
    adjust: { deadline: -3, freight: 8, fuel: 5, tariff: -8, compliance: -12, demand: 12, supplier: -5, margin: 2 },
  },
  airPocket: {
    name: "Air pocket arrives",
    badge: "June borrowed from July and August",
    summary: "Goods moved early, demand softens, inventory days rise, and working capital becomes the binding clock.",
    adjust: { deadline: 5, freight: -10, fuel: -6, tariff: -6, compliance: 0, demand: -24, supplier: 2, margin: -5 },
  },
  squeeze: {
    name: "Policy and fuel squeeze",
    badge: "Tariff detail and fuel stay hot",
    summary: "Fuel pass-through, tariff uncertainty, and documentation gaps all persist while booking windows shorten.",
    adjust: { deadline: -8, freight: 18, fuel: 22, tariff: 24, compliance: 18, demand: -8, supplier: 12, margin: -4 },
  },
};

const sampleOrders = [
  { name: "Fall apparel core line", value: 1450000, deadline: 22, freight: 74, fuel: 68, tariff: 82, compliance: 76, demand: 64, supplier: 58, margin: 34, service: 88 },
  { name: "Back-to-school promo buy", value: 860000, deadline: 12, freight: 70, fuel: 66, tariff: 54, compliance: 46, demand: 72, supplier: 42, margin: 27, service: 82 },
  { name: "Private-label replenishment", value: 1180000, deadline: 35, freight: 62, fuel: 58, tariff: 38, compliance: 34, demand: 84, supplier: 48, margin: 41, service: 92 },
  { name: "Critical-minerals assembly", value: 1320000, deadline: 18, freight: 45, fuel: 40, tariff: 58, compliance: 64, demand: 78, supplier: 86, margin: 29, service: 90 },
  { name: "Steel-dependent fixtures", value: 640000, deadline: 28, freight: 40, fuel: 46, tariff: 70, compliance: 42, demand: 55, supplier: 62, margin: 22, service: 70 },
  { name: "Seasonal accessory overhang", value: 310000, deadline: 52, freight: 44, fuel: 40, tariff: 28, compliance: 30, demand: 32, supplier: 28, margin: 18, service: 55 },
];

let orders = clone(sampleOrders);
let activeScenario = "premium";
let activeView = "landing";

function clone(rows) {
  return rows.map((row) => ({ ...row }));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : 0));
}

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function pct(value) {
  return `${Math.round(value)}%`;
}

function riskClass(score) {
  if (score >= 70) return "risk-high";
  if (score >= 45) return "risk-med";
  return "risk-low";
}

function scenarioRow(row, key) {
  const a = scenarios[key].adjust;
  return {
    ...row,
    deadline: clamp(row.deadline + a.deadline, 0, 90),
    freight: clamp(row.freight + a.freight),
    fuel: clamp(row.fuel + a.fuel),
    tariff: clamp(row.tariff + a.tariff),
    compliance: clamp(row.compliance + a.compliance),
    demand: clamp(row.demand + a.demand),
    supplier: clamp(row.supplier + a.supplier),
    margin: clamp(row.margin + a.margin, 0, 80),
  };
}

function classify(row) {
  const deadlinePressure = clamp(100 - row.deadline * 2.4);
  const marginRisk = clamp(70 - row.margin * 1.7);
  const serviceNeed = clamp(row.service * 0.72 + row.demand * 0.28);
  const waitCost = clamp(row.freight * 0.16 + row.fuel * 0.14 + row.tariff * 0.18 + row.compliance * 0.18 + row.supplier * 0.12 + deadlinePressure * 0.22);
  const moveEarlyCost = clamp(row.freight * 0.18 + row.fuel * 0.14 + marginRisk * 0.2 + (100 - row.demand) * 0.23 + (row.value / 35000) * 0.05);
  const wrongCost = clamp((100 - row.demand) * 0.28 + marginRisk * 0.22 + row.compliance * 0.12 + row.tariff * 0.1 + Math.max(0, row.deadline - 25) * 0.18);
  const clocks = {
    carrier: clamp(row.freight * 0.45 + row.fuel * 0.35 + deadlinePressure * 0.2),
    policy: clamp(row.tariff * 0.62 + deadlinePressure * 0.22 + row.margin * 0.16),
    compliance: clamp(row.compliance * 0.62 + row.tariff * 0.18 + deadlinePressure * 0.2),
    retail: clamp((100 - row.demand) * 0.46 + serviceNeed * 0.2 + Math.max(0, 35 - row.deadline) * 0.18 + row.margin * 0.16),
    finance: clamp(marginRisk * 0.48 + moveEarlyCost * 0.28 + wrongCost * 0.24),
    supplier: clamp(row.supplier * 0.68 + deadlinePressure * 0.16 + row.compliance * 0.16),
  };
  const primary = Object.entries(clocks).sort((a, b) => b[1] - a[1])[0][0];
  const risk = Math.round(clamp(waitCost * 0.42 + moveEarlyCost * 0.27 + wrongCost * 0.21 + clocks[primary] * 0.1));
  let action = "Set threshold owner";
  if (primary === "carrier" && row.demand >= 60 && row.margin >= 24 && row.deadline <= 20) action = "Book now with margin trigger";
  else if (primary === "policy" && row.tariff >= 68 && row.deadline <= 25) action = "Split buy around policy date";
  else if (primary === "compliance" && row.compliance >= 62) action = "Hold shipment until documents clear";
  else if (primary === "retail" && row.demand < 48) action = "Wait; do not buy the air pocket";
  else if (primary === "finance" && row.margin < 22) action = "Reprice or stop the buy";
  else if (primary === "supplier" && row.supplier >= 70) action = "Protect service; qualify backup";
  if (risk >= 78 && row.demand < 50) action = "Stop-buy and sell through";
  if (risk >= 78 && row.compliance >= 70) action = "Escalate compliance before booking";
  return { waitCost, moveEarlyCost, wrongCost, clocks, primary, risk, action };
}

function renderScenarioActions() {
  scenarioActions.innerHTML = Object.entries(scenarios)
    .map(([key, s]) => `<button class="scenario-button ${key === activeScenario ? "is-active" : ""}" type="button" data-scenario="${key}"><strong>${s.name}</strong><span>${s.summary}</span></button>`)
    .join("");
  selectedScenario.textContent = scenarios[activeScenario].name;
  scenarioBadge.textContent = scenarios[activeScenario].badge;
  scenarioSummary.textContent = scenarios[activeScenario].summary;
}

function setView(viewName) {
  activeView = viewName;
  views.forEach((view) => {
    const on = view.dataset.view === activeView;
    view.hidden = !on;
    view.classList.toggle("is-active", on);
  });
  viewTabs.forEach((tab) => {
    const on = tab.dataset.viewTarget === activeView;
    tab.classList.toggle("is-active", on);
    if (tab.classList.contains("view-tab")) tab.setAttribute("aria-current", on ? "page" : "false");
  });
}

function fieldCell(label, content) {
  return `<div data-label="${label}">${content}</div>`;
}

function numberInput(field, row, min = 0, max = 100) {
  return `<input data-field="${field}" type="number" min="${min}" max="${max}" value="${row[field]}" />`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
}

function renderPortfolio() {
  const header = `<div class="po-row header"><div>Order family</div><div>Value</div><div>Deadline</div><div>Freight</div><div>Fuel</div><div>Tariff</div><div>Docs</div><div>Demand</div><div>Margin</div><div>Risk / action</div></div>`;
  const body = orders
    .map((row, index) => {
      const base = classify(row);
      const scen = classify(scenarioRow(row, activeScenario));
      const delta = scen.risk - base.risk;
      return `<article class="po-row" data-index="${index}">${fieldCell("Order family", `<div class="po-name"><input data-field="name" type="text" value="${escapeHtml(row.name)}" /><small>${clockLabels[scen.primary]} leads</small></div>`)}${fieldCell("Value", numberInput("value", row, 0, 5000000))}${fieldCell("Deadline", numberInput("deadline", row, 0, 90))}${fieldCell("Freight", numberInput("freight", row))}${fieldCell("Fuel", numberInput("fuel", row))}${fieldCell("Tariff", numberInput("tariff", row))}${fieldCell("Docs", numberInput("compliance", row))}${fieldCell("Demand", numberInput("demand", row))}${fieldCell("Margin", numberInput("margin", row, 0, 80))}${fieldCell("Risk / action", `<div class="risk-cell"><strong class="${riskClass(scen.risk)}">${base.risk} → ${scen.risk}</strong><span>${delta >= 0 ? "+" : ""}${delta} risk · ${scen.action}</span><div class="action-chip">${clockLabels[scen.primary]}</div></div>`)}</article>`;
    })
    .join("");
  portfolioTable.innerHTML = header + body;
  renderSummary();
}

function renderSummary() {
  const results = orders.map((row) => ({ row, base: classify(row), scen: classify(scenarioRow(row, activeScenario)) }));
  const total = results.reduce((sum, item) => sum + Number(item.row.value || 0), 0);
  const highRisk = results.filter((item) => item.scen.risk >= 70).reduce((sum, item) => sum + Number(item.row.value || 0), 0);
  const avgBase = results.reduce((sum, item) => sum + item.base.risk, 0) / results.length;
  const avgScen = results.reduce((sum, item) => sum + item.scen.risk, 0) / results.length;
  const exceptions = results.filter((item) => /Stop|Escalate|Hold shipment|Reprice/.test(item.scen.action)).length;
  const urgent = results.filter((item) => item.row.deadline <= 20).length;
  summaryGrid.innerHTML = [
    ["Portfolio value", money(total)],
    ["Value at 70+ risk", money(highRisk)],
    ["Avg risk shift", `${Math.round(avgBase)} → ${Math.round(avgScen)}`],
    ["Exceptions", `${exceptions} rows`],
    ["≤20 day windows", `${urgent} rows`],
    ["Scenario risk", pct(avgScen)],
  ]
    .map(([label, value]) => `<article class="summary-card"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");
  portfolioValue.textContent = money(total);
  const mix = {};
  results.forEach((item) => {
    mix[item.scen.primary] = (mix[item.scen.primary] || 0) + Number(item.row.value || 0);
  });
  reasonBars.innerHTML = Object.entries(mix)
    .sort((a, b) => b[1] - a[1])
    .map(([clock, value]) => {
      const share = total ? (value / total) * 100 : 0;
      return `<div class="bar-row"><div class="bar-label"><span>${clockLabels[clock]}</span><strong>${pct(share)}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${share}%"></div></div></div>`;
    })
    .join("");
  const avgDelta = avgScen - avgBase;
  if (highRisk / Math.max(total, 1) > 0.42) {
    portfolioRecommendation.textContent = "Separate timing bets from service stock";
    portfolioRationale.textContent = "Too much value sits above the high-risk threshold. Assign owners by clock before releasing more purchase orders.";
  } else if (exceptions >= 3) {
    portfolioRecommendation.textContent = "Run exception review before booking";
    portfolioRationale.textContent = "Several rows need compliance, repricing, or stop-buy decisions. Do not let logistics solve all of them as freight problems.";
  } else if (avgDelta >= 8) {
    portfolioRecommendation.textContent = "Selected scenario raises timing fragility";
    portfolioRationale.textContent = "The clock stack is moving against the portfolio. Split orders and attach threshold dates to the highest-value rows.";
  } else if (avgDelta <= -6) {
    portfolioRecommendation.textContent = "Premium may be buying useful certainty";
    portfolioRationale.textContent = "Scenario risk falls enough to justify early movement where demand and margin can absorb the premium.";
  } else {
    portfolioRecommendation.textContent = "Manage by clock, not by average rate";
    portfolioRationale.textContent = "Portfolio risk is mixed. Focus on the rows where the primary clock changes the action, not the rows with the loudest freight input.";
  }
}

portfolioTable.addEventListener("input", (event) => {
  const field = event.target.dataset.field;
  if (!field) return;
  const rowEl = event.target.closest("[data-index]");
  if (!rowEl) return;
  const row = orders[Number(rowEl.dataset.index)];
  row[field] = field === "name" ? event.target.value : Number(event.target.value);
  renderPortfolio();
});

scenarioActions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-scenario]");
  if (!button) return;
  activeScenario = button.dataset.scenario;
  renderScenarioActions();
  renderPortfolio();
});

viewTabs.forEach((tab) => tab.addEventListener("click", () => setView(tab.dataset.viewTarget)));
resetPortfolio.addEventListener("click", () => {
  orders = clone(sampleOrders);
  renderPortfolio();
});

renderScenarioActions();
renderPortfolio();
setView(activeView);
