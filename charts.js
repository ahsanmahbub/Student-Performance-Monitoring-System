//jshint esversion: 6

//Global Variables
var revenueChart = 0;
var detailsChart = 0;
var detailsChart2 = 0;
var detailsChart3 = 0;

//Generate Chart for Revenue
async function generateRC(name) {
  //Taken from IUB website
  const feepercredit = 6000;

  //Calculation for database values for revenue
  var credits1 = await renderUsers(rf_t1, rf_sem1, rf_year1);
  var credits2 = await renderUsers(rf_t1, rf_sem2, rf_year2);
  var credits3 = await renderUsers(rf_t1, rf_sem3, rf_year3);
  var prevCreds1 = await renderUsers(rf_t1, rf_sem1, rf_year1 - 1);
  var prevCreds2 = await renderUsers(rf_t1, rf_sem2, rf_year2 - 1);
  var prevCreds3 = await renderUsers(rf_t1, rf_sem3, rf_year3 - 1);

  //Revenue In Billions
  var rev1 = Math.floor((credits1 * feepercredit) / 1000000000);
  var rev2 = Math.floor((credits2 * feepercredit) / 1000000000);
  var rev3 = Math.floor((credits3 * feepercredit) / 1000000000);
  //Percentage change
  var change1 = ((credits1 - prevCreds1) / credits1) * 100;
  var change2 = ((credits2 - prevCreds2) / credits2) * 100;
  var change3 = ((credits3 - prevCreds3) / credits3) * 100;
  //Checking for zero values in case data does not exist
  if (change1 == 100) {
    change1 = 0;
  } else if (change2 == 100) {
    change2 = 0;
  } else if (change3 == 100) {
    change3 = 0;
  }

  //Logs for debugging
  console.log("Credits 1: " + credits1);
  console.log("Credits 2: " + credits2);
  console.log("Credits 3: " + credits3);
  console.log("Revenue 1: " + rev1);
  console.log("Revenue 2: " + rev2);
  console.log("Revenue 3: " + rev3);
  console.log("Change 1: " + change1);
  console.log("Change 2: " + change2);
  console.log("Change 3: " + change3);

  var rf_xValues = [rf_x1, rf_x2, rf_x3];
  var rf_yValues = [rev1, rev2, rev3];
  var rf_yValues2 = [change1, change2, change3];

  var chartTitle = document.getElementById("Chart-Title");
  chartTitle.innerHTML = "Revenue Generated by " + rf_t1 + " & the % Change"

  revenueChart = new Chart(document.getElementById("revenue-chart"), {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Percentage Change of Revenue',
        data: rf_yValues2,
        borderColor: "#ed7d31",
        fill: false,
        borderWidth: 3,
        backgroundColor: "#ffecd9",
        barThickness: 40,
        order: 2,
        yAxisID: 'percentage'

      }, {
        label: 'Revenue (Taka In Billions)',
        data: rf_yValues,
        borderColor: "#3e95cd",
        type: 'line',
        fill: false,
        order: 1,
        yAxisID: 'y'
      }],
      labels: rf_xValues
    },
    options: {
      title: {
        display: true,
        position: 'bottom',
        text: 'Revenue generated by ' + rf_t1 + " & the % Change"
      },
      scales: {
        y: {
          beginAtZero: true,
          type: 'linear',
          position: 'left'
        },
        percentage: {
          beginAtZero: true,
          type: 'linear',
          position: 'right',
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value, index, values) {
              return `${value}.0 %`;
            }
          }
        }
      }
    }
  });
}

// -----------------------------------------------------------------------------------

// Generate chart for Section Details
async function generateDC(name) {
  //ORDER : SBE SELS SETS SLASS SPPH TOTAL
  //First Input Variables
  var df_yValues1 = [];
  var df_yValues2 = [];
  var df_yValues3 = [];
  var df_yValues4 = [];
  var df_yValues5 = [];
  var df_yValues6 = [];

  //Second Input Variables
  var df2_yValues1 = [];
  var df2_yValues2 = [];
  var df2_yValues3 = [];
  var df2_yValues4 = [];
  var df2_yValues5 = [];
  var df2_yValues6 = [];

  //Third Input variables
  var df3_yValues1 = [];
  var df3_yValues2 = [];
  var df3_yValues3 = [];
  var df3_yValues4 = [];
  var df3_yValues5 = [];
  var df3_yValues6 = [];

  //Loop for first input
  for (var k = 1; k < df_n1; k++) {
    var secDetails = await renderDetails(df_sem1, df_year1, k);
    var total= secDetails[0][0] + secDetails[1][0] + secDetails[2][0] + secDetails[3][0] + secDetails[4][0];
    df_yValues6.push(total);
    df_yValues1.push(secDetails[0][0]);
    df_yValues2.push(secDetails[1][0]);
    df_yValues3.push(secDetails[2][0]);
    df_yValues4.push(secDetails[3][0]);
    df_yValues5.push(secDetails[4][0]);
  }
  //Loop for second input
  for (var k = 1; k < df_n1; k++) {
    var secDetails = await renderDetails(df_sem2, df_year2, k);
    var total= secDetails[0][0] + secDetails[1][0] + secDetails[2][0] + secDetails[3][0] + secDetails[4][0];
    df2_yValues6.push(total);
    df2_yValues1.push(secDetails[0][0]);
    df2_yValues2.push(secDetails[1][0]);
    df2_yValues3.push(secDetails[2][0]);
    df2_yValues4.push(secDetails[3][0]);
    df2_yValues5.push(secDetails[4][0]);
  }
  //Loop for third input
  for (var k = 1; k < df_n1; k++) {
    var secDetails = await renderDetails(df_sem3, df_year3, k);
    var total= secDetails[0][0] + secDetails[1][0] + secDetails[2][0] + secDetails[3][0] + secDetails[4][0];
    df3_yValues6.push(total);
    df3_yValues1.push(secDetails[0][0]);
    df3_yValues2.push(secDetails[1][0]);
    df3_yValues3.push(secDetails[2][0]);
    df3_yValues4.push(secDetails[3][0]);
    df3_yValues5.push(secDetails[4][0]);
  }

  var df_xValues = [];
  for (var m = 1; m < df_n1; m++) {
    df_xValues.push(m);
  }

  var chartTitle = document.getElementById("DF-Chart-Title");
  chartTitle.innerHTML = "Comparitive Analysis of Number of Sections for " + df_x1;

  var chartTitle = document.getElementById("DF-Chart-Title2");
  chartTitle.innerHTML = "Comparitive Analysis of Number of Sections for " + df_x2;

  var chartTitle = document.getElementById("DF-Chart-Title3");
  chartTitle.innerHTML = "Comparitive Analysis of Number of Sections for " + df_x3;

  //CHART 1
  detailsChart = new Chart(document.getElementById("details-chart"), {
    type: 'bar',
    data: {
      datasets: [{
        label: 'SETS',
        data: df_yValues1,
        borderColor: 'rgb(255, 99, 132)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        barThickness: 15
      }, {
        label: 'SBE',
        data: df_yValues2,
        borderColor: 'rgb(255, 159, 64)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        barThickness: 15
      }, {
        label: 'SELS',
        data: df_yValues3,
        borderColor: 'rgb(255, 205, 86)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        barThickness: 15
      }, {
        label: 'SLASS',
        data: df_yValues4,
        borderColor: 'rgb(75, 192, 192)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        barThickness: 15
      }, {
        label: 'SPPH',
        data: df_yValues5,
        borderColor: 'rgb(153, 102, 255)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        barThickness: 15
      }, {
        label: 'Total',
        data: df_yValues6,
        borderColor: 'rgb(54, 162, 235)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        barThickness: 15
      }],
      labels: df_xValues
    },
    options: {
      title: {
        display: true,
        position: 'bottom',
        text: 'Number of Sections for Each Enrolled Sizes for each Schools'
      }
    }
  });

  //CHART 2
  detailsChart2 = new Chart(document.getElementById("details-chart2"), {
    type: 'bar',
    data: {
      datasets: [{
        label: 'SETS',
        data: df2_yValues1,
        borderColor: 'rgb(255, 99, 132)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        barThickness: 15
      }, {
        label: 'SBE',
        data: df2_yValues2,
        borderColor: 'rgb(255, 159, 64)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        barThickness: 15
      }, {
        label: 'SELS',
        data: df2_yValues3,
        borderColor: 'rgb(255, 205, 86)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        barThickness: 15
      }, {
        label: 'SLASS',
        data: df2_yValues4,
        borderColor: 'rgb(75, 192, 192)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        barThickness: 15
      }, {
        label: 'SPPH',
        data: df2_yValues5,
        borderColor: 'rgb(153, 102, 255)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        barThickness: 15
      }, {
        label: 'Total',
        data: df2_yValues6,
        borderColor: 'rgb(54, 162, 235)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        barThickness: 15
      }],
      labels: df_xValues
    },
    options: {
      title: {
        display: true,
        position: 'bottom',
        text: 'Number of Sections for Each Enrolled Sizes for each Schools'
      }
    }
  });

  //CHART 3
  detailsChart3 = new Chart(document.getElementById("details-chart3"), {
    type: 'bar',
    data: {
      datasets: [{
        label: 'SETS',
        data: df3_yValues1,
        borderColor: 'rgb(255, 99, 132)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        barThickness: 15
      }, {
        label: 'SBE',
        data: df3_yValues2,
        borderColor: 'rgb(255, 159, 64)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        barThickness: 15
      }, {
        label: 'SELS',
        data: df3_yValues3,
        borderColor: 'rgb(255, 205, 86)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        barThickness: 15
      }, {
        label: 'SLASS',
        data: df3_yValues4,
        borderColor: 'rgb(75, 192, 192)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        barThickness: 15
      }, {
        label: 'SPPH',
        data: df3_yValues5,
        borderColor: 'rgb(153, 102, 255)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        barThickness: 15
      }, {
        label: 'Total',
        data: df3_yValues6,
        borderColor: 'rgb(54, 162, 235)',
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        barThickness: 15
      }],
      labels: df_xValues
    },
    options: {
      title: {
        display: true,
        position: 'bottom',
        text: 'Number of Sections for Each Enrolled Sizes for each Schools'
      }
    }
  });
}