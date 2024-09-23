const express = require('express');
const chat_backend = express.Router();

module.exports = function(io) {
    chat_backend.route('/getUsers')
        .get(async(req,res) => {

        })

    return chat_backend;
}

