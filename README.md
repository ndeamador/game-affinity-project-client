<h1 align=center>Playground full-stack project: <br>videogame ranking website and API.</h1>

<p align=center>:construction::construction::construction::construction: Work in Progress :construction::construction::construction::construction:</p>



<h3 align="center">
  <a href="https://gap.nicodeamador.com/">Visit the live app</a> |
  <a href="https://github.com/ndeamador/game-affinity-project-server">View server repository</a>
</h3>

<br>


<!-- Some icons from: https://github.com/marwin1991/profile-technology-icons#-javascript  -->
<!-- Handy generator: https://marwin1991.github.io/profile-technology-icons/ -->
<div align="center" style="background-color: white; padding: 15px; column-gap: 10px; row-gap: 15px; display: flex; flex-direction: column; flex-wrap: wrap; justify-content: center;">
  <div style="display: flex; justify-content: space-around; padding: 0 0.8em">
    <img height="50" src="zz_readme_files/javascript.png" alt="JavaScript" title="JavaScript" />
    <img height="50" src="zz_readme_files/typescript.png" alt="TypeScript" title="TypeScript" />
    <img height="50" src="zz_readme_files/React_logo_wordmark.png" alt="React" title="React" />
    <img height="50" src="zz_readme_files/apollo.png" alt="Apollo GraphQL" title="Apollo GraphQL" />
  </div>
  <div style="display: flex; justify-content: space-around; padding: 0 4em">
    <img height="50" src="zz_readme_files/emotion.png" alt="Emotion CSS-in-JS" title="Emotion CSS-in-JS" />
    <img height="50" src="zz_readme_files/testing-library.png" alt="Testing Library" title="Testing Library" />
    <img height="50" src="zz_readme_files/jest.png" alt="Jest" title="Jest" />
    <img height="50" src="zz_readme_files/cypress-full.svg" alt="Cypress" title="Cypress" />
  </div>
  <div style="display: flex; justify-content: space-around; padding: 0 2em">
    <img height="50" src="zz_readme_files/node-590px.png" alt="N ode.js" title="Node.js" />
    <img height="50" src="zz_readme_files/express.png" alt="Express" title="Express" />
    <img height="50" src="zz_readme_files/GraphQL Logo + Wordmark Stacked (Rhodamine).svg" alt="GraphQL" title="GraphQL" />
    <img height="50" src="zz_readme_files/typeorm.png" alt="TypeORM" title="TypeORM" />
    <img height="50" src="zz_readme_files/typegraphql.svg" alt="TypeGraphQL" title="TypeGraphQL" />
  </div>
  <div style="display: flex; justify-content: space-around; padding: 0 6em">
    <img height="50" src="zz_readme_files/postgresql-stacked.webp" alt="PostgreSQL" title="PostgreSQL" />
    <img height="50" src="zz_readme_files/redis-stacked.webp" alt="Redis" title="Redis" />
    <img height="50" src="zz_readme_files/docker-stacked.png" alt="Docker" title="Docker" />
    <img height="50" src="zz_readme_files/github-actions.png" alt="GitHub Actions" title="GitHub Actions" />
  </div>
</div>

<br>

<img src="zz_readme_files/home.png" alt="Home view" title="Home view" />
<img src="zz_readme_files/library.png" alt="Library view" title="Library view" />

---

## Features

- Written in modern React with hooks using only functional components.
- Local state management with React and Apollo Graphql.
- Project fully written in TypeScript.
- Full user authentication system.
- Persistent drag-and-drop ranking system.
- [Custom server](https://github.com/ndeamador/game-affinity-project-server) interfacing a PostgreSQL database for accounts and ratings persistence, a Redis sessions cache, and connections to a [third party API](https://api-docs.igdb.com/).
- Deployment pipeline using GitHub Actions with automated testing, linting and Docker image building and publishing.
- Optimized Docker images (e.g.: reduced backend image size from 1.23 GB to 189 MB with a multi-stage build).
- Project deployed to production using Vercel and a self-managed Digital Ocean Ubuntu droplet running Docker virtual machines.

<br>

## Pending

- Mobile friendly design: due to the structure of the drag-and-drop system, a custom, mobile-specific, responsive rating module for "My Library" needs to be built from scratch.
- Better production automation for PostgreSQL migrations.
- Lexorank implementation for efficient Drag and Drop persistence.
- Updated tests for most recent features.
