import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./Projects.css";
import { Box, Button, IconButton, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image3 from "./Image3.png";
import { Link } from "react-router-dom";

function Projects() {
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentSlice, setCurrentSlice] = useState(0);
  const projectsPerPage = 4;
  const isAuthenticated = true;

  const projects = [
    "Project 1",
    "Project 2",
    "Project 3",
    "Project 4",
    "Project 5",
    "Project 6",
    "Project 7",
    "Project 8",
    "Project 9",

  ];

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.toLowerCase().includes(search.toLowerCase())
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

      <img id="Image3" src={Image3} alt="My Image" />

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
            <Link key={index} to={`/project/${index}`} className="project-item">
              {project}
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
