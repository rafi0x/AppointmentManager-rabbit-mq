import {Router} from "express"
import { appointmentModule } from "../modules/appointment/appointment.module.js";

const router = Router();

router.use('/appointment', appointmentModule);

export default router;