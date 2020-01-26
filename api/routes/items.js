const express = require('express');
const db = require('../models');

var router = express.Router();

router.get('/items', (req, res) => {
    return db.Item.findAll()
        .then((items) => res.send(items))
        .catch((err) => {
            return res.send(err)
        });
});

router.post('/items', (req, res) => {
    const { name, done } = req.body
    return db.Item.create({ name, done })
        .then((item) => res.status(201).send(item))
        .catch((err) => {
            res.status(400).send(err)
        })
});

router.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id)

    return db.Item.findByPk(id)
        .then((item) => {
            item.destroy({ force: true });
        })
        .then(() => res.status(204).send())
        .catch((err) => {
            res.status(404).send(err)
        });
});

router.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Item.findByPk(id)
        .then((item) => {
            const { name, done } = req.body
            return item.update({ name, done })
                .then(() => res.send(item))
                .catch((err) => {
                    res.status(400).send(err)
                })
        })
});

module.exports = router;