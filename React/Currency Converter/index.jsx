const { useState, useMemo } = React;

export function CurrencyConverter() {
    const [amount, setAmount] = useState(1);  // Cambié a 1 por defecto
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');

    const rates = {
        USD: { EUR: 0.85, GBP: 0.75, JPY: 110 },
        EUR: { USD: 1.18, GBP: 0.88, JPY: 129 },
        GBP: { USD: 1.33, EUR: 1.14, JPY: 147 },
        JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0068 },
    };

    // CALCULO ÚNICO memoizado
    const allRatesFromBase = useMemo(() => {
        
        const baseRates = rates[fromCurrency];
        return {
            USD: fromCurrency === 'USD' ? amount : amount * (baseRates.USD || 1),
            EUR: fromCurrency === 'EUR' ? amount : amount * (baseRates.EUR || 1),
            GBP: fromCurrency === 'GBP' ? amount : amount * (baseRates.GBP || 1),
            JPY: fromCurrency === 'JPY' ? amount : amount * (baseRates.JPY || 1),
        };
    }, [amount, fromCurrency]);

    // Esto NO recalcula cuando toCurrency cambia
    const displayValue = allRatesFromBase[toCurrency];
    const displayText = `${displayValue.toFixed(2)} ${toCurrency}`;

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {['USD','EUR','GBP','JPY'].map(curr => 
                    <option key={curr} value={curr}>{curr}</option>
                )}
            </select>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {['USD','EUR','GBP','JPY'].map(curr => 
                    <option key={curr} value={curr}>{curr}</option>
                )}
            </select>
            
            <div>
                Converted Amount: {displayText}
            </div>
        </div>
    );
}