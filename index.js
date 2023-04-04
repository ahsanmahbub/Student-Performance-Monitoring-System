//jshint esversion: 6

//Global Variables for revenue-form
var rf_x1, rf_x2, rf_x3, rf_t1;
var rf_sem1, rf_sem2, rf_sem3, rf_year1, rf_year2, rf_year3;

//Global Variables for details Form
var df_x1, df_x2, df_x3, df_n1, df_d1, df_d2, df_d3;
var df_sem1, df_sem2, df_sem3, df_year1, df_year2, df_year3;

//Counter Variables
var i = 0;
var j = 0;

// Display Form Input Data on Button Click for Selection List
function findVal(name, id) {
  var element = document.getElementById(name + id);
  if (element) {
    return element.value;
  }
  return ' ';
}

//Get Class Size
function classSize(name, id, label) {
  var element = document.getElementById(name + id);
  var content = document.getElementById(name + label);
  if (element) {
    if (element.checked) {
      if (content) {
        return "(" + document.getElementById(name + label).textContent + ")";
      } else {
        return ' ';
      }
    } else {
      return ' ';
    }
  }
  return null;
}

function assignValueRF() {
  //Get values for chart x-axis label for revenue-form
  if (document.getElementById("rf-school")) {
    if (j == 0) {
      rf_x1 = semester + ' ' + year;
      rf_t1 = school;
      rf_year1 = year;
      rf_sem1 = semester;
      document.getElementById("rf-school").setAttribute("disabled", "");
      j++;
    } else if (j == 1) {
      rf_x2 = semester + ' ' + year;
      rf_year2 = year;
      rf_sem2 = semester;
      j++;
    } else if (j == 2) {
      rf_x3 = semester + ' ' + year;
      rf_year3 = year;
      rf_sem3 = semester;
      j = 0;
    }
  }
}

function assignValueDF() {
  //Get values for chart x-axis label for revenue-form
  if (document.getElementById("df-semester")) {
    if (j == 0) {
      df_x1 = semester + ' ' + year;
      df_year1 = year;
      df_sem1 = semester;
      df_n1 = studentno;
      df_d1 = detail;
      document.getElementById("df-student").setAttribute("disabled", "");
      j++;
    } else if (j == 1) {
      df_x2 = semester + ' ' + year;
      df_year2 = year;
      df_sem2 = semester;
      df_d2 = detail;
      j++;
    } else if (j == 2) {
      df_x3 = semester + ' ' + year;
      df_year3 = year;
      df_sem3 = semester;
      df_d3 = detail;
      j = 0;
    }
  }
}

//Fill up selection list and get data for chart
function selectionList(name) {
  school = findVal(name, "-school");
  semester = findVal(name, "-semester");
  year = findVal(name, "-year");
  studentno = findVal(name, "-student");

  detail = document.getElementById(name + "-detail");
  if (detail) {
    detail = detail.checked;
  }

  c1 = classSize(name, "-c1", "-l1");
  c2 = classSize(name, "-c2", "-l2");
  c3 = classSize(name, "-c3", "-l3");
  c4 = classSize(name, "-c4", "-l4");
  c5 = classSize(name, "-c5", "-l5");
  c6 = classSize(name, "-c6", "-l6");
  c7 = classSize(name, "-c7", "-l7");
  c8 = classSize(name, "-c8", "-l8");
  c9 = classSize(name, "-c9", "-l9");

  if (detail == true) {
    detail = '(Detailed)'
  } else if (detail == false) {
    detail = ' ';
  }

  //Output Result based on conditions
  if (studentno != ' ') {
    result = semester + ' ' + year + ' Students < ' + studentno + ' ' + detail;
    console.log('Condition 1 executed.');
  } else if (c1 != null) {
    result = semester + ' ' + year + ' ' + c1 + ' ' + c2 + ' ' + c3 + ' ' + c4 + ' ' +
      c5 + ' ' + c6 + ' ' + c7 + ' ' + c8 + ' ' + c9;
    console.log('Condition 2 executed.');
  } else {
    result = school + ' ' + semester + ' ' + year;
    console.log('Condition 3 executed.');
  }

  //Assign values to global variables
  assignValueRF();
  assignValueDF();

  //Get text for slection list items
  if (i == 0) {
    document.getElementById(name + "_li1").textContent = result;
  } else if (i == 1) {
    document.getElementById(name + "_li2").textContent = result;
  } else {
    document.getElementById(name + "_li3").textContent = result;
  }
  if (i <= 2) {
    i++;
  }
}

//Reinitialize variables and clear selection list
function clearList(name) {
  document.getElementById(name + "_li1").textContent = "";
  document.getElementById(name + "_li2").textContent = "";
  document.getElementById(name + "_li3").textContent = "";
  i = 0;
  j = 0;
  if (document.getElementById("rf-school")) {
    document.getElementById("rf-school").removeAttribute("disabled");
    revenueChart.destroy();
  }
  if (document.getElementById("df-student")) {
    document.getElementById("df-student").removeAttribute("disabled");
    detailsChart.destroy();
  }
  rf_x1 = "";
  rf_x2 = "";
  rf_x3 = "";
  df_x1 = "";
  df_x2 = "";
  df_x3 = "";
  df_xValues = [];
  df_yValues1 = [];
  df_yValues2 = [];
  df_yValues3 = [];
  df_yValues4 = [];
  df_yValues5 = [];
  df_yValues6 = [];
  var chartTitle = document.getElementById("Chart-Title");
  chartTitle.innerHTML = ""
}
