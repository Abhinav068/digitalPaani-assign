const express = require('express');
const path=require('path');
const { connection } = require('./config/db');
const { UserModel } = require('./models/user.Model');
const app = express();
const cors = require('cors')
 
require('dotenv').config();

app.use(cors())
app.use(express.static(__dirname+ "/view"));
const port = process.env.port;

app.use(express.json());


app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/user', async (req, res) => {
    try {
        const { firstName, lastName, department,email } = req.body;
        const user = await UserModel({ firstName, lastName, department,email });
        await user.save();
        res.status(200).send({ msg: 'User Successfully registered.' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Something went wrong' });
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users);

    } catch (error) {
        res.status(500).send({ msg: 'Something went wrong' });

    }
})
app.patch('/user/:ID', async (req, res) => {
    try {
        const ID = req.params.ID;
        const payload = req.body;
        const doc = await UserModel.findOneAndUpdate({ ID }, { ...payload }, { new: true });
        res.status(200).send(doc);

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Something went wrong' });

    }
})
app.delete('/user/:ID', async (req, res) => {
    try {
        const ID = req.params.ID;
        const doc = await UserModel.findOneAndDelete({ ID });
        res.send({ doc, msg: "The document has been deleted." });

    } catch (error) {
        res.status(500).send({ msg: 'Something went wrong' });

    }
})


app.listen(port, async () => {
    await connection;
    console.log(`Backend Running at ${port}`);
})