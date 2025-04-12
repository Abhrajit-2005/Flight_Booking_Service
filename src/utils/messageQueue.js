const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME, REMINDER_BINDING_KEY } = require('../config/server_config');

const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async (channel, service, REMINDER_BINDING_KEY) => {
    try {
        const applicationQueue = await channel.assertQueue('REMINDER_QUEUE', { durable: true });

        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, REMINDER_BINDING_KEY);

        channel.consume(applicationQueue.queue, msg => {
            console.log('received data');
            console.log(msg.content.toString());
            const payload = JSON.parse(msg.content.toString());
            service(payload);
            channel.ack(msg);
        });
    } catch (error) {
        throw error;
    }

}

const publishMessage = async (channel, REMINDER_BINDING_KEY, message) => {
    try {
        await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
        const applicationQueue = await channel.assertQueue('REMINDER_QUEUE', { durable: true });
        await channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, REMINDER_BINDING_KEY);
        const p = await channel.publish(EXCHANGE_NAME, REMINDER_BINDING_KEY, Buffer.from(message));
        if (p) {
            console.log('Message sent successfully');
        }
        else {
            console.log('Message sent failed');
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    subscribeMessage,
    createChannel,
    publishMessage
}