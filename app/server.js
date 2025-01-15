require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./models/index.js');

const app = express();

// app.use(logger('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true , limit: '2mb'}));
app.use(cookieParser());
app.use(express.static("app/public"));

// Set app config
const title = process.env.TITLE;
const port = process.env.PORT;
const baseUrl = process.env.URL + port;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Route Handling
require('./router/router.js')(app);

// Start the server directly
app.listen(port, () => {
    console.log(`${title} is running on ${baseUrl}`);
});
