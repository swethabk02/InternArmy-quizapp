const quizData = [
    {
        question: 'What is the capital of France?',
        answers: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris'
    },
    {
        question: 'What is 2 + 2?',
        answers: ['3', '4', '5', '6'],
        correctAnswer: '4'
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answers: ['Harper Lee', 'J.K. Rowling', 'Stephen King', 'Ernest Hemingway'],
        correctAnswer: 'Harper Lee'
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: ['Jupiter', 'Mars', 'Saturn', 'Earth'],
        correctAnswer: 'Jupiter'
    },
    {
        question: 'Which country is known as the Land of the Rising Sun?',
        answers: ['China', 'Japan', 'South Korea', 'Vietnam'],
        correctAnswer: 'Japan'
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci'
    }
];

let currentQuestionIndex = 0;
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    answerButtonsElement.innerHTML = '';
    
    // Remove any existing feedback elements
    const existingFeedback = document.querySelector('.feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn-answer');
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedAnswer = selectedButton.innerText;
    const currentQuestion = quizData[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    if (selectedAnswer === correctAnswer) {
        selectedButton.classList.add('correct');
        showFeedback(true);
    } else {
        selectedButton.classList.add('incorrect');
        showFeedback(false);
    }

    disableAnswerButtons();
    nextButton.disabled = false;
}

function showFeedback(isCorrect) {
    const feedbackElement = document.createElement('div');
    feedbackElement.classList.add('feedback');
    feedbackElement.innerText = isCorrect ? 'Correct!' : 'Incorrect!';
    questionElement.parentElement.appendChild(feedbackElement);
}

function disableAnswerButtons() {
    const buttons = answerButtonsElement.querySelectorAll('.btn-answer');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        // End of quiz
        questionElement.innerText = 'Quiz Completed!';
        answerButtonsElement.innerHTML = '';
        nextButton.style.display = 'none';
    }
}

startQuiz();
