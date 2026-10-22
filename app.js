        // Label formatting function enforcing <= 16 character wrapping logic
        function formatLabel(str, maxLen = 16) {
            if (typeof str !== 'string' || str.length <= maxLen) return str;
            const words = str.split(' ');
            const lines = [];
            let currentLine = '';
            words.forEach(word => {
                if ((currentLine + ' ' + word).trim().length > maxLen) {
                    if (currentLine) lines.push(currentLine.trim());
                    currentLine = word;
                } else {
                    currentLine += (currentLine ? ' ' : '') + word;
                }
            });
            if (currentLine) lines.push(currentLine.trim());
            return lines;
        }

        // Global Chart Defaults for Tooltips & Styling
        Chart.defaults.color = '#9CA3AF';
        Chart.defaults.font.family = 'system-ui, sans-serif';

        const mandatoryTooltipConfig = {
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            const item = tooltipItems[0];
                            let label = item.chart.data.labels[item.dataIndex];
                            if (Array.isArray(label)) {
                              return label.join(' ');
                            } else {
                              return label;
                            }
                        }
                    }
                }
            }
        };

        // 1. Radar Chart: Capability Balance Matrix
        const spiderCtx = document.getElementById('spiderChartCanvas').getContext('2d');
        const spiderRawLabels = [
            "Crawl Concurrency",
            "Edge Remediation",
            "GEO AI Readiness",
            "Token Payload Efficiency",
            "Autonomous Code Generation",
            "HTTP 402 Monetization"
        ];

        new Chart(spiderCtx, {
            type: 'radar',
            data: {
                labels: spiderRawLabels.map(l => formatLabel(l, 16)),
                datasets: [
                    {
                        label: 'Quantum Crawl (Edge-Native)',
                        data: [98, 95, 96, 90, 92, 94],
                        backgroundColor: 'rgba(6, 182, 212, 0.25)',
                        borderColor: '#06B6D4',
                        pointBackgroundColor: '#06B6D4',
                        pointBorderColor: '#fff',
                        borderWidth: 2
                    },
                    {
                        label: 'Screaming Frog (Desktop Java)',
                        data: [45, 0, 20, 35, 0, 0],
                        backgroundColor: 'rgba(244, 63, 94, 0.15)',
                        borderColor: '#F43F5E',
                        pointBackgroundColor: '#F43F5E',
                        pointBorderColor: '#fff',
                        borderWidth: 1.5
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: '#1F2937' },
                        grid: { color: '#1F2937' },
                        pointLabels: {
                            color: '#D1D5DB',
                            font: { size: 10, weight: '600' }
                        },
                        ticks: { display: false, max: 100 }
                    }
                },
                plugins: mandatoryTooltipConfig.plugins
            }
        });

        // 2. Bar Chart: Throughput Speed Benchmark
        const throughputCtx = document.getElementById('throughputChartCanvas').getContext('2d');
        const throughputRawLabels = [
            "SF RAM Storage Mode",
            "SF Disk SQL Mode",
            "Quantum Swarm Engine"
        ];

        new Chart(throughputCtx, {
            type: 'bar',
            data: {
                labels: throughputRawLabels.map(l => formatLabel(l, 16)),
                datasets: [{
                    label: 'URLs Crawled / Min',
                    data: [5000, 1200, 125000],
                    backgroundColor: [
                        'rgba(244, 63, 94, 0.6)',
                        'rgba(245, 158, 11, 0.6)',
                        'rgba(139, 92, 246, 0.85)'
                    ],
                    borderColor: [
                        '#F43F5E',
                        '#F59E0B',
                        '#8B5CF6'
                    ],
                    borderWidth: 1.5,
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { color: '#1F2937' },
                        ticks: { color: '#9CA3AF' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#F3F4F6', font: { weight: '600' } }
                    }
                },
                plugins: mandatoryTooltipConfig.plugins
            }
        });

        // 3. Doughnut Chart: LLM Context Token Overhead Savings
        const tokenCtx = document.getElementById('tokenChartCanvas').getContext('2d');
        const tokenRawLabels = [
            "Optimized Markdown Payload",
            "Discarded HTML DOM Bloat"
        ];

        new Chart(tokenCtx, {
            type: 'doughnut',
            data: {
                labels: tokenRawLabels.map(l => formatLabel(l, 16)),
                datasets: [{
                    data: [33, 67],
                    backgroundColor: [
                        '#06B6D4',
                        'rgba(31, 41, 55, 0.8)'
                    ],
                    borderColor: ['#06B6D4', '#374151'],
                    borderWidth: 2
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: mandatoryTooltipConfig.plugins
            }
        });

        // 4. Horizontal Stacked Bar Chart: SEO vs GEO Ranking Weights
        const geoVsSeoCtx = document.getElementById('geoVsSeoChartCanvas').getContext('2d');
        const geoRawLabels = [
            "Keyword Density & Exact Metas",
            "Schema Structural Completeness",
            "Empirical Triples & Fact Density",
            "Semantic Vector Centroid Match"
        ];

        new Chart(geoVsSeoCtx, {
            type: 'bar',
            data: {
                labels: geoRawLabels.map(l => formatLabel(l, 16)),
                datasets: [
                    {
                        label: 'Traditional SERP Weight',
                        data: [75, 30, 20, 25],
                        backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        borderRadius: 4
                    },
                    {
                        label: 'Generative Answer Engine Weight',
                        data: [15, 95, 90, 88],
                        backgroundColor: 'rgba(16, 185, 129, 0.85)',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: false,
                        grid: { color: '#1F2937' },
                        ticks: { color: '#9CA3AF' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#F3F4F6' }
                    }
                },
                plugins: mandatoryTooltipConfig.plugins
            }
        });

        // 5. Polar Area Chart: Edge Latency Budget Allocation
        const edgeLatencyCtx = document.getElementById('edgeLatencyChartCanvas').getContext('2d');
        const edgeRawLabels = [
            "DOM Token Stream Parsing",
            "Schema JSON Injection",
            "Header Patching",
            "Security Policy Check"
        ];

        new Chart(edgeLatencyCtx, {
            type: 'polarArea',
            data: {
                labels: edgeRawLabels.map(l => formatLabel(l, 16)),
                datasets: [{
                    data: [8, 12, 4, 5],
                    backgroundColor: [
                        'rgba(6, 182, 212, 0.7)',
                        'rgba(139, 92, 246, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(245, 158, 11, 0.7)'
                    ],
                    borderColor: '#111827',
                    borderWidth: 2
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    r: {
                        grid: { color: '#1F2937' },
                        ticks: { display: false }
                    }
                },
                plugins: mandatoryTooltipConfig.plugins
            }
        });

        // Interactive HTTP 402 Pay-Per-Crawl Calculator Logic
        const volumeInput = document.getElementById('scrapeVolume');
        const priceInput = document.getElementById('crawlPrice');
        const acceptanceInput = document.getElementById('botAcceptance');

        const volumeValueDisplay = document.getElementById('volumeValue');
        const priceValueDisplay = document.getElementById('priceValue');
        const acceptanceValueDisplay = document.getElementById('acceptanceValue');

        const calculatedRevenueDisplay = document.getElementById('calculatedRevenue');
        const annualRevenueDisplay = document.getElementById('annualRevenue');

        function updateCalculator() {
            const volume = parseInt(volumeInput.value);
            const price = parseFloat(priceInput.value);
            const acceptance = parseInt(acceptanceInput.value) / 100;

            volumeValueDisplay.textContent = volume.toLocaleString() + ' URLs';
            priceValueDisplay.textContent = '$' + price.toFixed(3);
            acceptanceValueDisplay.textContent = Math.round(acceptance * 100) + '%';

            const monthlyIncome = volume * price * acceptance;
            const annualIncome = monthlyIncome * 12;

            calculatedRevenueDisplay.textContent = '$' + monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            annualRevenueDisplay.textContent = '$' + annualIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        volumeInput.addEventListener('input', updateCalculator);
        priceInput.addEventListener('input', updateCalculator);
        acceptanceInput.addEventListener('input', updateCalculator);

        // Initial Calculation
        updateCalculator();
