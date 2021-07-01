"use strict";

// function to get the json q and a's
fetch("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple").then(function (res) {
  return res.json();
}).then(function (data) {
  console.log(data);
  document.querySelector(".quizQuestion").innerHTML = data.results[0].question;
  document.querySelector("#correct").innerHTML = data.results[0].correct_answer;
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

  var shuffle = function shuffle(incorrectAnswersObj) {
    var oldElement;

    for (var i = incorrectAnswersObj.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      oldElement = incorrectAnswersObj[i];
      incorrectAnswersObj[i] = incorrectAnswersObj[rand];
      incorrectAnswersObj[rand] = oldElement;
    }

    return incorrectAnswersObj;
  };

  var result = shuffle(incorrectAnswersObj);
  console.log(result);
});