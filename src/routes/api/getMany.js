// src/routes/api/getMany.js

const DataService = require('../../model/data');
const { createSuccessResponse, createErrorResponse } = require('../../response');

/**
 * Get a list of nurses
 */
module.exports = async (req, res) => {
  const dataService = DataService();
  const options = {
    name: req.query.name,
    ward: req.query.ward
  }
  dataService.getNurses(options).then(nurses => {
    res.status(200).json(
        createSuccessResponse({
        nurses: nurses,
        })
    );
  }).catch(err => {
    res.status(500).json(createErrorResponse(500, err))})
};