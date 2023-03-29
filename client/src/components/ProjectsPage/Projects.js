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

function Projects() {
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentSlice, setCurrentSlice] = useState(0);
  const projectsPerPage = 4;
  const isAuthenticated = true;

  const projects = [
    { name: "Project 1", image: "path/to/image1.jpg" },
    { name: "Project 2", image: "path/to/image2.jpg" },
    { name: "Project 3", image: "path/to/image3.jpg" },
    { name: "Project 4", image: "path/to/image1.jpg" },
    { name: "Project 5", image: "path/to/image2.jpg" },
    { name: "Project 6", image: "path/to/image3.jpg" },
    { name: "Project 7", image: "path/to/image3.jpg" },
    { name: "Project 8", image: "path/to/image3.jpg" },
    { name: "Project 9", image: "path/to/image3.jpg" },
  ];

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

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
              to={`/project/${project.name}`}
              className="project-item"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={Project}
                alt={`Image for ${project.name}`}
                className="Project"
              />
              {project.name}
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
