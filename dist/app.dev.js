"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var question = document.getElementById('question'); // convert to array so i can use array functions

var choices = Array.from(document.getElementsByClassName('choice__btns')); //target the html representing the score

var scoreText = document.getElementById('score'); // empty object to house current question

var currentQuestion = {}; //prevents user from answering before data loads

var acceptingAnswers = false; // the users score

var score = 0; // what question number is the user on out of ten

var questionCounter = 0; // empty array to house available questions to pass to current question

var availableQuesions = []; // empty array to house available questions to pass to current question

var questions = [];
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple').then(function (res) {
  return res.json();
}).then(function (loadedQuestions) {
  questions = loadedQuestions.results.map(function (loadedQuestion) {
    var formattedQuestion = {
      question: loadedQuestion.question
    };

    var answerChoices = _toConsumableArray(loadedQuestion.incorrect_answers); //set equal to largest integer less than or equal to the sum of a random number in the range 0 to less than 1 * 4 + 1


    formattedQuestion.answer = Math.floor(Math.random() * 4) + 1; // splices out the question that was used 

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
var correctAnswer = 1; // set question and score to zero and trigger the get new question function

startGame = function startGame() {
  questionCounter = 0;
  score = 0; // use spread operator to take each of the items in the arr and put them into a new array as a full copy

  availableQuesions = _toConsumableArray(questions);
  getNewQuestion();
}; // 


getNewQuestion = function getNewQuestion() {
  // if the number of questions in the arr is 0 show end page 
  if (availableQuesions.length === 0) {
    localStorage.setItem('mostRecentScore', score); //go to the end page (once built)

    return window.location.assign('/end.html');
  } //increment the question counter


  questionCounter++;
  var questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach(function (choice) {
    var number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  }); // prevents using a question we have already used by splicing it out

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
}; // foreach on the choices arr and add event listeners


choices.forEach(function (choice) {
  choice.addEventListener('click', function (e) {
    // if data has not loaded, ignore click
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset['number'];
    var classToApply = //set the value of selectedanswer = to the answer value ternarary operator for correct or incorrect
    selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'; // if the result is correct call the increment tally function

    if (classToApply === 'correct') {
      incrementTally(correctAnswer);
    } // sets screen to green or red for a second when a buton is clicked passing value of classToApply as a param 


    selectedChoice.parentElement.classList.add(classToApply); // removes the class after a second

    setTimeout(function () {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
}); //increments the tally for each correctly answered question

incrementTally = function incrementTally(num) {
  score += num;
  scoreText.innerText = score;
};

function reloadThePage() {
  window.location.reload();
}