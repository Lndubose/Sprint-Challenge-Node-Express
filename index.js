const express = require('express');
const helmet = require('helmet');
const server = express();
const actionDb = require('./data/helpers/actionModel.js');
const projectDb = require('./data/helpers/projectModel.js');
const port = 7013;

server.use(express.json(), helmet());

// ===Middleware===

const checkingProject = (req, res, next) => {
  const { name, description } = req.body;
  if(!name || !description) {
    res.status(400).json({error: "Need a name and description"})
  } else {
    next();
  }
}

const checkingPostAction = (req, res, next) => {
  const { notes, description, project_id } = req.body;
  if(!notes || !description || !project_id) {
    res.status(400).json({error: "Need a description, notes, and the user that is adding the action."})
  } else {
    next();
  }
}

const checkingPutAction = (req, res, next) => {
  const { description, notes } = req.body;
  if(!notes || !description ) {
    res.status(400).json({error: "Need a description and notes to update action"})
  } else {
    next();
  }
}

// ====Project CRUD methods====

server.get('/projects', (req, res) => {
  projectDb.get()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({error: `Server error --> ${err} `}));
});

server.get('/projects/actions/:projectId', (req, res) => {
  const { projectId } = req.params;
  projectDb.get(projectId)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({error: `Server error --> ${err} `}));
});

server.post('/projects', checkingProject, (req, res) => {
  const { name, description } = req.body;
  const newProject = { name, description }
  projectDb.insert(newProject)
    .then(response => res.status(201).json(response))
    .catch(err => res.statusCode(500).json({ error: `Server error --> ${err} `}));
});

server.delete('/projects/:projectId', (req, res) => {
  const { projectId } = req.params;
  projectDb.remove(projectId)
    .then(response => {
      if(response) {
        res.status(200).json({message: "Delete project success."})
      } else {
        res.status(400).json({ error: "No project with that id."})
      }
    })
    .catch(err => res.status(500).json({ error: `Server error --> ${err} ` }));
});

server.put('/projects/:projectId', checkingProject, (req, res) => {
  const { projectId } = req.params;
  const updateProject = req.body;
  projectDb.update(projectId, updateProject)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ error: `Server error --> ${err} `}));
});

// ====Action CRUD methods====

server.get('/actions', (req, res) => {
  actionDb.get()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ error: `Server error --> ${err} `}));
});

server.post('/actions', checkingPostAction, (req, res) => {
  actionDb.insert(req.body)
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json({ error: `Server error --> ${err} `}));
});

server.delete('/actions/:actionId', (req, res) => {
  const { actionId } = req.params;
  actionDb.remove(actionId)
    .then(response => {
      if(response) {
      res.status(200).json({message: "Delete project success."})
    } else {
      res.status(400).json({ error: "No project with that id."})
    }
  })
    .catch(err => res.status(500).json({ error: `Server error --> ${err}` }));
});

server.put('/actions/:actionId', checkingPutAction, (req, res) => {
  const { actionId } = req.params;
  const updateAction = req.body;
  actionDb.update(actionId, updateAction)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ error: `Server error --> ${err}` }));
});


server.listen(port, () => console.log(`\n===Server running on ${port}===\n`));