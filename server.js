const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/execute', async (req, res) => {
    const { id, name, email } = req.body;

    try {
        const response = await axios.post('https://webhook.site/', { id, name, email }, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY',
                'Content-Type': 'application/json',
            },
        });
        console.log('Data sent successfully:', response.data);
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.error('Error sending data:', error);
        res.status(500).send({ status: 'error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
