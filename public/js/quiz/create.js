const quizForm = document.getElementById('quizForm');
const questionsContainer = document.getElementById('questionsContainer');
let questionCount = 0;

function addQuestion() {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
        <h4>Question ${questionCount + 1}</h4>
        <label for="questionText_${questionCount}">Question Text:</label>
        <input type="text" id="questionText_${questionCount}" name="questionText_${questionCount}" required>

        <label for="questionPoints_${questionCount}">Number of Points:</label>
        <input type="number" step="0.01" id="questionPoints_${questionCount}" name="questionPoints_${questionCount}" value="0.0" required>

        <label for="questionAnswer_${questionCount}">Answer:</label>
        <input type="text" id="questionAnswer_${questionCount}" name="questionAnswer_${questionCount}" required>

          <label for="questionOption1${questionCount}">Option 1:</label>
        <input type="text" id="questionOption1${questionCount}" name="questionOption1${questionCount}" required>

          <label for="questionOption2${questionCount}">Option 2:</label>
        <input type="text" id="questionOption2${questionCount}" name="questionOption2${questionCount}" required>

           <label for="questionOption3${questionCount}">Option 3:</label>
        <input type="text" id="questionOption3${questionCount}" name="questionOption3${questionCount}" required>
        <label for="questionImage_${questionCount}">Image:</label>
        <input type="file" id="questionImage_${questionCount}" name="questionImages" accept="image/*">
        <hr>
    `;
    questionsContainer.appendChild(questionDiv);
    questionCount++;
}

quizForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultMessage = document.getElementById('resultMessage');
    const submitButton = quizForm.querySelector('button[type="submit"]');

    loadingIndicator.style.display = 'block';
    resultMessage.textContent = '';
    submitButton.disabled = true;


    // //get token from localhost
    // const token = localStorage.getItem('token') || null

    // console.log(token)
    // // if there is no token 
    // if (!token) {
    //     resultMessage.textContent = 'there is no token';
    //     loading.style.display = 'none';
    //     return;
    // }



    const formData = new FormData(quizForm);
    const questions = [];

    // format
    for (let i = 0; i < questionCount; i++) {
        questions.push({
            text: formData.get(`questionText_${i}`),
            numberOfPoints: formData.get(`questionPoints_${i}`),
            answers: [
                {
                    text: formData.get(`questionAnswer_${i}`),
                    isCorrect: true
                },
                {
                    text: formData.get(`questionOption1${i}`),
                    isCorrect: false
                },
                {
                    text: formData.get(`questionOption2${i}`),
                    isCorrect: false
                },
                {
                    text: formData.get(`questionOption3${i}`),
                    isCorrect: false
                }
            ]

        });
    }


    formData.set('questions', JSON.stringify(questions));

    try {
        const response = await fetch('/quiz/create', {
            method: 'POST',
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // },
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            resultMessage.textContent = data.message;
            quizForm.reset();
            questionsContainer.innerHTML = '';
            questionCount = 0;
            window.location.replace('/teachers')
        } else {
            throw new Error(data.message || 'Error creating quiz');
        }
    } catch (error) {
        resultMessage.textContent = `Error: ${error.message}`;
    } finally {
        loadingIndicator.style.display = 'none';
        submitButton.disabled = false;
    }
});