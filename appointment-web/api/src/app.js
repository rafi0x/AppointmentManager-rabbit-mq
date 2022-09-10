import express from 'express';
import cors from 'cors';
export const app = (routes) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/api', routes);

    app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
            message: err.message,
            status: res.statusCode,
            route: req.originalUrl,
            timestamps: new Date().toLocaleString(),
        });
    })

    return app
}