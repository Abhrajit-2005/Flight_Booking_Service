const { BookingTable } = require('../models');

class bookingRepo {
    async createBooking(bookingData) {
        try {
            const booking = await BookingTable.create(bookingData);
            return booking;
        } catch (error) {
            throw error;
        }
    }

    async getBookingById(id) {
        try {
            const booking = await BookingTable.findOne({
                where: { id },
            });
            return booking;
        } catch (error) {
            throw error;
        }
    }

    async getAllBookings() {
        try {
            const bookings = await BookingTable.findAll();
            return bookings;
        } catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const response = await Booking.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = bookingRepo;