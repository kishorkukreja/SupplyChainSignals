const form = document.querySelector("#signal-form");
const inventoryDays = document.querySelector("#inventoryDays");
const inventoryDaysValue = document.querySelector("#inventoryDaysValue");
const classification = document.querySelector("#classification");
const confidenceBadge = document.querySelector("#confidenceBadge");
const riskScore = document.querySelector("#riskScore");
const capitalAtRisk = document.querySelector("#capitalAtRisk");
const reasonBars = document.querySelector("#reasonBars");
const recommendation = document.querySelector("#recommendation");
const rationale = document.querySelector("#rationale");

const reasonLabels = {
  service: "Service Buffer",
  tariff: "Tariff Hedge",
  freight: "Freight Hedge",
  supplier: "Supplier-Risk Buffer",
  oldForecast: "Old Forecast Risk",
};

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function readInputs() {
  const data = new FormData(form);
  return {
    days: Number(data.get("inventoryDays")),
    value: Number(data.get("inventoryValue")),
    demand: Number(data.get("demandConfidence")),
    tariff: Number(data.get("tariffExposure")),
    freight: Number(data.get("freightExposure")),
    supplier: Number(data.get("supplierDelayRisk")),
    capital: Number(data.get("workingCapitalPressure")),
  };
}

function classify(inputs) {
  const excessDays = clamp((inputs.days - 45) * 0.9);
  const demandGap = 100 - inputs.demand;
  const valueDrag = clamp(inputs.value / 2000000) * 20;
  const capitalDrag = inputs.capital * 0.4 + excessDays * 0.45 + valueDrag * 0.15;

  // Scoring is intentionally simple: inventory is tagged by the strongest reason it exists.
  // Demand-backed stock becomes service buffer; exposure-backed stock becomes a hedge;
  // weak-demand, high-cash-pressure stock becomes old forecast risk.
  const scores = {
    service: clamp(inputs.demand * 0.72 + inputs.supplier * 0.18 + Math.max(0, 65 - inputs.days) * 0.1),
    tariff: clamp(inputs.tariff * 0.78 + inputs.demand * 0.12 + excessDays * 0.1),
    freight: clamp(inputs.freight * 0.76 + inputs.demand * 0.1 + excessDays * 0.14),
    supplier: clamp(inputs.supplier * 0.82 + inputs.demand * 0.13 + Math.max(0, 85 - inputs.days) * 0.05),
    oldForecast: clamp(demandGap * 0.48 + capitalDrag * 0.38 + excessDays * 0.14),
  };

  const topReason = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const timingRisk = Math.round(
    clamp(
      inputs.tariff * 0.16 +
        inputs.freight * 0.16 +
        inputs.supplier * 0.18 +
        inputs.capital * 0.2 +
        valueDrag * 0.08 +
        demandGap * 0.18 +
        excessDays * 0.12,
    ),
  );

  let action = "Review before next order";
  let cadence = "Review cadence: weekly";
  let reason =
    "Exposure and demand signals are mixed, so hold the tag and revisit before creating a fresh purchase order.";

  if (topReason === "service" && inputs.demand >= 70 && timingRisk < 55) {
    action = "Hold with reorder trigger";
    cadence = "Review cadence: biweekly";
    reason = "Demand support is credible. Keep the buffer, but tie the next order to confirmed sell-through.";
  } else if (topReason === "oldForecast" && inputs.capital >= 70) {
    action = "Stop-buy and sell through";
    cadence = "Review cadence: twice weekly";
    reason = "Working-capital pressure and weak demand make this stock vulnerable to becoming yesterday's forecast.";
  } else if (topReason === "oldForecast") {
    action = "Sell through";
    cadence = "Review cadence: weekly";
    reason = "The stock needs demand proof before more buys. Prioritize aging, margin, and committed demand checks.";
  } else if (["tariff", "freight"].includes(topReason) && inputs.demand < 55) {
    action = "Reclassify before next order";
    cadence = "Review cadence: before PO release";
    reason = "The hedge may be rational, but demand is not strong enough to manage it like service inventory.";
  } else if (topReason === "supplier") {
    action = "Hold with supplier trigger";
    cadence = "Review cadence: weekly";
    reason = "Supplier risk justifies some buffer. Release new buys only when lead-time variance stays elevated.";
  } else if (timingRisk >= 70) {
    action = "Review before next order";
    cadence = "Review cadence: immediate";
    reason = "The position is being pulled by too many clocks at once. Separate the reason codes before committing cash.";
  }

  return {
    scores,
    topReason,
    timingRisk,
    action,
    cadence,
    reason,
  };
}

function renderBars(scores) {
  reasonBars.innerHTML = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => {
      const rounded = Math.round(value);
      return `
        <div class="bar-row">
          <div class="bar-head"><span>${reasonLabels[key]}</span><strong>${rounded}</strong></div>
          <div class="bar-track"><div class="bar-fill" style="--width: ${rounded}%"></div></div>
        </div>
      `;
    })
    .join("");
}

function update() {
  const inputs = readInputs();
  const result = classify(inputs);

  inventoryDaysValue.textContent = `${inputs.days} days`;
  capitalAtRisk.textContent = `${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(inputs.value)} at risk`;
  classification.textContent = reasonLabels[result.topReason];
  confidenceBadge.textContent = result.cadence;
  riskScore.textContent = result.timingRisk;
  recommendation.textContent = result.action;
  rationale.textContent = result.reason;
  renderBars(result.scores);
}

form.addEventListener("input", update);
form.addEventListener("change", update);
update();
