let currentQuestionIndex = 0;
let quizData;
let score = 0;

// Load quiz data from the <script> tag
function loadQuizData() {
    const scriptTag = document.getElementById('quiz-data');
    if (scriptTag) {
        try {
            quizData = JSON.parse(scriptTag.textContent);
            document.getElementById('quiz-title').textContent = quizData.title;
            document.getElementById('quiz-description').textContent = quizData.description;
            return true;
        } catch (error) {
            console.error('Error parsing quiz data:', error);
        }
    }
    return false;
}

const quizContainer = document.getElementById('quiz-container');

function displayQuestion(index) {
    const question = quizData.questions[index];
    const questionImage = question.image
        ? `<img src="${question.image}" alt="Question Image" class="question-image">`
        : '';

    const questionHtml = `
        <div class="question-header">
            <span class="question-number">${index + 1} of ${quizData.questions.length}</span>
        </div>
        <h2>${question.text}</h2>
        ${questionImage}
        <p>Points: ${question.numberOfPoints}</p>
        <div class="options-grid">
            ${question.answers.map((answer, i) => `
                <div class="option option-${i}" onclick="selectAnswer(${answer.isCorrect}, ${question.numberOfPoints})">
                    ${['A', 'B', 'C', 'D'][i]} &nbsp;&nbsp;&nbsp;&nbsp; ${answer.text}
                </div>
            `).join('')}
        </div>
    `;
    quizContainer.innerHTML = questionHtml;
}

function selectAnswer(isCorrect, numberOfPoints) {
    // Add points if the answer is correct, otherwise add 0
    score += isCorrect ? numberOfPoints : 0;

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        displayFinalScore();
    }
}

function displayFinalScore() {
    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <h2>Your Final Score: ${score}</h2>
    `;
}

// Start the quiz when the page loads
window.onload = function () {
    if (loadQuizData()) {
        displayQuestion(currentQuestionIndex);
    } else {
        console.error('Failed to load quiz data');
    }
};