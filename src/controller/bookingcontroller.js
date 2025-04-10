const { BookingService } = require('../services/index')
const bookingService = new BookingService();
const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/server_config');

class BookingController {
    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const data = { message: 'Success' };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: 'Succesfully published the event'
        });
    }

    async create(req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            console.log("FROM BOOKING CONTROLLER", response);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}

module.exports = BookingController