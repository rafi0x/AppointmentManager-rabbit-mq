import {Router} from "express"
import { patientModule } from "../module/patient/patient.module.js"
import { appointmentModule } from "../module/appointment/appointment.module.js"

const router = Router();

router.use('/patient', patientModule);
router.use('/appointment', appointmentModule);

export default router;