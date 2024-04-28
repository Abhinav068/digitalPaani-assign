const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { UserModel } = require('../models/user.Model');

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let user = await UserModel.find({ email });
        if (!user) {
            res.send({ msg: 'User is already registered' });
            return;
        }
        const hash = bcrypt.hashSync(password, process.env.saltRound);
        const newuser = await UserModel({ firstName, lastName, password: hash, email });
        await newuser.save();
        res.status(200).send({ msg: 'User Successfully registered.' });

    } catch (error) {
        res.send({ error });
    }
})
userRouter.post('/login', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let user = await UserModel.find({ email });
        if (!user) {
            res.send({ msg: 'User is not registered. Please Signup' });
            return;
        }
        if (!bcrypt.compareSync(password, user.password)) {
            res.send({ msg: 'Invalid Credentials' });
            return;
        }

        const token = jwt.sign({ email: user.email }, process.env.secret);
        res.status(200).send({ msg: 'User Successfully logged in.', token });

    } catch (error) {
        res.send({ error });
    }
})




module.exports = { userRouter };