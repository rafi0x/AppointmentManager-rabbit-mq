export default (service) => {

    const createAppointment = async (req, res, next) => {
        try {
            const appointment = await service.createAppointment(req)
            res.status(201).json(appointment)
        } catch (error) {
            next(error)
        }
    }

    const getApprovedAppointments = async (req, res, next) => {
        try {
            const data = await service.getApprovedAppointments(req.params);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    const getPenddingAppointments = async (req, res, next) => {
        try {
            const data = await service.getPenddingAppointments(req);
            return res.status(201).json(data)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    return Object.freeze({
        getApprovedAppointments,
        createAppointment,
        getPenddingAppointments
    })
}