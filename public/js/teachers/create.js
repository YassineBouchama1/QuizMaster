
document.getElementById('createTeacherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultMessage = document.getElementById('resultMessage');
    
    // show loading indicator
    loadingIndicator.style.display = 'block';
    resultMessage.textContent = '';
    
    // collect form data
    const formData = new FormData(form);
    
    // send AJAX request
    fetch('/teachers', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        loadingIndicator.style.display = 'none';
        if (data.success) {
            resultMessage.textContent = data.message;
            form.reset(); // Clear the form
        } else {
            resultMessage.textContent = 'Error: ' + data.message;
        }
    })
    .catch(error => {
        loadingIndicator.style.display = 'none';
        resultMessage.textContent = 'An error occurred. Please try again.';
        console.error('Error:', error);
    });
});
