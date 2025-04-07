const { BookingService } = require('../services/index')
const bookingService = new BookingService();
const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(201).json({
            message: 'Successfully Booked',
            success: true,
            error: {},
            data: response
        })
    } catch (error) {
        return res.status(501).json({
            message: 'Internal Server Error',
            success: false,
            error: error,
            data: {}
        })
    }
}
module.exports = {
    create
}