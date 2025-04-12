const { BookingRepo } = require('../repository/index')
const { publishMessage } = require('../utils/messageQueue');
const { generateBookingMessage } = require('../utils/bookingMessageTemplate');
const axios = require('axios')
const { FLIGHT_SERVICE_PATH, USER_SERVICE_PATH } = require('../config/server_config')


class BookingService {
    constructor(channel) {
        this.repository = new BookingRepo();
        this.channel = channel;
    }

    async createBooking(data) {
        try {
            const flightid = data.flight_id;
            const flightdetails = await axios.get(`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightid}`);
            const flightdata = flightdetails.data.data;

            const userid = data.user_id;
            const userdetails = await axios.get(`${USER_SERVICE_PATH}/api/v1/users/${userid}`);
            const user_email = userdetails.data.data.email;
            data.user_email = user_email;
            if (data.no_of_seats > flightdata.totalSeats) {
                throw { error: 'No enough seats available' }
            }

            const price = flightdata.price;
            const totalCost = price * data.no_of_seats;
            const bookingPayload = { ...data, totalCost };
            const booking = await this.repository.createBooking(bookingPayload);
            console.log(flightid);

            await axios.patch(`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightid}`, { totalSeats: flightdata.totalSeats - data.no_of_seats });
            const finalbooking = await this.repository.update(booking.id, { status: "BOOKED" });
            const enrichedBooking = {
                ...finalbooking,
                flight_id: data.flight_id,
                user_email: data.user_email,
                totalCost,
                id: booking.id,
                notificationTime: booking.updatedAt,
            };
            const message = generateBookingMessage(enrichedBooking);
            await publishMessage(this.channel, 'BOOKING_SERVICE', JSON.stringify(message));

            return finalbooking;

        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}

module.exports = BookingService