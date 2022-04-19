const express = require('express');
const cors = require('cors');
const {port} = require('./config')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/user', userRouter);

const start = () => {
    try {
        app.listen(port, () => console.log(`Server has been started on port ${port}`))
    } catch (e) {
        console.log(e)
    }
}

start();
module.exports = app;
