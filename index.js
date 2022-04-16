const express = require('express');
const cors = require('cors');
const {port} = require('./config')
const authRouter = require('./routes/authRouter')

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);

const start = () => {
    try{
        app.listen(port, () => console.log(`Server has bbeen started on port ${port}`))
    } catch (e){
        console.log(e)
    }
}

start();
module.exports = app;
