// src/routes/api/addNurse.js

const { Nurse } = require('../../model/nurse');
const DataService = require('../../model/data');
const { createSuccessResponse, createErrorResponse } = require('../../response');

/**
 * Add a new Nurse record
 */
module.exports = async (req, res) => {
    const dataService = DataService();
    const newNurseData = req.body;
    const newNurse = new Nurse({id: newNurseData.id, first_name: newNurseData.first_name, last_name: newNurseData.last_name, email: newNurseData.email, ward: newNurseData.ward});
    if (newNurse.id) {
        const existingNurse = await dataService.getNurseById(newNurse.id);
        if (existingNurse){
            throw new Error(`Error! Nurse with id ${newNurse.id} already exists!`);
        }
    }
    dataService.addNurse(newNurse).then(id => {
        res
        .status(201)
        .location(process.env.API_URL + '/v1/nurse/' + id)
        .json(createSuccessResponse({id: id}));
    }).catch(err => {
        res.status(500).json(createErrorResponse(500, err))});
};