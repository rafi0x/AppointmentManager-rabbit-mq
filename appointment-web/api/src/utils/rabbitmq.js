export const rabbit_send = (queue, data, cb = null) => {
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

export const rabbit_receive = (queue, cb = null) => {
    global.amqp_channel.assertQueue(queue, {
        durable: true
    });
    global.amqp_channel.consume(queue, (msg) => {
            global.amqp_channel.ack(msg);
            if(cb) cb(JSON.parse(msg.content.toString()));
    }, { noAck: false });
}