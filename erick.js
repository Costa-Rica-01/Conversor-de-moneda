

const amount = document.getElementById('amount');
const from = document.getElementById('from');
const to = document.getElementById('to');
const result = document.getElementById('result');
const rateInfo = document.getElementById('rateInfo');

async function convert() {
  const val = parseFloat(amount.value);
  if (isNaN(val)) return;

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from.value}`);
    const data = await res.json();
    const rate = data.rates[to.value];

    const total = (val * rate).toFixed(2);
    
    result.textContent = `${val} ${from.value} = ${total} ${to.value}`;
    rateInfo.textContent = `1 ${from.value} = ${rate.toFixed(4)} ${to.value} • Updated: ${data.time_last_update_utc.slice(0,16)}`;

  } catch (e) {
    result.textContent = "Connection error";
    rateInfo.textContent = "Check your internet";
  }
}

// Events
amount.addEventListener('input', convert);
from.addEventListener('change', convert);
to.addEventListener('change', convert);

document.getElementById('swapBtn').addEventListener('click', () => {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
  convert();
});

// Print Page
document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});

// Load on startup
convert();