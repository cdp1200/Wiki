const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const app = require('express')();
const mongoose = require('mongoose');
const db = mongoose.connection;

require('dotenv').config()
require('./config/express')(app);
require('./config/routes')(app);
    
mongoose.connect("mongodb+srv://@cluster0.zbswd.mongodb.net/?retryWrites=true&w=majority", {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => console.log('Db connected'))
.catch((err) => console.log(err));

db.on('error', console.error.bind(console, 'connection error'));

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
