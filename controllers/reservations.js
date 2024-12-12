const express = require('express');

module.exports = {
  async getReservationById(req, res) {
    try {
      console.log('Accessing getReservationById');
      console.log('Request params:', req.params);
      const id = req.params.id.toString();
      const url = `${process.env.RESERVATION_SERVICE_URL}/reservations/${id}`;
      console.log('Calling URL:', url);
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error in getReservationById:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async createReservation(req, res) {
    try {
      const { client_id, roomId, checkInDate, checkOutDate, totalAmount, currency, paymentmethod } = req.body;
      const reservationid = null;
      
      // Check if user exists
      console.log('Checking user service...');
      const userResponse = await fetch(`${process.env.CUSTOMER_SERVICE_URL}/users/`);
      if (!userResponse.ok) {
        console.error('User service error:', await userResponse.text());
        return res.status(502).json({ message: "User service unavailable" });
      }
      const users = await userResponse.json();
      
      // Check if room exists
      console.log('Checking room service...');
      const roomResponse = await fetch(`${process.env.ROOM_SERVICE_URL}/rooms/${roomId}`);
      if (!roomResponse.ok) {
        console.error('Room service error:', await roomResponse.text());
        return res.status(502).json({ message: "Room service unavailable" });
      }
      
      // Create reservation
      console.log('Creating reservation...');
      const reservationResponse = await fetch(`${process.env.RESERVATION_SERVICE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id,
          roomId,
          checkInDate, 
          checkOutDate,
          totalAmount
        })
      });
      
      const reservationData = await reservationResponse.json();
      if (!reservationData) {
        return res.status(502).json({ message: "Reservation service unavailable" });
      }

      const paymentResponse = await fetch(`${process.env.PAYMENT_SERVICE_URL}/payment/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reservation_id: reservationData._id,
          client_id,
          amount: totalAmount,
          currency,
          paymentmethod
        })
      });
      console.log("Payment response:", paymentResponse);
      const paymentData = await paymentResponse.json();
      res.json({
        reservation: reservationData,
        payment: paymentData,
      });


    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};