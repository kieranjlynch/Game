"use strict";

fetch("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple").then(function (res) {
  return res.json();
}).then(function (data) {
  document.querySelector(".quizQuestion").innerHTML = data.results[0].question; // document.querySelector("#correct").innerHTML = data.results[0].correct_answer;

  var incorrectAnswers = data.results[0].incorrect_answers;
  var answersObj = incorrectAnswers.map(function (incorrect_answers) {
    var incorrectObj = {
      value: incorrect_answers
    };
    return incorrectObj;
  });
  answersObj.push({
    value: data.results[0].correct_answer
  });

  var shuffle = function shuffle(answersObj) {
    var oldElement;

    for (var i = answersObj.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      oldElement = incorrectAnswersObj[i];
      answersObj[i] = answersObj[rand];
      answersObj[rand] = oldElement;
    }

    return answersObj;
  };

  document.querySelector(".answer0").innerHTML = answersObj[0].value;
  document.querySelector(".answer1").innerHTML = answersObj[1].value;
  document.querySelector(".answer2").innerHTML = answersObj[2].value;
  document.querySelector(".answer3").innerHTML = answersObj[3].value;
});