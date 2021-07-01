"use strict";

// function to get the json q and a's
fetch("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple").then(function (res) {
  return res.json();
}).then(function (data) {
  console.log(data);
  document.querySelector(".quizQuestion").innerHTML = data.results[0].question;
  document.querySelector("#correct").innerHTML = data.results[0].correct_answer; // document.querySelector("#incorrect").innerHTML = data.results[0].incorrect_answers;
  // const correctAnswer = data.results[0].correct_answer;
  // const filteredAnswer = correctAnswer.map(correct_answer => "<button>" + correct_answer + "</button>")
  // const htmlCorrectAnswer = filteredAnswer.join("")
  // console.log(htmlCorrectAnswer)
  // const returnedAnswers = data.results[0].incorrect_answers;
  // const filteredAnswers = returnedAnswers.map(incorrect_answers => "<button>" + incorrect_answers + "</button>")
  // const htmlIncorrectAnswer = filteredAnswers.join("")
  // console.log(htmlIncorrectAnswer)

  var incorrectAnswers = data.results[0].incorrect_answers;
  var incorrectAnswersObj = incorrectAnswers.map(function (incorrect_answers) {
    var incorrectObj = {
      value: incorrect_answers
    };
    return incorrectObj;
  });
  incorrectAnswersObj.push({
    value: data.results[0].correct_answer
  });
})["catch"](function (err) {
  console.log(err);
});