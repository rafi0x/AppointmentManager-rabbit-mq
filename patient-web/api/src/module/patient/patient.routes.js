import {Router} from "express"

export default (controller) => {
    const router = Router();
    router.post('/', controller.register);
    router.post('/create-appointment', controller.createAppointment);
    router.get('/', controller.getAppointments);
    return router;
}