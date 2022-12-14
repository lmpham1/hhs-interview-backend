// src/app.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('./logger');
const pino = require('pino-http')({
  // Use our default logger instance, which is already configured
  logger,
});

const { createErrorResponse } = require('./response');

// Create an express app instance we can use to attach middleware and HTTP routes
const app = express();

// Add support for incoming JSON entities
app.use(bodyParser.json());

// Use logging middleware
app.use(pino);

// Use security middleware
app.use(helmet());

// Use CORS middleware so we can make requests across origins
app.use(cors());

// Define our routes
app.use('/', require('./routes'));

// Add 404 middleware to handle any requests for resources that can't be found
app.use((req, res) => {
  res.status(404).json(createErrorResponse(400, 'not found'));
});

// Add error-handling middleware to deal with anything else
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // We may already have an error response we can use, but if not, use a generic
  // 500 server error and message.
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  // If this is a server error, log something so we can see what's going on.
  if (status > 499) {
    logger.error({ err }, `Error processing request`);
  }

  res.status(status).json({
    status: 'error',
    error: {
      message,
      code: status,
    },
  });
});

// Export our `app` so we can access it in server.js
module.exports = app;