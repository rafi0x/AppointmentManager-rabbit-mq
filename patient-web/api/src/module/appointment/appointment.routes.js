import {Router} from "express"

export default (controller) => {
    const router = Router();
    router.post("/", controller.createAppointment);
    router.get('/approved/:id', controller.getApprovedAppointments);
    router.get('/pendding', controller.getPenddingAppointments);
    return router;
}