const express = require('express');
const router = express.Router();
const { createProject, getAllProjects, getProjectById, getProjectByName, updateProjectById, deleteProjectById } = require('../controllers/projectController');

// Create a new project
router.post('/create', createProject);

// Get all projects
router.get('/', getAllProjects);

// Get a project by ID
router.get('/:id', getProjectById);

// Get a project by name
router.get('/name/:name', getProjectByName);

// Update a project
router.put('/:id', updateProjectById);

// Delete a project
router.delete('/:id', deleteProjectById);

module.exports = router;
