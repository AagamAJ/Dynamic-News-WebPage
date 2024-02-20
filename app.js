const express = require('express');
const path = require('path');
const app = express();
const port = 80;

// EXPRESS SPECIFIC CONFIGURATIONS
app.use('/static', express.static('static'));


// SETTING TEMPLATE ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('index.pug', params);
})

// START THE SERVER
app.listen(port, () => {
    console.log(`Application Started Successfully on Port ${port}`);
})