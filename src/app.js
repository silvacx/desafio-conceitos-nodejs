const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const respository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(respository);

  return response.json(respository);

});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const respositoryIndex = repositories.findIndex(respository => respository.id === id);

  if(respositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const respository = {
    id,
    title,
    url,
    techs,
    likes: repositories[respositoryIndex].likes,
  };

  repositories[respositoryIndex] = respository;

  return response.json(respository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const respositoryIndex = repositories.findIndex(respository => respository.id === id);

  if(respositoryIndex >= 0) {
    repositories.splice(respositoryIndex, 1);
  } else {
    return response.status(400).json( { error: 'Repository not exists.' } )
  }

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const respositoryIndex = repositories.findIndex(respository => respository.id === id);

  if(respositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories[respositoryIndex].likes++;

  return response.json(repositories[respositoryIndex]);

});

module.exports = app;
