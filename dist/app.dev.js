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
  //sets the empty questions arr = a map of the key value pairs of loaded question
  questions = loadedQuestions.results.map(function (loadedQuestion) {
    var formattedQuestion = {
      question: loadedQuestion.question
    }; // use spread operator to take each of the items in the arr and put them into a new array as a full copy

    var answerChoices = _toConsumableArray(loadedQuestion.incorrect_answers); //set equal to largest integer less than or equal to the sum of a random number in the range 0 to less than 1 * 4 + 1


    formattedQuestion.answer = Math.floor(Math.random() * 4) + 1; // splices out the question that was used 

    answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer); // runs for each on answer choices, to list each arr item, then sets the formatted question arr = choice 

    answerChoices.forEach(function (choice, index) {
      formattedQuestion['choice' + (index + 1)] = choice;
    }); //returns formatted question variable

    console.log(formattedQuestion);
    return formattedQuestion;
  });
  startGame(); // countDown();
}).catch(function (err) {
  alert(err);
});
var correctAnswer = 1; // set question and score to zero and trigger the get new question function

startGame = function startGame() {
  questionCounter = 0;
  score = 0; // use spread operator to take each of the items in the arr and put them into a new array as a full copy

  availableQuesions = _toConsumableArray(questions);
  getNewQuestion();
};

getNewQuestion = function getNewQuestion() {
  // if the number of questions in the arr is 0 show end page 
  if (availableQuesions.length === 0) {
    localStorage.setItem('mostRecentScore', score); //go to the end page 

    return window.location.assign('/end.html');
  } //increment the question counter


  questionCounter++;
  var questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;
  choices.forEach(function (choice) {
    var number = choice.dataset['number'];
    choice.innerHTML = currentQuestion['choice' + number];
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
  //addition assignment operator of current score + num
  score += num; //sets the html to update the new number

  scoreText.innerText = score;
}; //reset function with no cache


function reloadThePage() {
  window.location.reload();
} // loads the countdown timer on window load


document.addEventListener('DOMContentLoaded', function () {
  var timeLeftDisplay = document.querySelector('#time-left');
  var timeLeft = 30;

  countDown = function countDown() {
    setInterval(function () {
      if (timeLeft <= 0) {
        return window.location.assign("end.html");
      } else {
        timeLeftDisplay.innerHTML = timeLeft;
        timeLeft -= 1;
      }
    }, 1000);
  };
});