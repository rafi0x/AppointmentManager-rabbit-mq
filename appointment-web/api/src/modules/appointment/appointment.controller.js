export default (service) => {
    const updateAppointmentStatus = async (req, res, next) => {
        try {
            const data = await service.updateAppointmentStatus(req);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    const getAppointmentByPatient = async (req, res, next) => {
        try {
            const data = await service.getAppointmentByPatient(req.params);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    const getAllAppointments = async (req, res, next) => {
        try {
            const data = await service.getAllAppointments();
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    const getPenddingAppointments = async (req, res, next) => {
        try {
            await service.getPenddingAppointments();
            const data = await service.getAllAppointments({status: "pending"});
            return res.status(201).json(data)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    return Object.freeze({
        updateAppointmentStatus,
        getAppointmentByPatient,
        getAllAppointments,
        getPenddingAppointments
    })
}