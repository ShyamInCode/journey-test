import Postmonger from 'postmonger';

const connection = new Postmonger.Session();
let payload = {};

connection.on('initActivity', function(data) {
    payload = data;
    console.log('Activity initialized with data:', data);
});

document.getElementById('sendData').addEventListener('click', async () => {
    const apiEndpoint = document.getElementById('apiEndpoint').value;

    if (!apiEndpoint) {
        alert('Please enter a valid API endpoint.');
        return;
    }

    const customerData = {
        id: payload.inArguments[0].id,
        name: payload.inArguments[0].name,
        email: payload.inArguments[0].email,
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });
        const result = await response.json();
        console.log('Data sent successfully:', result);
    } catch (error) {
        console.error('Error sending data:', error);
    }

    connection.trigger('updateActivity', payload);
});
