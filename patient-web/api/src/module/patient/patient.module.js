import {Patient} from "./patient.modal.js"
import service from "./patient.service.js"
import controller from "./patient.controller.js"
import router from "./patient.routes.js"

const patient_service = service(Patient);
const patient_controller = controller(patient_service);
export const patientModule = router(patient_controller);