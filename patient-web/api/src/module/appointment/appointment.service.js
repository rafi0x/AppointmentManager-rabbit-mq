import {rabbit_receive, rabbit_send} from "../../utils/rabbitmq.js";

export default (modal) => {

    const createAppointment = async ({body}) => {
        const data = new modal(body);
        rabbit_send("appointment_req_queue", {
            ...data._doc,
            patientName: body.patientName,
            patientContact: body.patientContact,
        });
        return await data.save();
    }

    const getPenddingAppointments = async () => {
        
        return await modal.find({status: "pending"});
    }

    const getApprovedAppointments = async ({id}) => {
        rabbit_receive(id, async (data) => {
            await modal.findByIdAndUpdate(data._id, data);
        });
        return await modal.find({status: "approved", patient: id});
    }

    return Object.freeze({
        createAppointment,
        getApprovedAppointments,
        getPenddingAppointments
    })
}