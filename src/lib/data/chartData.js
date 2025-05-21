export const BarData = {
    type: 'line',
    data: {
        labels: ['Day 1','Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6','Day 7', 'Day 8', 'Day 9', 'Day 10'],
        datasets: [{
            label: "",
            data: "",
            backgroundColor:[
                'rgba(7, 108, 218, 0.8)'
            ]
        },],
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "",
                padding: {
                    top: 10,
                    bottom: 30
                },
                font: {
                    family: "'Orbitron', sans-serif",
                    size: 20
                }
            },
            legend: {
                labels: {
                    font: {
                        family: "'Orbitron', sans-serif",
                        size: 18
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        family: "'Orbitron', sans-serif"
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        family: "'Orbitron', sans-serif"
                    }
                }
            }
        }
    },
}