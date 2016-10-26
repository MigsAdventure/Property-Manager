const express = require('express');

const router = express.Router();

const Property = require('../models/Property');

router.route('/')
.get((req, res) => {
  Property.find()
    .then((prop) => {
      res.send(prop);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
})
.post((req, res) => {
  Property.create(req.body)
  .then((prop) => {
    res.send(prop);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});

router.route('/:id')
.get((req, res) => {
  Property.findById(req.params.id)
    .populate('clients')
    .then((prop) => {
      res.status(200).send(prop);
    })
  .catch((err) => {
    res.status(400).send(err);
  });
})
.put((req, res) => {
  Property.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    res.status(err ? 400 : 200).send(err);
  });
})
.delete((req, res) => {
  Property.findByIdAndRemove(req.params.id)
  .then((prop) => {
    res.status(200).send(`deleted:\n ${prop}`);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});

router.route('/:propId/client/:clientId')
  .put((req, res) => {
    const { propId, clientId } = req.params;
    Property.findById(propId)
    .then((prop) => {
      prop.clients.push(clientId);
      return prop.save();
    })
    .then((savedProperty) => {
      res.send(savedProperty);
    })
    .catch(err => res.status(400).send(err));
  })
  .delete((req, res) => {
    const { propId, clientId } = req.params;
    Property.findById(propId)
    .then((prop) => {
      console.log('prop: ', prop.clients);
      prop.clients.pull(clientId);
      prop.save();
      res.send(`deleted ${clientId}`);
    })
    .catch(err => res.status(400).send(err));
  });

module.exports = router;
