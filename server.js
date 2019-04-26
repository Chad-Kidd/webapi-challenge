const express = require('express')
const helmet = require('helmet');
const morgan = require('morgan');

const actionRouter = require('./data/helpers/action-router')
const projectRouter = require('./data/helpers/project-router')

const server = express()

server.use(express.json())
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

server.get('/', (req, res, next) => {
    res.send(`<h2>FIRST BACKEND SPRINT</h2>`);
  });

module.exports = server;