const express = require('express')
const router = express.Router();
const { BookingController } = require('../../controller/index')

router.post('/bookings', BookingController.create);

module.exports = router;