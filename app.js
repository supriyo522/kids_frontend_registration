document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get input values from the form
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
            // Reset the form after successful submission
            document.getElementById('registrationForm').reset();
        } else {
            const errorData = await response.json();
            
            // Detecting if the error is due to a duplicate entry
            if (response.status === 400 && errorData.message.includes('Duplicate entry detected')) {
                responseMessage.textContent = 'Error: Duplicate entry detected for mobile number, email, or bill number.';
                responseMessage.style.color = 'red';
            } else if (response.status === 400) {
                responseMessage.textContent = `Error: ${errorData.message}`;
                responseMessage.style.color = 'red';
            } else {
                responseMessage.textContent = 'Error: Something went wrong during registration.';
                responseMessage.style.color = 'red';
            }
        }
    } catch (error) {
        responseMessage.textContent = `Error: ${error.message}`;
        responseMessage.style.color = 'red';
    }
});
