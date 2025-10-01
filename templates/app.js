// Range ve number inputlarını senkronize et
const pairs = [
  ['pace_range','pace'], ['shooting_range','shooting'], ['passing_range','passing'],
  ['dribbling_range','dribbling'], ['defending_range','defending'], ['physic_range','physic']
];
for (const [rId, nId] of pairs) {
  const r = document.getElementById(rId);
  const n = document.getElementById(nId);
  r.addEventListener('input', () => { n.value = r.value });
  n.addEventListener('input', () => { r.value = clamp(n.value) });
}
function clamp(v){
  const x = Number(v); if (Number.isNaN(x)) return 0; return Math.max(0, Math.min(99, x));
}

const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const resultEl = document.getElementById('result');
const errorEl = document.getElementById('error');
const payloadView = document.getElementById('payloadView');
const predictionView = document.getElementById('predictionView');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.hidden = true; resultEl.hidden = true; resultEl.classList.remove('success');

  const payload = Object.fromEntries(new FormData(form).entries());
  for (const k in payload) payload[k] = clamp(payload[k]);
  payloadView.textContent = JSON.stringify(payload);

  try {
    submitBtn.setAttribute('aria-busy','true');
    const res = await fetch('/predict', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await res.text() || 'İstek başarısız oldu');
    const data = await res.json();
    const value = Number(data.predicted_price);
    predictionView.textContent = Number.isFinite(value) ? value.toFixed(2) : String(data.predicted_price);
    resultEl.textContent = 'Tahmin edilen overall: ' + (Number.isFinite(value) ? value.toFixed(2) : '—');
    resultEl.classList.add('success');
    resultEl.hidden = false;
  } catch (err) {
    errorEl.textContent = 'Hata: ' + (err && err.message ? err.message : 'Bilinmeyen hata');
    errorEl.hidden = false;
  } finally {
    submitBtn.setAttribute('aria-busy','false');
  }
});

resetBtn.addEventListener('click', () => {
  form.reset();
  for (const [rId, nId] of pairs) {
    const r = document.getElementById(rId); const n = document.getElementById(nId);
    r.value = n.value || 0;
  }
  resultEl.hidden = true; errorEl.hidden = true; payloadView.textContent = '{}'; predictionView.textContent = '—';
});



