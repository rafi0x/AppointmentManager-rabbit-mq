import {rabbit_receive, rabbit_send} from "../../utils/rabbitmq.js";
export default (modal) => {
    const createPatient = async ({body}) => {
        return await modal.create(body);
    }

    const createAppointment = async ({body}) => {
        rabbit_send("appointment_req_queue", body);
    }

    const getAppointments = async ({body}) => {
        return rabbit_receive(id, appointment => appointment)
    }

    const getPatients = async () => {
        return await modal.find({})
    }

    return Object.freeze({
        createPatient,
        createAppointment,
        getAppointments,
        getPatients
    })
}