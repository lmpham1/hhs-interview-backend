// src/routes/api/getById.js

const DataService = require('../../model/data');
const { createSuccessResponse } = require('../../response');

/**
 * Get a single nurse record using their id
 */
module.exports = async (req, res) => {
  const dataService = DataService();
  const id = req.params.id;
  dataService.getNurseById(id).then(nurse => {
    if (nurse){
        res.status(200).json(
            createSuccessResponse(nurse)
        );
    } else {
        res.status(404).json(createErrorResponse(404, `Error! No nurse with id ${newNurse.id} exists!`))
    }
  }).catch(err => {
    res.status(500).json(createErrorResponse(500, err))})
};