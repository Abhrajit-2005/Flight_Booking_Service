class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }

    create = async (req, res) => {
        try {
            const response = await this.bookingService.createBooking(req.body);
            console.log("FROM BOOKING CONTROLLER", response);
            return res.status(201).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            console.log(error);

            return res.status(501).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}

module.exports = BookingController