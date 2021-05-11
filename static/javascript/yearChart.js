// Global parameters:
// do not resize the chart canvas when its container does (keep at 600x400px)
// Chart.defaults.global.responsive = false;


// get chart canvas
var ctx = document.getElementById("myChart").getContext("2d");
 
// define the chart data
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019 '],
      datasets: [{
      label: '기상악화일 때, 연도별 사고 발생 수',
      data: [15, 82, 68, 79, 76, 38, 41, 66, 228, 114, 117, 168],
      // backgroundColor: [
      //     'rgba(255, 99, 132, 0.2)',
      //     'rgba(54, 162, 235, 0.2)',
      //     'rgba(255, 206, 86, 0.2)',
      //     'rgba(75, 192, 192, 0.2)',
      //     'rgba(153, 102, 255, 0.2)',
      //     'rgba(255, 159, 64, 0.2)'
      // ],
      borderColor: [
          'rgba(255, 99, 132, 1)'
          // 'rgba(54, 162, 235, 1)',
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