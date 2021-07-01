
// function to get the json q and a's
fetch ("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple")
.then(res => {
  return res.json()
}) .then(data => {
  console.log(data)
  document.querySelector(".quizQuestion").innerHTML = data.results[0].question;
  document.querySelector("#correct").innerHTML = data.results[0].correct_answer;
const incorrectAnswers = data.results[0].incorrect_answers;
const incorrectAnswersObj = incorrectAnswers.map(incorrect_answers => {
  const incorrectObj = { value: incorrect_answers };
  return incorrectObj;
});
incorrectAnswersObj.push({value: data.results[0].correct_answer})



const shuffle = (incorrectAnswersObj) => {
  let oldElement;
  for (let i = incorrectAnswersObj.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    oldElement = incorrectAnswersObj[i];
    incorrectAnswersObj[i] = incorrectAnswersObj[rand];
    incorrectAnswersObj[rand] = oldElement;
  }
  return incorrectAnswersObj;
} 
const result = shuffle(incorrectAnswersObj)
console.log(result);

})