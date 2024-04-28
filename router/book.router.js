const { Router } = require('express');
const { BookModel } = require('../models/book.model');

const BookRouter = Router();

BookRouter.post('/new', async (req, res) => {
    try {
        const { title, author, publicationYear } = req.body;
        const user = await BookModel({ title, author, publicationYear });
        await user.save();
        res.status(200).send({ msg: 'New book is saved successfully.' });

    } catch (error) {
        res.send({ error });
    }
})

BookRouter.get('/allbooks', async (req, res) => {
    try {
        const { title, author, publicationYear } = req.body;
        const user = await BookModel({ title, author, publicationYear });
        await user.save();
        res.status(200).send({ msg: 'New book is saved successfully.' });

    } catch (error) {
        res.send({ error });
    }
})




module.exports = { BookRouter };