import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';

import 'animate.css';
import '../Styles/Projects.css';

import { myProjects, projectTypes } from './MyProjectData';
import PageTitle from './ui/PageTitle';
import { container, item } from './About';

const Projects = () => {

  /* ---------------- STATE ---------------- */
  const [repos, setRepos] = useState(myProjects);
  const [filtertype, setFiltertype] = useState('All');

  /* ---------------- HANDLERS ---------------- */
  const handleFilter = (type) => {
    if (type === 'All') {
      setRepos(myProjects);
    } else {
      setRepos(myProjects.filter(p => p.Language?.includes(type)));
    }
    setFiltertype(type);
  };

  const handleOpenLink = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  /* ---------------- UI ---------------- */
  return (
    <Container sx={{ my: { xs: '12%', lg: '70px' } }}>
      {/* ================= HEADER ================= */}
      <PageTitle
				bgText="WORK"
				title="My"
				highlight="Projects"
			/>

      {/* ================= FILTER ================= */}
      <Stack direction="row" gap={3} justifyContent="center" mb={5}>
        {projectTypes.map((type) => (
          <Typography
            key={type}
            className={`project-type ${
              filtertype === type ? 'project-type-active' : ''
            }`}
            onClick={() => handleFilter(type)}
          >
            {type}
          </Typography>
        ))}
      </Stack>

      {/* ================= PROJECT GRID ================= */}
      <Grid
        container
        spacing={4}
        component={motion.ul}
        variants={container}
        initial="hidden"
        animate="visible"
        sx={{ listStyle: 'none' }}
      >
        {repos.map((e) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={e.id}
            component={motion.li}
            variants={item}
          >
            <Card className="project-card">

              {/* ---------- TITLE (ALWAYS VISIBLE) ---------- */}
              <Typography
                variant="h6"
                fontWeight={700}
                textAlign="center"
                mb={1}
              >
                {e.title}
              </Typography>

              {/* ---------- IMAGE OR DESCRIPTION ---------- */}
              {e.img ? (
                <Box
                  className="flip-card"
                  onClick={() => handleOpenLink(e.rlink || e.githubLink)}
                >
                  <Box className="flip-card-inner">
                    {/* FRONT */}
                    <Box className="flip-card-front">
                      <img src={e.img} alt={e.title} />
                    </Box>

                    {/* BACK */}
                    <Box className="flip-card-back">
                      <Typography variant="body2" mb={1}>
                        {e.description}
                      </Typography>

                      {e.Language?.length > 0 && (
                        <Box mt={1}>
                          {e.Language.map((tech) => (
                            <span key={tech} className="tech-chip">
                              {tech}
                            </span>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              ) : (
                /* ---------- NO IMAGE → SHOW DESCRIPTION ---------- */
                <Box className="description-only">
                  <Typography variant="body2" mb={1}>
                    {e.description}
                  </Typography>

                  {e.Language?.length > 0 && (
                    <Box mt={1}>
                      {e.Language.map((tech) => (
                        <span key={tech} className="tech-chip">
                          {tech}
                        </span>
                      ))}
                    </Box>
                  )}
                </Box>
              )}

              {/* ---------- LINKS (OPTIONAL) ---------- */}
              {(e.rlink || e.githubLink) && (
                <Box
                  display="flex"
                  justifyContent="center"
                  gap={3}
                  mt={2}
                >
                  {e.rlink && (
                    <Typography
                      className="project-link"
                      onClick={() => handleOpenLink(e.rlink)}
                    >
                      Live
                    </Typography>
                  )}
                  {e.githubLink && (
                    <Typography
                      className="project-link"
                      onClick={() => handleOpenLink(e.githubLink)}
                    >
                      GitHub
                    </Typography>
                  )}
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects;
