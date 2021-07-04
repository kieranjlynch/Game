const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice__btns'));
const scoreText = document.getElementById('score');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
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
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
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
    })
    .catch((err) => {
        console.error(err);
    });

const correctAnswer = 1;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuesions = [...questions];
	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuesions.length === 0) {
			localStorage.setItem('mostRecentScore', score);
	}
}

const questionIndex = Math.floor(Math.random() * availableQuesions.length);
currentQuestion = availableQuesions[questionIndex];
question.innerText = currentQuestion.question;

choices.forEach((choice) => {
	const number = choice.dataset['number'];
	choice.innerText = currentQuestion['choice' + number];
});
availableQuesions.splice(questionIndex, 1);
acceptingAnswers = true;


choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
			if (!acceptingAnswers) return;

			acceptingAnswers = false;
			const selectedChoice = e.target;
			const selectedAnswer = selectedChoice.dataset['number'];

			const classToApply =
			selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';


			if (classToApply === 'correct') {
				incrementTally(correctAnswer);
			}

			selectedChoice.classList.add(classToApply);

			setTimeout(() => {
				selectedChoice.classList.remove(classToApply);
				getNewQuestion();
		}, 1000);
});
});

incrementTally = (num) => {
	score += num;
	scoreText.innerText = score;
};