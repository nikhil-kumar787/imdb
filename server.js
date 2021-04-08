const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 4000;
const path = require('path');
const movieRoute = require('./routes/userRoute');
const userRoute = require('./routes/movieRoute');
const reviewRoute = require('./routes/reviewRoute');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
//mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.dzqz2.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.dzqz2.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', function () {
    console.log('MongoDB database connection established successfully');
});

app.use('/movies', movieRoute);
app.use('/account', userRoute);
app.use('/reviews', reviewRoute);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT);
});