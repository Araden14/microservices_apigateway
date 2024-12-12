const express = require('express');
const router = express.Router();

module.exports.getRooms = async (req, res) => {
    console.log("Fetching rooms from rooms microservice");
    const response = await fetch(`http://localhost:3001/rooms`);
    const data = await response.json();
    res.json(data);
};
