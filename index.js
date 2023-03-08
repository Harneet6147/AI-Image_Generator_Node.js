const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT;


const app = express();

//body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, () => {
    console.log(`Server started at port number ${port}`);
})