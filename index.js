const express = require('express');
const helmet = require('helmet');
const server = express();
const actionDb = require('./data/helpers/actionModel.js');
const projectDb = require('./data/helpers/projectModel.js');
const port = 7013;

server.use(express.json(), helmet());

const checking = (req, res, next) => {
  const { name, description } = req.body;
  if(!name || !description) {
    res.status(400).json({error: "Need a name and description"})
  } else {
    next();
  }
}

server.get('/projects', (req, res) => {
  projectDb.get()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({error: "Server error"}));
});

server.post('/projects', checking, (req, res) => {
  const { name, description } = req.body;
  const newProject = { name, description }
  projectDb.insert(newProject)
    .then(response => res.status(201).json(response))
    .catch(err => res.statusCode(500).json({ error: "Server error"}));
});

server.listen(port, () => console.log(`\n===Server running on ${port}===\n`));