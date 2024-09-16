document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultMessage = document.getElementById('resultMessage');
    const title = document.getElementById('title');

    quizForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const quizId = document.getElementById('quizId').value;
        const formData = new FormData(quizForm);

        // Manually handle checkboxes (they are only included in the form data if checked)
        formData.set('viewAnswers', document.getElementById('viewAnswers').checked ? '1' : '0');
        formData.set('seeResult', document.getElementById('seeResult').checked ? '1' : '0');




        // Show loading
        loadingIndicator.style.display = 'block';
        resultMessage.textContent = '';

        try {

            let data = {};

            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log(data)
            const response = await fetch(`/quiz/${quizId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (responseData.success) {
                resultMessage.textContent = responseData.message;
                // Redirect to another page if needed
                window.location.replace('/teacher');
            } else {
                throw new Error(responseData.message || 'Error updating quiz');
            }
        } catch (error) {
            resultMessage.textContent = `Error: ${error.message}`;
        } finally {
            loadingIndicator.style.display = 'none';
        }
    });
});
