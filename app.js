// frontend/app.js
document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const mobileNo = document.getElementById('mobileNo').value;
    const email = document.getElementById('email').value;
    const billNumber = document.getElementById('billNumber').value;

    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch('https://kids-registration.onrender.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, mobileNo, email, billNumber })
        });

        if (response.ok) {
            responseMessage.textContent = 'Registration successful!';
            responseMessage.style.color = 'green';
            document.getElementById('registrationForm').reset(); 
        } else {
            const error = await response.json();
            responseMessage.textContent = `Error: ${error.message}`;
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        responseMessage.textContent = `Error: ${error.message}`;
        responseMessage.style.color = 'red';
    }
});
