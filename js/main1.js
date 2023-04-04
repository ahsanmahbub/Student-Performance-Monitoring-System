const inputs = document.querySelectorAll(".input");



<script>
     var ctx = document.getElementById('plo').getContext('2d');
     var data = {
            labels: {{plolabel|safe}},
          datasets: [{
              label: 'Department Overall PLO',
              data: {{plodata}},
              backgroundColor: '#ffa600',
          }],
      };

    var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        barValueSpacing: 30,
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max:100,
                }
            }]
        }
    }
});

</script>
<script>
    var ctx = document.getElementById('gpa').getContext('2d');
     var data = {
        labels: {{gpalabel|safe}},
        datasets: [{
        label: "Department Average Gpa",
        backgroundColor: '#d048b6',
        fill: false,
        borderColor: '#d048b6',
        data: {{gpadata}}
        },
        ]
    };

    var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
          scales: {
              xAxes: [{
                  gridLines: {
                      display: false,
                  }
              }],
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      max:4,
                  },
                  type: 'linear',
              }]
          },

          responsive: true,
          maintainAspectRatio: true
      }
    });




</script>