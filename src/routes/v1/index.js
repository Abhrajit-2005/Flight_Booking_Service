const express = require('express')
const router = express.Router();

const { BookingController } = require('../../controller/index')
const { BookingService } = require('../../services/index')
const { createChannel } = require('../../utils/messageQueue')

let bookingcontroller; // Declare at top so it can be initialized after async call

// Wrap async logic in an IIFE
(async () => {
    const channel = await createChannel(); // Wait for channel to be created
    const bookingService = new BookingService(channel);
    bookingcontroller = new BookingController(bookingService);

    // Set up the route AFTER controller is ready
    router.post('/bookings', bookingcontroller.create);
})();

module.exports = router;