import {Router} from "express"

export default (controller) => {
    const router = Router();
    router.put('/update', controller.updateAppointmentStatus);
    router.get('/list/:id', controller.getAppointmentByPatient);
    router.get('/', controller.getAllAppointments);
    router.get('/pendding', controller.getPenddingAppointments);
    return router;
}