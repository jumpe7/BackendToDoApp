import {Router} from "express";
import {AuthControllers} from "../controllers/auth.controllers.js";

const authRoutes = Router();
const authControllers = new AuthControllers();

authRoutes.get('/getAll', authControllers.getAllUser)
authRoutes.post('/register', authControllers.registerUser)

export default authRoutes;