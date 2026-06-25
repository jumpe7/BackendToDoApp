import {Router} from "express";
import {AuthControllers} from "../controllers/auth.controllers.js";

const authRoutes = Router();
const authControllers = new AuthControllers();

authRoutes.get('/getAll', authControllers.getAllUser)
authRoutes.get('/getAdmin', authControllers.getAllUsersAdmin)
authRoutes.post('/register', authControllers.registerUser)
authRoutes.post('/login', authControllers.loginUser)
authRoutes.put('/update/:id', authControllers.updateUser)

export default authRoutes;