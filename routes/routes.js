const express = require('express');
const router = express.Router();
const roomsRouter = require('../controllers/rooms');
const reservationsRouter = require('../controllers/reservations');
const registrationRouter = require('../controllers/registration');

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Voir les chambres disponibles (Microservice chambres)
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Liste de toutes les chambres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   number:
 *                     type: string
 *                   type:
 *                     type: string
 *                   price:
 *                     type: number
 */
router.get('/rooms', roomsRouter.getRooms);


/**
 * @swagger
 * /reservations/:id:
 *   get:
 *     summary: Voir ma réservation (Microservice réservation)
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Détails de la réservation
 */
router.get('/reservations/:id', reservationsRouter.getReservationById);

/**
 * @swagger
 * /reservations/reserver:
 *   post:
 *     summary: Créer une nouvelle réservation (Microservice client, Microservice réservation, Microservice paiement, Microservice chambres)
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client_id
 *               - roomId
 *               - checkInDate
 *               - checkOutDate
 *               - totalAmount
 *               - currency
 *               - paymentmethod
 *             properties:
 *               client_id:
 *                 type: string
 *               roomId:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *               totalAmount:
 *                 type: number
 *               currency:
 *                 type: string
 *               paymentmethod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réservation créée avec succès
 *       502:
 *         description: Service indisponible
 */
router.post('/reservations/reserver', reservationsRouter.createReservation);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Crée un compte client
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client_id
 *               - roomId
 *               - checkInDate
 *               - checkOutDate
 *               - totalAmount
 *               - currency
 *               - paymentmethod
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: "675ab4977b1a47b99ee5f7e1"
 *               roomId:
 *                 type: string
 *                 example: "64f74c8e524a1c0012a34567"
 *               checkInDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-15"
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-20"
 *               totalAmount:
 *                 type: number
 *                 example: 0
 *               currency:
 *                 type: string
 *                 example: "EUR"
 *               paymentmethod:
 *                 type: string
 *                 example: "mastercard"
 *     responses:
 *       200:
 *         description: Compte client créé avec succès
 *       500:
 *         description: Erreur du serveur
 */
router.post('/register', registrationRouter.register);

module.exports = router;