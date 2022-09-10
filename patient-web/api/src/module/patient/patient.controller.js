export default (service) => {
    const register = async (req, res, next) => {
        try {
            const patient = await service.createPatient(req.body)
            res.status(201).json(patient)
        } catch (error) {
            next(error)
        }
    }

    const createAppointment = async (req, res, next) => {
        try {
            const appointment = await service.createAppointment(req)
            res.status(201).json(appointment)
        } catch (error) {
            next(error)
        }
    }

    const getAppointments = async (req, res, next) => {
        try {
            const appointments = await service.getAppointments(req)
            res.status(200).json(appointments)
        } catch (error) {
            next(error)
        }
    }

    return Object.freeze({
        register,
        createAppointment,
        getAppointments
    })
}