const express = require('express');

const router = express.Router();

const Person = require('../models/Person');

router.route('/')
.get((req, res) => {
  Person.find()
    .then((people) => {
      res.send(people);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
})
.post((req, res) => {
  Person.create(req.body)
  .then((person) => {
    res.send(person);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});

router.route('/:id')
.get((req, res) => {
  Person.findById(req.params.id)
  .then((person) => {
    res.status(200).send(person);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
})
.put((req, res) => {
  Person.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    res.status(err ? 400 : 200).send(err);
  });
})
.delete((req, res) => {
  Person.findByIdAndRemove(req.params.id)
  .then((person) => {
    res.status(200).send(`deleted:\n ${person}`);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});


module.exports = router;
