// public/js/quiz.js
let currentQuestionIndex = 0;
let quizData;

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
                <div class="option option-${i}" onclick="selectAnswer(${index}, ${answer.id})">
                    ${['A', 'B', 'C', 'D'][i]} &nbsp;&nbsp;&nbsp;&nbsp; ${answer.text}
                </div>
            `).join('')}
        </div>
    `;
    quizContainer.innerHTML = questionHtml;
}

function selectAnswer(questionIndex, answerId) {
    console.log(`Question ${questionIndex + 1}, Answer ID ${answerId} selected`);

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        quizContainer.innerHTML = '<h2>Quiz Completed!</h2>';
    }
}

// Start the quiz when the page loads
window.onload = function () {
    if (loadQuizData()) {
        displayQuestion(currentQuestionIndex);
    } else {
        console.error('Failed to load quiz data');
    }
};