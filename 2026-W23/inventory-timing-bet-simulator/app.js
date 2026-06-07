const scenarioActions = document.querySelector("#scenarioActions");
const portfolioTable = document.querySelector("#portfolioTable");
const selectedScenario = document.querySelector("#selectedScenario");
const scenarioBadge = document.querySelector("#scenarioBadge");
const summaryGrid = document.querySelector("#summaryGrid");
const portfolioValue = document.querySelector("#portfolioValue");
const reasonBars = document.querySelector("#reasonBars");
const portfolioRecommendation = document.querySelector("#portfolioRecommendation");
const portfolioRationale = document.querySelector("#portfolioRationale");
const resetPortfolio = document.querySelector("#resetPortfolio");

const reasonLabels = {
  service: "Service Buffer",
  tariff: "Tariff Hedge",
  freight: "Freight Hedge",
  supplier: "Supplier-Risk Buffer",
  oldForecast: "Old Forecast Risk",
};

const policyDefaults = {
  AX: { service: 98, tolerance: 9, label: "Critical promise" },
  AY: { service: 97, tolerance: 8, label: "High service" },
  AZ: { service: 96, tolerance: 7, label: "High watch" },
  BX: { service: 96, tolerance: 7, label: "High service" },
  BY: { service: 94, tolerance: 5, label: "Balanced" },
  BZ: { service: 92, tolerance: 4, label: "Selective buffer" },
  CX: { service: 92, tolerance: 4, label: "Selective buffer" },
  CY: { service: 88, tolerance: 2, label: "Lean service" },
  CZ: { service: 85, tolerance: 1, label: "Tight cash" },
};

const scenarioDefinitions = {
  softLanding: {
    name: "Soft landing",
    badge: "Freight and tariff pressure fade",
    summary: "Demand holds, freight increases fade, and tariff detail becomes clearer.",
    adjustments: { days: -8, demand: 10, tariff: -18, freight: -22, supplier: -12, capital: -8 },
  },
  bullwhip: {
    name: "Bullwhip hangover",
    badge: "Front-loaded demand fades",
    summary: "Orders were pulled forward; service looks fine while aging and cash drag rise.",
    adjustments: { days: 22, demand: -24, tariff: -8, freight: -10, supplier: 2, capital: 18 },
  },
  squeeze: {
    name: "Policy and freight squeeze",
    badge: "Tariff, freight, and supplier clocks stay hot",
    summary: "GRIs stick, tariff uncertainty persists, and supplier deliveries remain slow.",
    adjustments: { days: 10, demand: -8, tariff: 28, freight: 30, supplier: 22, capital: 12 },
  },
};

const samplePortfolio = [
  {
    sku: "Imported appliance motors",
    abc: "A",
    xyz: "X",
    days: 42,
    value: 1420000,
    demand: 86,
    tariff: 72,
    freight: 64,
    supplier: 58,
    capital: 46,
  },
  {
    sku: "Retail promo displays",
    abc: "B",
    xyz: "Z",
    days: 88,
    value: 520000,
    demand: 38,
    tariff: 48,
    freight: 62,
    supplier: 42,
    capital: 78,
  },
  {
    sku: "Contract packaging film",
    abc: "A",
    xyz: "Y",
    days: 58,
    value: 970000,
    demand: 72,
    tariff: 35,
    freight: 54,
    supplier: 68,
    capital: 52,
  },
  {
    sku: "Seasonal accessories",
    abc: "C",
    xyz: "Z",
    days: 124,
    value: 230000,
    demand: 24,
    tariff: 22,
    freight: 38,
    supplier: 30,
    capital: 84,
  },
  {
    sku: "Private-label electronics",
    abc: "A",
    xyz: "Z",
    days: 76,
    value: 1180000,
    demand: 54,
    tariff: 82,
    freight: 76,
    supplier: 70,
    capital: 66,
  },
  {
    sku: "Regional fast movers",
    abc: "B",
    xyz: "X",
    days: 36,
    value: 680000,
    demand: 88,
    tariff: 18,
    freight: 34,
    supplier: 46,
    capital: 32,
  },
  {
    sku: "Long-lead spare parts",
    abc: "C",
    xyz: "X",
    days: 66,
    value: 310000,
    demand: 62,
    tariff: 28,
    freight: 42,
    supplier: 86,
    capital: 44,
  },
  {
    sku: "Imported kitchen bundles",
    abc: "B",
    xyz: "Y",
    days: 64,
    value: 760000,
    demand: 58,
    tariff: 66,
    freight: 70,
    supplier: 54,
    capital: 62,
  },
];

let portfolio = clonePortfolio(samplePortfolio);
let activeScenario = "softLanding";

function clonePortfolio(rows) {
  return rows.map((row) => ({ ...row }));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getPolicy(row) {
  return policyDefaults[`${row.abc}${row.xyz}`] ?? policyDefaults.BY;
}

function applyScenario(row, scenarioKey) {
  const adjustment = scenarioDefinitions[scenarioKey].adjustments;
  return {
    ...row,
    days: clamp(row.days + adjustment.days, 5, 180),
    demand: clamp(row.demand + adjustment.demand),
    tariff: clamp(row.tariff + adjustment.tariff),
    freight: clamp(row.freight + adjustment.freight),
    supplier: clamp(row.supplier + adjustment.supplier),
    capital: clamp(row.capital + adjustment.capital),
  };
}

function classify(row) {
  const policy = getPolicy(row);
  const excessDays = clamp((row.days - 45) * 0.9);
  const demandGap = 100 - row.demand;
  const valueDrag = clamp(row.value / 2000000) * 20;
  const serviceGap = Math.max(0, policy.service - row.demand);
  const toleranceRelief = policy.tolerance * 2.2;
  const capitalDrag = row.capital * 0.4 + excessDays * 0.45 + valueDrag * 0.15;

  const scores = {
    service: clamp(row.demand * 0.62 + row.supplier * 0.16 + policy.service * 0.16 + Math.max(0, 65 - row.days) * 0.06),
    tariff: clamp(row.tariff * 0.72 + row.demand * 0.1 + excessDays * 0.12 - toleranceRelief * 0.18),
    freight: clamp(row.freight * 0.7 + row.demand * 0.1 + excessDays * 0.14 - toleranceRelief * 0.14),
    supplier: clamp(row.supplier * 0.72 + row.demand * 0.12 + serviceGap * 0.18 + Math.max(0, 85 - row.days) * 0.04),
    oldForecast: clamp(demandGap * 0.44 + capitalDrag * 0.36 + excessDays * 0.18 - toleranceRelief * 0.12),
  };

  const topReason = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const timingRisk = Math.round(
    clamp(
      row.tariff * 0.15 +
        row.freight * 0.15 +
        row.supplier * 0.16 +
        row.capital * 0.18 +
        valueDrag * 0.08 +
        demandGap * 0.16 +
        serviceGap * 0.08 +
        excessDays * 0.12 -
        policy.tolerance * 0.9,
    ),
  );

  let action = "Review before next order";
  if (topReason === "service" && row.demand >= 70 && timingRisk < 55) {
    action = "Hold with reorder trigger";
  } else if (topReason === "oldForecast" && row.capital >= 70) {
    action = "Stop-buy and sell through";
  } else if (topReason === "oldForecast") {
    action = "Sell through";
  } else if (["tariff", "freight"].includes(topReason) && row.demand < 55) {
    action = "Reclassify before next order";
  } else if (topReason === "supplier") {
    action = "Hold with supplier trigger";
  } else if (timingRisk >= 70) {
    action = "Separate reason codes now";
  }

  return {
    scores,
    topReason,
    timingRisk,
    action,
    policy,
  };
}

function renderScenarioActions() {
  scenarioActions.innerHTML = Object.entries(scenarioDefinitions)
    .map(
      ([key, scenario]) => `
        <button class="scenario-button ${key === activeScenario ? "is-active" : ""}" type="button" data-scenario="${key}">
          <strong>${scenario.name}</strong>
          <span>${scenario.summary}</span>
        </button>
      `,
    )
    .join("");
}

function renderPortfolio() {
  const rows = portfolio
    .map((row, index) => {
      const baseline = classify(row);
      const scenarioRow = applyScenario(row, activeScenario);
      const scenarioResult = classify(scenarioRow);
      const delta = scenarioResult.timingRisk - baseline.timingRisk;
      const policy = getPolicy(row);

      return `
        <article class="sku-row" data-index="${index}">
          <div class="sku-name">
            <label>
              <span>SKU / family</span>
              <input data-field="sku" type="text" value="${row.sku}" />
            </label>
            <div class="policy-chip" data-policy-chip>${row.abc}${row.xyz} · ${policy.service}% service · ${policy.tolerance}% tolerance</div>
          </div>

          <label>
            <span>ABC</span>
            <select data-field="abc">
              ${["A", "B", "C"].map((value) => `<option value="${value}" ${row.abc === value ? "selected" : ""}>${value}</option>`).join("")}
            </select>
          </label>

          <label>
            <span>XYZ</span>
            <select data-field="xyz">
              ${["X", "Y", "Z"].map((value) => `<option value="${value}" ${row.xyz === value ? "selected" : ""}>${value}</option>`).join("")}
            </select>
          </label>

          <label>
            <span>Days</span>
            <input data-field="days" type="number" min="5" max="180" step="1" value="${row.days}" />
          </label>

          <label>
            <span>Value</span>
            <input data-field="value" type="number" min="0" step="10000" value="${row.value}" />
          </label>

          <label>
            <span>Demand</span>
            <input data-field="demand" type="number" min="0" max="100" step="1" value="${row.demand}" />
          </label>

          <label>
            <span>Tariff</span>
            <input data-field="tariff" type="number" min="0" max="100" step="1" value="${row.tariff}" />
          </label>

          <label>
            <span>Freight</span>
            <input data-field="freight" type="number" min="0" max="100" step="1" value="${row.freight}" />
          </label>

          <label>
            <span>Supplier</span>
            <input data-field="supplier" type="number" min="0" max="100" step="1" value="${row.supplier}" />
          </label>

          <label>
            <span>Capital</span>
            <input data-field="capital" type="number" min="0" max="100" step="1" value="${row.capital}" />
          </label>

          <div class="row-result" data-row-result>
            <span>${reasonLabels[baseline.topReason]}</span>
            <strong>${baseline.timingRisk} → ${scenarioResult.timingRisk}</strong>
            <small class="${delta >= 0 ? "is-up" : "is-down"}">${delta >= 0 ? "+" : ""}${delta} risk · ${scenarioResult.action}</small>
          </div>
        </article>
      `;
    })
    .join("");

  portfolioTable.innerHTML = `
    <div class="table-head" aria-hidden="true">
      <span>SKU / family</span>
      <span>ABC</span>
      <span>XYZ</span>
      <span>Days</span>
      <span>Value</span>
      <span>Demand</span>
      <span>Tariff</span>
      <span>Freight</span>
      <span>Supplier</span>
      <span>Capital</span>
      <span>Baseline → scenario</span>
    </div>
    ${rows}
  `;
}

function renderRowResult(index) {
  const rowElement = portfolioTable.querySelector(`[data-index="${index}"]`);
  if (!rowElement) return;

  const row = portfolio[index];
  const policy = getPolicy(row);
  const baseline = classify(row);
  const scenarioRow = applyScenario(row, activeScenario);
  const scenarioResult = classify(scenarioRow);
  const delta = scenarioResult.timingRisk - baseline.timingRisk;

  rowElement.querySelector("[data-policy-chip]").textContent =
    `${row.abc}${row.xyz} · ${policy.service}% service · ${policy.tolerance}% tolerance`;
  rowElement.querySelector("[data-row-result]").innerHTML = `
    <span>${reasonLabels[baseline.topReason]}</span>
    <strong>${baseline.timingRisk} → ${scenarioResult.timingRisk}</strong>
    <small class="${delta >= 0 ? "is-up" : "is-down"}">${delta >= 0 ? "+" : ""}${delta} risk · ${scenarioResult.action}</small>
  `;
}

function refreshRowResults() {
  portfolio.forEach((_, index) => renderRowResult(index));
}

function summarizePortfolio() {
  const baselineResults = portfolio.map((row) => ({ row, result: classify(row), scenario: classify(applyScenario(row, activeScenario)) }));
  const totalValue = portfolio.reduce((sum, row) => sum + row.value, 0);
  const valueAtRisk = baselineResults
    .filter(({ result }) => result.timingRisk >= 60)
    .reduce((sum, { row }) => sum + row.value, 0);
  const avgBaseline = Math.round(baselineResults.reduce((sum, item) => sum + item.result.timingRisk, 0) / baselineResults.length);
  const avgScenario = Math.round(baselineResults.reduce((sum, item) => sum + item.scenario.timingRisk, 0) / baselineResults.length);
  const stopBuyCount = baselineResults.filter(({ scenario }) => scenario.action.includes("Stop-buy") || scenario.action.includes("Reclassify")).length;

  const reasonTotals = baselineResults.reduce((totals, { row, result }) => {
    totals[result.topReason] = (totals[result.topReason] ?? 0) + row.value;
    return totals;
  }, {});

  summaryGrid.innerHTML = [
    ["Portfolio value", formatCurrency(totalValue)],
    ["Value at 60+ risk", formatCurrency(valueAtRisk)],
    ["Avg risk shift", `${avgBaseline} → ${avgScenario}`],
    ["Scenario exceptions", `${stopBuyCount} SKUs`],
  ]
    .map(
      ([label, value]) => `
        <div class="summary-tile">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
      `,
    )
    .join("");

  portfolioValue.textContent = formatCurrency(totalValue);
  reasonBars.innerHTML = Object.entries(reasonLabels)
    .map(([key, label]) => {
      const value = reasonTotals[key] ?? 0;
      const width = totalValue > 0 ? Math.round((value / totalValue) * 100) : 0;
      return `
        <div class="bar-row">
          <div class="bar-head"><span>${label}</span><strong>${width}%</strong></div>
          <div class="bar-track"><div class="bar-fill" style="--width: ${width}%"></div></div>
        </div>
      `;
    })
    .join("");

  const highestImpact = baselineResults
    .map(({ row, result, scenario }) => ({ row, result, scenario, delta: scenario.timingRisk - result.timingRisk }))
    .sort((a, b) => b.delta - a.delta)[0];

  if (highestImpact.delta <= 0) {
    portfolioRecommendation.textContent = "Hold buffers with trigger review";
    portfolioRationale.textContent = `${scenarioDefinitions[activeScenario].name} lowers risk across the portfolio. Keep reorder triggers tied to sell-through.`;
  } else if (highestImpact.scenario.timingRisk >= 70) {
    portfolioRecommendation.textContent = "Separate exposed SKUs before buying";
    portfolioRationale.textContent = `${highestImpact.row.sku} moves hardest under ${scenarioDefinitions[activeScenario].name}. Review demand proof, reason code, and next PO timing.`;
  } else {
    portfolioRecommendation.textContent = "Review the exposed tail";
    portfolioRationale.textContent = `${highestImpact.row.sku} has the largest scenario risk shift. Keep the policy target, but tighten the next decision date.`;
  }
}

function update() {
  const scenario = scenarioDefinitions[activeScenario];
  selectedScenario.textContent = scenario.name;
  scenarioBadge.textContent = scenario.badge;
  renderScenarioActions();
  if (!portfolioTable.children.length) {
    renderPortfolio();
  } else {
    refreshRowResults();
  }
  summarizePortfolio();
}

scenarioActions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-scenario]");
  if (!button) return;
  activeScenario = button.dataset.scenario;
  update();
});

portfolioTable.addEventListener("input", (event) => {
  const field = event.target.dataset.field;
  const rowElement = event.target.closest("[data-index]");
  if (!field || !rowElement) return;

  const index = Number(rowElement.dataset.index);
  const value = event.target.type === "number" ? Number(event.target.value) : event.target.value;
  portfolio[index][field] = value;
  renderRowResult(index);
  summarizePortfolio();
});

portfolioTable.addEventListener("change", (event) => {
  const field = event.target.dataset.field;
  const rowElement = event.target.closest("[data-index]");
  if (!field || !rowElement) return;

  const index = Number(rowElement.dataset.index);
  portfolio[index][field] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
  renderRowResult(index);
  summarizePortfolio();
});

resetPortfolio.addEventListener("click", () => {
  portfolio = clonePortfolio(samplePortfolio);
  activeScenario = "softLanding";
  portfolioTable.innerHTML = "";
  update();
});

update();
