const form = document.querySelector('form');
const course1Input = document.getElementById('course1');
const course2Input = document.getElementById('course2');
const course3Input = document.getElementById('course3');
const course4Input = document.getElementById('course4');
const course5Input = document.getElementById('course5');
const resultDiv = document.getElementById('result');
const percentageDiv = document.getElementById('percentage');

form.addEventListener('submit', e => {
  e.preventDefault();

  const course1Grade = parseFloat(course1Input.value);
  const course2Grade = parseFloat(course2Input.value);
  const course3Grade = parseFloat(course3Input.value);
  const course4Grade = parseFloat(course4Input.value);
  const course5Grade = parseFloat(course5Input.value);

  if (isNaN(course1Grade) || isNaN(course2Grade) || isNaN(course3Grade) || isNaN(course4Grade) || isNaN(course5Grade)) {
    resultDiv.innerHTML = '<div id="error">Please enter valid grades.</div>';
    return;
  }

  const totalGrade = course1Grade + course2Grade + course3Grade + course4Grade + course5Grade;
  const percentage = (totalGrade / 500) * 100;
  const letterGrade = getLetterGrade(percentage);

  resultDiv.innerHTML = `
    <h2>Result</h2>
    <p>Total grade: ${totalGrade.toFixed(2)}</p>
    <p>Letter grade: ${letterGrade}</p>
  `;

  percentageDiv.innerText = `Percentage: ${percentage.toFixed(2)}%`;
});

function getLetterGrade(percentage) {
  if (percentage >= 80) {
    return 'A';
  } else if (percentage >= 75) {
    return 'A-';
  } else if (percentage >= 70) {
    return 'B+';
  } else if (percentage >= 65) {
    return 'B';
  } else if (percentage >= 60) {
    return 'B-';
  } else if (percentage >= 55) {
    return 'C+';
  } else if (percentage >= 50) {
    return 'C';
  } else if (percentage >= 45) {
    return 'C-';
  } else if (percentage >= 40) {
    return 'D';
  } else {
    return 'F';
  }
}
