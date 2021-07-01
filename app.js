


fetch ("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple")
.then(res => {
  return res.json()
}) .then(data => {
  document.querySelector(".quizQuestion").innerHTML = data.results[0].question;
  // document.querySelector("#correct").innerHTML = data.results[0].correct_answer;
const incorrectAnswers = data.results[0].incorrect_answers;
const answersObj = incorrectAnswers.map(incorrect_answers => {
  const incorrectObj = { value: incorrect_answers };
  return incorrectObj;
});
answersObj.push({value: data.results[0].correct_answer})

const shuffle = (answersObj) => {
  let oldElement;
  for (let i = answersObj.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    oldElement = incorrectAnswersObj[i];
    answersObj[i] = answersObj[rand];
    answersObj[rand] = oldElement;
  }
  return answersObj;
} 
document.querySelector(".answer0").innerHTML = answersObj[0].value;
document.querySelector(".answer1").innerHTML = answersObj[1].value;
document.querySelector(".answer2").innerHTML = answersObj[2].value;
document.querySelector(".answer3").innerHTML = answersObj[3].value;
})


