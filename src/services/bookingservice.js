const { BookingRepo } = require('../repository/index')

const axios = require('axios')
const { FLIGHT_SERVICE_PATH } = require('../config/server_config')
class BookingService {
    constructor() {
        this.repository = new BookingRepo();
    }

    async createBooking(data) {
        try {
            const flightid = data.flight_id;
            const flightdetails = await axios.get(`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightid}`);
            const flightdata = flightdetails.data.data;

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
            return finalbooking;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}

module.exports = BookingService