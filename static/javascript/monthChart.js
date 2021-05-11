var ctx = document.getElementById("myChart2").getContext("2d");

const labels = Utils.months({count: 7});

var myChart = new Chart(ctx, {
type: 'line',
data: {
    labels: labels,
    datasets: [{
    label: '기상악화일 때, 월별 사고 발생 수',
    data: [66, 56, 89, 107, 77, 61, 107, 129, 124, 141, 82, 53],
    // backgroundColor: [
    //     'rgba(255, 99, 132, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(255, 206, 86, 0.2)',
    //     'rgba(75, 192, 192, 0.2)',
    //     'rgba(153, 102, 255, 0.2)',
    //     'rgba(255, 159, 64, 0.2)'
    // ],
    borderColor: [
        // 'rgba(255, 99, 132, 1)'
        'rgba(54, 162, 235, 1)'
        // 'rgba(255, 206, 86, 1)',
        // 'rgba(75, 192, 192, 1)',
        // 'rgba(153, 102, 255, 1)',
        // 'rgba(255, 159, 64, 1)'
    ]
    }]
},
options: {
    scales: {
        y: {
            beginAtZero: true
        }
    }
    // responsive: true,
    // maintainAspectRatio: false
    }
});