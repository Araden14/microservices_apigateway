const express = require('express');
const router = express.Router();

module.exports.register = async (req, res) => {
    try {
   
  
      const response = await fetch(`http://localhost:5000/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          dateOfBirth: req.body.dateOfBirth
        })
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message : error.message });
    }
  };