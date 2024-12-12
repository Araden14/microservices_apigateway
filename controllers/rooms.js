const express = require('express');
const router = express.Router();

module.exports.getRooms = async (req, res) => {
    console.log("Fetching rooms from rooms microservice", "process.env.ROOM_SERVICE_URL", process.env.ROOM_SERVICE_URL);
    const response = await fetch(`${process.env.ROOM_SERVICE_URL}/rooms`);
    const data = await response.json();
    res.json(data);
};
