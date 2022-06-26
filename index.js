const express = require('express');
const cors = require('cors');
const {port} = require('./config')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const thesaurusRouter = require('./routes/thesaurusRouter')
const {get} = require("./repositories/thesaurusRepository");

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/thesaurus', thesaurusRouter)

const start = () => {
    try {
        app.listen(port, () => console.log(`Server has been started on port ${port}`))
    } catch (e) {
        console.log(e)
    }
}
console.table(get('1'))
start();
module.exports = app;
