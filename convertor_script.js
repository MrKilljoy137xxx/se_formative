document.getElementById('swap-btn').addEventListener('click', function() {
    const from = document.getElementById('from-currency');
    const to = document.getElementById('to-currency');
    [from.value, to.value] = [to.value, from.value];
});


document.getElementById('converter-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('from-currency').value;
    const to = document.getElementById('to-currency').value;
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').textContent = '';
    try {
        // Example API: https://api.exchangerate-api.com/v4/latest/USD
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await res.json();
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);
        document.getElementById('result').textContent = `${amount} ${from} = ${converted} ${to}`;
        // Save to history
        let history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
        history.unshift(`${amount} ${from} → ${converted} ${to}`);
        localStorage.setItem('conversionHistory', JSON.stringify(history.slice(0, 5)));
        showHistory();
    } catch (err) {
        document.getElementById('result').textContent = 'Error fetching rates.';
    }
    document.getElementById('loading').style.display = 'none';
});

function showHistory() {
    let history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    document.getElementById('history').innerHTML = history.length
        ? `<strong>Recent:</strong><ul>${history.map(h => `<li>${h}</li>`).join('')}</ul>`
        : '';
}
showHistory();