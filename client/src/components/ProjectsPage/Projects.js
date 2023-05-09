import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./Projects.css";
import { Box, Button, IconButton, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image3 from "./Image3.png";
import Project from "./Project.png";
import { Link } from "react-router-dom";
import axios from 'axios';

function Projects() {
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentSlice, setCurrentSlice] = useState(0);
  const projectsPerPage = 4;
  const isAuthenticated = true;

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:8000/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.Name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, projects]);

  const handleClickNext = () => {
    if (currentSlice + projectsPerPage < filteredProjects.length) {
      setCurrentSlice(currentSlice + projectsPerPage);
    }
  };

  const handleClickPrev = () => {
    if (currentSlice >= projectsPerPage) {
      setCurrentSlice(currentSlice - projectsPerPage);
    }
  };

  return (
    <div className="Projects">
      <NavBar isAuthenticated={isAuthenticated} isProjectsPage={true} />

      <img id="Image3" src={Image3} alt="My Image" className="Image3" />

      <Box className="search-container">
        <Box className="search-input-container">
          <TextField
            label="Search Projects"
            variant="outlined"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Box className="projects-container">
        <IconButton className="arrow-left" onClick={handleClickPrev}>
          <ArrowBackIosIcon />
        </IconButton>
        {filteredProjects
          .slice(currentSlice, currentSlice + projectsPerPage)
          .map((project, index) => (
            <Link
              key={index}
              to={`/project/${project.Name}`}
              className="project-item"
            >
              <img
                src={Project}
                alt={`Image for ${project.Name}`}
                className="Project"
              />
              <h3>{project.Name}</h3>
            </Link>
          ))}
        <IconButton className="arrow-right" onClick={handleClickNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </div>
  );
}

export default Projects;
