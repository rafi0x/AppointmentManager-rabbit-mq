import amqp from 'amqplib/callback_api.js';
import mongoose from 'mongoose';
import { app } from "./src/app.js";
import router from "./src/routes/index.routes.js";

const start = () => {
    const amqpConfig = {
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'guest',
        password: 'guest',
        locale: 'en_US',
        frameMax: 0,
        heartbeat: 45,
        vhost: '/',
    }
    amqp.connect(amqpConfig, (err, conn) => {
        if(err) {
            console.log(err);
            console.log("Restarting in server");
            setTimeout(start, 1000);
        }
        conn.createChannel((err, channel) => {
            if(err) {
                console.log(err);
                console.log("Restarting in server");
                setTimeout(start, 1000);
            }

            // channel.assertQueue(queue, {
            //     durable: true
            // });

            global.amqp_channel = channel;
        })
        console.log("Connected to RabbitMQ");
        mongoose.connect('mongodb://localhost:27017/clic-patient', { useNewUrlParser: true })
        .then(() => {
            console.log("Database connected");
            app(router).listen(3001, () => {
                console.log("Server started on port 3001");
            })
        })
        .catch(err => {
            console.log(err);
        })

        process.on('beforeExit', () => {
            console.log('closing')
            connection.close()
        })
    })
}
start();