function generateBookingMessage(booking) {
    return {
        subject: 'Booking Confirmation',
        content: `Dear User, your booking for flight ${booking.flight_id} has been confirmed.
                  Your booking ID is ${booking.id}.
                  Your total cost is ${booking.totalCost}.
                  Thank you for choosing us!`,
        recipientEmail: booking.user_email,
        status: booking.status,
        totalCost: booking.totalCost,
        notificationTime: booking.notificationTime,
        id: booking.id,
        flightId: booking.flight_id,
    };
}

module.exports = { generateBookingMessage };
