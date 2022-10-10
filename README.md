# Playground full-stack project: <br>videogame ranking website and API.

:construction::construction::construction::construction: Work in Progress :construction::construction::construction::construction:

<h3 align="center">
  <a href="https://gap.nicodeamador.com/">Visit the live app</a> |
  <a href="https://github.com/ndeamador/game-affinity-project-server">View server repository</a>
</h3>

<!-- Some icons from: https://github.com/marwin1991/profile-technology-icons#-javascript  -->
<!-- Handy generator: https://marwin1991.github.io/profile-technology-icons/ -->
<div align="center" style="background-color: white; padding: 15px; column-gap: 10px; row-gap: 10px; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">
  <div style="row-gap: 20px;">
    <img height="50" src="zz_readme_files/javascript.png" alt="JavaScript" title="JavaScript" />
    <img height="50" src="zz_readme_files/typescript.png" alt="TypeScript" title="TypeScript" />
    <img height="50" src="zz_readme_files/React_logo_wordmark.png" alt="React" title="React" />
    <img height="50" src="zz_readme_files/apollo.svg" alt="Apollo GraphQL" title="Apollo GraphQL" />
  </div>
  <div>
    <img height="50" src="zz_readme_files/emotion.png" alt="Emotion CSS-in-JS" title="Emotion CSS-in-JS" />
    <img height="50" src="zz_readme_files/testing-library.png" alt="Testing Library" title="Testing Library" />
    <img height="50" src="zz_readme_files/jest.png" alt="Jest" title="Jest" />
    <img height="50" src="zz_readme_files/cypress-full.svg" alt="Cypress" title="Cypress" />
  </div>
  <div>
    <img height="50" src="zz_readme_files/node-590px.png" alt="N ode.js" title="Node.js" />
    <img height="50" src="zz_readme_files/express.png" alt="Express" title="Express" />
    <img height="50" src="zz_readme_files/GraphQL Logo + Wordmark Stacked (Rhodamine).svg" alt="GraphQL" title="GraphQL" />
    <img height="50" src="zz_readme_files/typeorm.png" alt="TypeORM" title="TypeORM" />
    <img height="50" src="zz_readme_files/typegraphql.svg" alt="TypeGraphQL" title="PostgreSQL" />
    <img height="50" src="zz_readme_files/postgresql-stacked.webp" alt="PostgreSQL" title="PostgreSQL" />
    <img height="50" src="zz_readme_files/redis-stacked.webp" alt="Redis" title="Redis" />
    <img height="50" src="zz_readme_files/docker-stacked.png" alt="Docker" title="Docker" />
    <img height="50" src="zz_readme_files/github-actions.png" alt="GitHub Actions" title="GitHub Actions" />
  </div>
</div>

<br>

<img src="zz_readme_files/home.png" alt="Home view" title="Home view" />
<img src="zz_readme_files/library.png" alt="Home view" title="Home view" />

---

## Features

- Written in modern React using only functional components with hooks.
- Local state management with React and Apollo Graphql.
- Project fully written in TypeScript.
- Full authentication system using Redis sessions.
- Persistent drag-and-drop ranking system.
  Connected to its own [custom server](https://github.com/ndeamador/game-affinity-project-server) (account management, ratings database API) and a [third party API](https://api-docs.igdb.com/) (videogame information).
- Deployment pipeline using GitHub Actions with automated testing, linting and Docker image building and publishing.
- Project deployed to production using Vercel and a self-managed Digital Ocean Ubuntu droplet running Docker virtual machines.

<br>

## Currently missing

- Mobile friendly design: due to the structure of the drag-and-drop system, a mobile-specific, responsive rating module for "My Library" needs to be built from scratch.
- Better automation for PostgreSQL migrations
