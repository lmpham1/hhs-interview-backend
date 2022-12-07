// src/routes/api/updateNurse.js

const { Nurse } = require('../../model/nurse');
const DataService = require('../../model/data');
const { createSuccessResponse, createErrorResponse } = require('../../response');

/**
 * Update data for an existing nurse
 */
module.exports = async (req, res) => {
    const dataService = DataService();
    const newNurseData = req.body;
    const newNurse = new Nurse({id: req.params.id, first_name: newNurseData.first_name, last_name: newNurseData.last_name, email: newNurseData.email, ward: newNurseData.ward});
    const existingNurse = await dataService.getNurseById(newNurse.id);
    if (!existingNurse){
        res.status(404).json(createErrorResponse(404, `Error! No nurse with id ${newNurse.id} exists!`));
    }
    dataService.updateNurse(newNurse).then(updatedData => {
        res
        .status(201)
        .location(process.env.API_URL + '/v1/nurse/' + updatedData.id)
        .json(createSuccessResponse({updatedData: updatedData}));
    }).catch(err => {
        res.status(500).json(createErrorResponse(500, err))});
};