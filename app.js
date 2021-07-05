const question = document.getElementById('question');

// convert to array so i can use array functions
const choices = Array.from(document.getElementsByClassName('choice__btns'));

//target the html representing the score
const scoreText = document.getElementById('score');

// empty object to house current question
let currentQuestion = {};

//prevents user from answering before data loads
let acceptingAnswers = false;

// the users score
let score = 0;

// what question number is the user on out of ten
let questionCounter = 0;

// empty array to house available questions to pass to current question
let availableQuesions = [];

// empty array to house available questions to pass to current question
let questions = [];

fetch(
		'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
	)
	.then((res) => {
		return res.json();
	})
	.then((loadedQuestions) => {
		questions = loadedQuestions.results.map((loadedQuestion) => {
			const formattedQuestion = {
				question: loadedQuestion.question,
			};

			const answerChoices = [...loadedQuestion.incorrect_answers];
			//set equal to largest integer less than or equal to the sum of a random number in the range 0 to less than 1 * 4 + 1
			formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;

// splices out the question that was used 
			answerChoices.splice(
				formattedQuestion.answer - 1,
				0,
				loadedQuestion.correct_answer
			);

			answerChoices.forEach((choice, index) => {
				formattedQuestion['choice' + (index + 1)] = choice;
			});
			return formattedQuestion;
		});
		startGame();
		countDown();
	})
	.catch((error) => {

	});

const correctAnswer = 1;


// set question and score to zero and trigger the get new question function
startGame = () => {
	questionCounter = 0;
	score = 0;
	// use spread operator to take each of the items in the arr and put them into a new array as a full copy
	availableQuesions = [...questions];
	getNewQuestion();
};

// 
getNewQuestion = () => {
	// if the number of questions in the arr is 0 show end page 
	if (availableQuesions.length === 0) {
		localStorage.setItem('mostRecentScore', score);
		//go to the end page (once built)
		return window.location.assign('/end.html');
	}
	//increment the question counter
	questionCounter++;

	const questionIndex = Math.floor(Math.random() * availableQuesions.length);
	currentQuestion = availableQuesions[questionIndex];
	question.innerText = currentQuestion.question;


	choices.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	});
// prevents using a question we have already used by splicing it out
	availableQuesions.splice(questionIndex, 1);
	acceptingAnswers = true;
};
	// foreach on the choices arr and add event listeners
choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		// if data has not loaded, ignore click
		if (!acceptingAnswers) return;

		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		const classToApply =
		//set the value of selectedanswer = to the answer value ternarary operator for correct or incorrect
			selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

			// if the result is correct call the increment tally function
		if (classToApply === 'correct') {
			incrementTally(correctAnswer);
		}
// sets screen to green or red for a second when a buton is clicked passing value of classToApply as a param 
		selectedChoice.parentElement.classList.add(classToApply);
// removes the class after a second
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});

//increments the tally for each correctly answered question
incrementTally = (num) => {
	score += num;
	scoreText.innerText = score;
};

function reloadThePage(){
	window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  const timeLeftDisplay = document.querySelector('#time-left');
  let timeLeft = 30;

  countDown = () => {
    setInterval(function() {
      if (timeLeft <= 0) {
        return window.location.assign("end.html");
      } else {
        timeLeftDisplay.innerHTML = timeLeft;
      timeLeft -= 1;
      }
    }, 1000);
  };
});
