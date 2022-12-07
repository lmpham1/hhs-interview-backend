// src/routes/api/index.js

/**
 * The main entry-point for the v1 version of the HHS API.
 */
 const express = require('express');

 // Create a router on which to mount our API endpoints
 const router = express.Router();

// Define our first route, which will be: GET /v1/nurses
router.get('/nurses', require('./getMany'));

// Get single nurse by ID
router.get('/nurse/:id', require('./getById'));

router.post('/nurse', require('./addNurse'));

router.put('/nurse/:id', require('./updateNurse'));

router.delete('/nurse/:id', require('./deleteNurse'));
 
 module.exports = router;