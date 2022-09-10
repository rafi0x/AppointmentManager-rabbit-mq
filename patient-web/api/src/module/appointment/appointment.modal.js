import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    patient: {
        type: Number,
    },
    reason: {
        type: String
    },
    doctorName: {
        type: String
    },
    date: {
        type: Date,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {timestamps: true});


export const Appointment = mongoose.model('Appointment', AppointmentSchema);