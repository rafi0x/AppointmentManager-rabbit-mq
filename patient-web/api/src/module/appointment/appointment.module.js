import {Appointment} from "./appointment.modal.js"
import service from "./appointment.service.js"
import controller from "./appointment.controller.js"
import router from "./appointment.routes.js"

const appointment_service = service(Appointment);
const appointment_controller = controller(appointment_service);
export const appointmentModule = router(appointment_controller);

