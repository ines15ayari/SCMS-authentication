const Project = require('../Models/projects')

//Add a new Project
const createProject = async (req, res) => {
    const { Name, image } = req.body;
  
    try {
      const newProject = new Project({
        Name,
        image
      });
  
      await newProject.save();
      res.status(201).json(newProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Get all projects
const getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

// Get project by ID
const getProjectById = async (req, res) => {
    const projectId = req.params.id;
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

  // Get project by name
const getProjectByName = async (req, res) => {
    try {
      const projectName = decodeURIComponent(req.params.Name);
      const project = await Project.findOne({ Name: projectName });
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };

  // Update project by ID
const updateProjectById = async (req, res) => {
    const projectId = req.params.id;
    const { Name, image } = req.body;
  
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
  
      project.Name = Name;
      project.image = image;
      await project.save();
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

  // Delete project by ID
const deleteProjectById = async (req, res) => {
    const projectId = req.params.id;
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
      await project.remove();
      res.json({ msg: 'Project deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
  module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    getProjectByName,
    updateProjectById,
    deleteProjectById
  };