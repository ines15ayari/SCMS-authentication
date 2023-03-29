const express = require('express');
const Router = express.Router();
const { createProject, getAllProjects, getProjectById, getProjectByName, updateProjectById, deleteProjectById } = require('../Controllers/projectController');

// Create a new project
Router.post('/create', createProject);

// Get all projects
Router.get('/', getAllProjects);

// Get a project by ID
Router.get('/:id', getProjectById);

// Get a project by name
Router.get('/name/:name', getProjectByName);

// Update a project
Router.put('/:id', updateProjectById);

// Delete a project
Router.delete('/:id', deleteProjectById);


module.exports = Router;
