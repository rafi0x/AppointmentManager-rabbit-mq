import {rabbit_receive, rabbit_send} from "../../utils/rabbitmq.js";

export default (modal) => {

    const getPenddingAppointments = async () => {
        rabbit_receive("appointment_req_queue", async (data) => {
            await modal.create(data);
        });
        return
    }

    const updateAppointmentStatus = async ({body}) => {
        rabbit_send(`${body.patient}`, body, async () => {
            await modal.findByIdAndUpdate(body._id, body);
        });
        return "success";
    }

    const getAppointmentByPatient = async ({id}) => {
        return await modal.find({patient: id});
    }

    const getAllAppointments = async (data = {}) => {
        return await modal.find(data);
    }

    return Object.freeze({
        updateAppointmentStatus,
        getAppointmentByPatient,
        getAllAppointments,
        getPenddingAppointments
    })
}