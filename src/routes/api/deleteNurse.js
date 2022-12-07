// src/routes/api/deleteNurse.js

const DataService = require('../../model/data');
const { createSuccessResponse, createErrorResponse } = require('../../response');

/**
 * Delete a nurse record from the database
 */
module.exports = async (req, res) => {
    const dataService = DataService();
    const id = req.params.id;
    const existingNurse = await dataService.getNurseById(id);
    if (!existingNurse){
        res.status(404).json(createErrorResponse(404, `Error! No nurse with id ${id} exists!`));
    }
    dataService.deleteNurse(id).then(deletedId => {
        res
        .status(201)
        .location(process.env.API_URL + '/v1/nurse/' + deletedId)
        .json(createSuccessResponse({id: deletedId}));
    }).catch(err => {
        res.status(500).json(createErrorResponse(500, err))});
};