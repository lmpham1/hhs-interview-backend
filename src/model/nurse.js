// src/model/nurse.js

// crypto allows automatic generation of object id
const { randomUUID } = require('crypto');

const dataService = require('./data')

class Nurse {
    constructor({id, first_name, last_name, email, ward}) {
        if (first_name === undefined) {
            throw new Error('firstName is required');
        }

        if (last_name === undefined) {
            throw new Error('lastName is required');
        }

        if (ward === undefined) {
            throw new Error('ward is required');
        }
        
        this.id = id ? id : randomUUID();
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email ? email : "";
        this.ward = ward;
    }
}

module.exports.Nurse = Nurse;