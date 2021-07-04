"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choice__btns'));
var scoreText = document.getElementById('score');
var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuesions = [];
var questions = [];
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple').then(function (res) {
  return res.json();
}).then(function (loadedQuestions) {
  questions = loadedQuestions.results.map(function (loadedQuestion) {
    var formattedQuestion = {
      question: loadedQuestion.question
    };

    var answerChoices = _toConsumableArray(loadedQuestion.incorrect_answers);

    formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
    answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
    answerChoices.forEach(function (choice, index) {
      formattedQuestion['choice' + (index + 1)] = choice;
    });
    return formattedQuestion;
  });
  startGame();
})["catch"](function (err) {
  console.error(err);
});
var correctAnswer = 1;

startGame = function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuesions = _toConsumableArray(questions);
  getNewQuestion();
};

getNewQuestion = function getNewQuestion() {
  if (availableQuesions.length === 0) {
    localStorage.setItem('mostRecentScore', score);
  }
};

var questionIndex = Math.floor(Math.random() * availableQuesions.length);
currentQuestion = availableQuesions[questionIndex];
question.innerText = currentQuestion.question;
choices.forEach(function (choice) {
  var number = choice.dataset['number'];
  choice.innerText = currentQuestion['choice' + number];
});
availableQuesions.splice(questionIndex, 1);
acceptingAnswers = true;
choices.forEach(function (choice) {
  choice.addEventListener('click', function (e) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset['number'];
    var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementTally(correctAnswer);
    }

    selectedChoice.classList.add(classToApply);
    setTimeout(function () {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementTally = function incrementTally(num) {
  score += num;
  scoreText.innerText = score;
};