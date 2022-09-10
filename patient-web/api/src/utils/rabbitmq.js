export const rabbit_send = (queue_name, data, cb = null) => {
        const queue = queue_name;
        global.amqp_channel.assertQueue(queue, {
            durable: true
        });

        const response = global.amqp_channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
            persistent: true
        });
        if (response && cb) {
            return cb(response);
        }
}

export const rabbit_receive = (queue_name, cb = null) => {
        const queue = queue_name;

        global.amqp_channel.assertQueue(queue, {
            durable: true
        });

        // global.amqp_channel.prefetch();
        global.amqp_channel.consume(queue, (msg) => {
            if(cb) cb(JSON.parse(msg.content.toString()));
            global.amqp_channel.ack(msg);
        }, { noAck: false });
}