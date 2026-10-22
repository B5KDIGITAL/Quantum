const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('updateCalculator function', () => {
    let window;
    let document;
    let updateCalculator;

    beforeEach(() => {
        // Mock Chart and tailwind to avoid the error since it is not defined in this env
        global.Chart = class Chart { constructor() {} };
        global.Chart.defaults = { font: {} };
        global.tailwind = { config: {} };

        const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
        const dom = new JSDOM(html, {
            runScripts: "dangerously",
            beforeParse(window) {
                // Attach the mock to the JSDOM window
                window.Chart = global.Chart;
                window.tailwind = global.tailwind;
            }
        });
        window = dom.window;
        document = window.document;

        // Get the function from the global scope (since it's a global function in index.html)
        updateCalculator = window.updateCalculator;
    });

    test('should calculate revenue correctly with standard inputs', () => {
        const volumeInput = document.getElementById('scrapeVolume');
        const priceInput = document.getElementById('crawlPrice');
        const acceptanceInput = document.getElementById('botAcceptance');

        const volumeValueDisplay = document.getElementById('volumeValue');
        const priceValueDisplay = document.getElementById('priceValue');
        const acceptanceValueDisplay = document.getElementById('acceptanceValue');

        const calculatedRevenueDisplay = document.getElementById('calculatedRevenue');
        const annualRevenueDisplay = document.getElementById('annualRevenue');

        volumeInput.value = "100000";
        priceInput.value = "0.005";
        acceptanceInput.value = "50";

        // Dispatch input event to trigger calculation, or call function directly
        window.updateCalculator();

        expect(volumeValueDisplay.textContent).toBe('100,000 URLs');
        expect(priceValueDisplay.textContent).toBe('$0.005');
        expect(acceptanceValueDisplay.textContent).toBe('50%');
        expect(calculatedRevenueDisplay.textContent).toBe('$250.00');
        expect(annualRevenueDisplay.textContent).toBe('$3,000.00');
    });

    test('should calculate revenue correctly with minimum valid values', () => {
        const volumeInput = document.getElementById('scrapeVolume');
        const priceInput = document.getElementById('crawlPrice');
        const acceptanceInput = document.getElementById('botAcceptance');

        const volumeValueDisplay = document.getElementById('volumeValue');
        const priceValueDisplay = document.getElementById('priceValue');
        const acceptanceValueDisplay = document.getElementById('acceptanceValue');

        const calculatedRevenueDisplay = document.getElementById('calculatedRevenue');
        const annualRevenueDisplay = document.getElementById('annualRevenue');

        volumeInput.value = "50000";
        priceInput.value = "0.001";
        acceptanceInput.value = "10";

        window.updateCalculator();

        expect(volumeValueDisplay.textContent).toBe('50,000 URLs');
        expect(priceValueDisplay.textContent).toBe('$0.001');
        expect(acceptanceValueDisplay.textContent).toBe('10%');

        expect(calculatedRevenueDisplay.textContent).toBe('$5.00');
        expect(annualRevenueDisplay.textContent).toBe('$60.00');
    });

    test('should calculate revenue correctly with maximum valid values', () => {
        const volumeInput = document.getElementById('scrapeVolume');
        const priceInput = document.getElementById('crawlPrice');
        const acceptanceInput = document.getElementById('botAcceptance');

        const volumeValueDisplay = document.getElementById('volumeValue');
        const priceValueDisplay = document.getElementById('priceValue');
        const acceptanceValueDisplay = document.getElementById('acceptanceValue');

        const calculatedRevenueDisplay = document.getElementById('calculatedRevenue');
        const annualRevenueDisplay = document.getElementById('annualRevenue');

        volumeInput.value = "5000000";
        priceInput.value = "0.05";
        acceptanceInput.value = "90";

        window.updateCalculator();

        expect(volumeValueDisplay.textContent).toBe('5,000,000 URLs');
        expect(priceValueDisplay.textContent).toBe('$0.050');
        expect(acceptanceValueDisplay.textContent).toBe('90%');

        expect(calculatedRevenueDisplay.textContent).toBe('$225,000.00');
        expect(annualRevenueDisplay.textContent).toBe('$2,700,000.00');
    });
});
