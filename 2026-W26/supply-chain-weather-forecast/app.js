const $ = (id) => document.getElementById(id);
let newsletterMarkdown = '';

function showView(target) {
  document.querySelectorAll('.view').forEach((view) => view.classList.toggle('active', view.id === target));
  document.querySelectorAll('.tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.target === target));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function markdownFor(data) {
  const zones = data.zones.map((z) => `| ${z.name} | ${z.weather} | ${z.operator_meaning} |`).join('\n');
  const watch = data.operator_watchlist.map((item) => `- ${item}`).join('\n');
  return `## ${data.newsletter_insert.title}: ${data.newsletter_insert.headline}\n\n${data.newsletter_insert.body}\n\n| Zone | Weather | Operator meaning |\n|---|---|---|\n${zones}\n\n**Operator translation:** ${data.newsletter_insert.operator_translation}\n\n**Watchlist**\n${watch}\n\n**Forecast confidence:** ${data.confidence}  \n**Forecast horizon:** ${data.forecast_horizon}\n`;
}

function render(data) {
  $('dek').textContent = data.dek;
  $('headline').textContent = data.headline;
  $('summary').textContent = data.newsletter_insert.body;
  $('chain').textContent = data.chain_candidate;
  $('horizon').textContent = data.forecast_horizon;
  $('confidence').textContent = data.confidence;

  $('referenceCards').innerHTML = data.reference_cards.map((card) => `
    <div class="fact"><span>${card.label}</span><strong>${card.value}</strong><p>${card.note}</p></div>
  `).join('');

  $('zones').innerHTML = data.zones.map((zone) => `
    <article class="zone ${zone.severity}">
      <span class="severity">${zone.name} · ${zone.severity}</span>
      <h3 class="weather">${zone.weather}</h3>
      <p>${zone.operator_meaning}</p>
      <p class="watch"><strong>Watch:</strong> ${zone.watch}</p>
    </article>
  `).join('');

  $('watchlist').innerHTML = data.operator_watchlist.map((item) => `<li>${item}</li>`).join('');
  newsletterMarkdown = markdownFor(data);
  $('newsletterTitle').textContent = `${data.newsletter_insert.title}: ${data.newsletter_insert.headline}`;
  $('newsletterMarkdown').textContent = newsletterMarkdown;
}

async function init() {
  document.querySelectorAll('[data-target]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.target)));
  $('copyMarkdown').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(newsletterMarkdown);
      $('copyStatus').textContent = 'Copied newsletter Markdown.';
    } catch (err) {
      $('copyStatus').textContent = 'Copy failed; select the Markdown block manually.';
    }
  });
  const response = await fetch('./data/2026-W26.json');
  if (!response.ok) throw new Error(`Could not load forecast data: ${response.status}`);
  render(await response.json());
}

init().catch((error) => {
  document.body.innerHTML = `<main class="shell"><section class="panel"><h1>Forecast failed to load</h1><p>${error.message}</p></section></main>`;
});
