const viewButtons = document.querySelectorAll("[data-view-target]");
const views = document.querySelectorAll("[data-view]");
const scenarioActions = document.querySelector("#scenarioActions");
const orderTable = document.querySelector("#orderTable");
const selectedScenario = document.querySelector("#selectedScenario");
const scenarioBadge = document.querySelector("#scenarioBadge");
const summaryGrid = document.querySelector("#summaryGrid");
const portfolioRecommendation = document.querySelector("#portfolioRecommendation");
const portfolioRationale = document.querySelector("#portfolioRationale");
const reasonBars = document.querySelector("#reasonBars");
const totalValue = document.querySelector("#totalValue");
const resetOrders = document.querySelector("#resetOrders");

const clocks = { freight: "Logistics", policy: "Trade", warehouse: "Warehouse", finance: "Finance", commercial: "Commercial" };

const scenarios = {
  baseline: { name: "W26 baseline", badge: "Current freight + policy queue", summary: "Use the current W26 signal set as-is.", adjust: { freight: 0, policy: 0, warehouse: 0, finance: 0, demand: 0, proof: 0, margin: 0, days: 0 } },
  proof: { name: "Proof before premium", badge: "Evidence work first", summary: "Improve HTS, origin, metal-content and supplier evidence before paying urgency premiums.", adjust: { freight: -8, policy: -22, warehouse: 0, finance: -4, demand: 0, proof: 24, margin: 2, days: 2 } },
  premium: { name: "Pay for time", badge: "Expedite exposed orders", summary: "Freight urgency rises, days-to-ship fall, and margin absorbs more premium cost.", adjust: { freight: 18, policy: 4, warehouse: 10, finance: 12, demand: 4, proof: -2, margin: -4, days: -8 } },
  airPocket: { name: "Import air pocket", badge: "Frontloading fades", summary: "Demand confidence falls after early movement while inventory and working-capital pressure rise.", adjust: { freight: -10, policy: 2, warehouse: 18, finance: 22, demand: -20, proof: 0, margin: -3, days: 16 } },
};

const sampleOrders = [
  { item: "Agricultural equipment kit", value: 1850000, margin: 18, days: 12, proof: 42, freight: 76, policy: 88, warehouse: 58, demand: 70 },
  { item: "Mobile industrial forklifts", value: 1320000, margin: 14, days: 18, proof: 36, freight: 70, policy: 84, warehouse: 62, demand: 66 },
  { item: "HVAC compressor assemblies", value: 910000, margin: 21, days: 24, proof: 55, freight: 62, policy: 72, warehouse: 54, demand: 74 },
  { item: "Material-handling racks", value: 470000, margin: 12, days: 35, proof: 64, freight: 48, policy: 68, warehouse: 78, demand: 44 },
  { item: "Replacement copper harnesses", value: 380000, margin: 26, days: 9, proof: 28, freight: 68, policy: 76, warehouse: 46, demand: 81 },
  { item: "Dealer demo equipment", value: 620000, margin: 16, days: 42, proof: 74, freight: 38, policy: 44, warehouse: 72, demand: 36 },
];

let orders = clone(sampleOrders);
let activeScenario = "baseline";

function clone(rows) { return rows.map((row) => ({ ...row })); }
function clamp(value, min = 0, max = 100) { return Math.max(min, Math.min(max, Number(value) || 0)); }
function money(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }

function setView(viewName) {
  views.forEach((view) => {
    const active = view.dataset.view === viewName;
    view.classList.toggle("is-active", active);
    view.hidden = !active;
  });
  document.querySelectorAll(".view-tab").forEach((button) => button.classList.toggle("is-active", button.dataset.viewTarget === viewName));
}

function adjusted(row) {
  const a = scenarios[activeScenario].adjust;
  return { ...row, days: clamp(row.days + a.days, 0, 120), margin: clamp(row.margin + a.margin, 0, 60), proof: clamp(row.proof + a.proof), freight: clamp(row.freight + a.freight), policy: clamp(row.policy + a.policy), warehouse: clamp(row.warehouse + a.warehouse), demand: clamp(row.demand + a.demand) };
}

function score(row) {
  const r = adjusted(row);
  const weakProof = 100 - r.proof;
  const demandGap = 100 - r.demand;
  const marginThin = clamp((24 - r.margin) * 3.3);
  const urgency = clamp((35 - r.days) * 2.4);
  const clocksScore = {
    freight: clamp(r.freight * 0.62 + urgency * 0.26 + marginThin * 0.12),
    policy: clamp(r.policy * 0.5 + weakProof * 0.34 + urgency * 0.16),
    warehouse: clamp(r.warehouse * 0.48 + Math.max(0, r.days - 24) * 1.1 + r.freight * 0.08),
    finance: clamp(marginThin * 0.46 + (r.value / 25000) * 0.18 + demandGap * 0.22 + r.freight * 0.12),
    commercial: clamp(demandGap * 0.48 + marginThin * 0.18 + Math.max(0, r.days - 30) * 0.45),
  };
  const top = Object.entries(clocksScore).sort((a, b) => b[1] - a[1])[0];
  const exposure = Math.round(clamp(Object.values(clocksScore).reduce((sum, value) => sum + value, 0) / 5 + (weakProof > 55 ? 8 : 0)));
  let action = "Review in triage";
  if (top[0] === "policy" && weakProof > 45) action = "Get HTS/content/origin proof";
  else if (top[0] === "freight" && r.days < 16) action = "Split or expedite only with proof";
  else if (top[0] === "warehouse") action = "Reserve receiving capacity first";
  else if (top[0] === "finance" && r.margin < 16) action = "Reprice or hold";
  else if (top[0] === "commercial") action = "Test demand before pull-forward";
  return { row: r, scores: clocksScore, topClock: top[0], exposure, action };
}

function renderScenarioActions() {
  scenarioActions.innerHTML = Object.entries(scenarios).map(([key, scenario]) => `<button class="scenario-button ${key === activeScenario ? "is-active" : ""}" type="button" data-scenario="${key}"><strong>${scenario.name}</strong><span>${scenario.summary}</span></button>`).join("");
}

function renderOrders() {
  const headers = ["Order", "Value", "Margin %", "Days", "Proof", "Freight", "Policy", "Warehouse", "Demand", "Action"];
  const rows = orders.map((order, index) => {
    const result = score(order);
    return `<div class="order-row" data-index="${index}"><div><input data-field="item" value="${order.item}" /></div><div><input data-field="value" type="number" min="0" step="10000" value="${order.value}" /></div><div><input data-field="margin" type="number" min="0" max="60" value="${order.margin}" /></div><div><input data-field="days" type="number" min="0" max="120" value="${order.days}" /></div><div><input data-field="proof" type="number" min="0" max="100" value="${order.proof}" /></div><div><input data-field="freight" type="number" min="0" max="100" value="${order.freight}" /></div><div><input data-field="policy" type="number" min="0" max="100" value="${order.policy}" /></div><div><input data-field="warehouse" type="number" min="0" max="100" value="${order.warehouse}" /></div><div><input data-field="demand" type="number" min="0" max="100" value="${order.demand}" /></div><div><span class="action-chip">${result.action}</span><span class="subread">${clocks[result.topClock]} · score ${result.exposure}</span></div></div>`;
  }).join("");
  orderTable.innerHTML = `<div class="order-header">${headers.map((header) => `<div>${header}</div>`).join("")}</div>${rows}`;
}

function renderReadout() {
  const scenario = scenarios[activeScenario];
  selectedScenario.textContent = scenario.name;
  scenarioBadge.textContent = scenario.badge;
  const results = orders.map(score);
  const total = orders.reduce((sum, row) => sum + Number(row.value || 0), 0);
  const high = results.filter((r) => r.exposure >= 68);
  const avg = Math.round(results.reduce((sum, r) => sum + r.exposure, 0) / results.length);
  const weakProof = results.filter((r) => r.row.proof < 50).length;
  summaryGrid.innerHTML = [["Book value", money(total)], ["High exposure", `${high.length} orders`], ["Average score", avg], ["Proof gaps", weakProof]].map(([label, value]) => `<div class="summary-card"><span>${label}</span><strong>${value}</strong></div>`).join("");
  totalValue.textContent = money(total);
  const clockTotals = Object.keys(clocks).map((clock) => [clock, results.reduce((sum, r) => sum + r.scores[clock], 0)]);
  const maxClock = Math.max(...clockTotals.map(([, value]) => value), 1);
  reasonBars.innerHTML = clockTotals.sort((a,b) => b[1] - a[1]).map(([clock, value]) => `<div><div class="bar-label"><span>${clocks[clock]}</span><strong>${Math.round(value)}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${Math.round((value / maxClock) * 100)}%"></div></div></div>`).join("");
  if (high.length >= 3) {
    portfolioRecommendation.textContent = "Create an exception board today";
    portfolioRationale.textContent = "Three or more equipment orders are above the exception threshold. Name the freight, trade, warehouse, finance or commercial owner before the next booking window.";
  } else if (weakProof >= 3) {
    portfolioRecommendation.textContent = "Proof before premium";
    portfolioRationale.textContent = "The weak point is evidence quality: HTS, metal content, origin, annex treatment and supplier attestation should move before urgent freight is approved.";
  } else {
    portfolioRecommendation.textContent = "Use selective premiums";
    portfolioRationale.textContent = "The queue is manageable if premiums are reserved for orders with real deadlines and adequate item-master proof.";
  }
}

function render() { renderScenarioActions(); renderOrders(); renderReadout(); }

viewButtons.forEach((button) => button.addEventListener("click", () => setView(button.dataset.viewTarget)));
scenarioActions.addEventListener("click", (event) => { const button = event.target.closest("[data-scenario]"); if (!button) return; activeScenario = button.dataset.scenario; render(); });
orderTable.addEventListener("input", (event) => {
  const input = event.target;
  const row = input.closest(".order-row");
  if (!row) return;
  const field = input.dataset.field;
  const index = Number(row.dataset.index);
  orders[index][field] = field === "item" ? input.value : Number(input.value);
  renderReadout();
});
orderTable.addEventListener("change", () => render());
resetOrders.addEventListener("click", () => { orders = clone(sampleOrders); activeScenario = "baseline"; render(); });
render();
