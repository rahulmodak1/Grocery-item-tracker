const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/routes')
const mongoose = require('mongoose');
const port = process.env.PORT || 8002;
mongoose.connect('mongodb+srv://Grocery:736157@groceryitem.aemgyls.mongodb.net/?retryWrites=true')
mongoose.connection.once('open', () => {
    console.log('connected to data base');
})

app.use(cors()); // middleware for access server in different port 
app.use(bodyParser.json()); // middleware to parsing request body before handle it
app.use(router);
app.listen(port, () => {
    console.log('listening on port :-', port)
})
