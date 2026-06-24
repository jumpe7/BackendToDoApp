import type {Request, Response} from 'express';
import {UserService} from "../services/user.service.js";

const userService = new UserService();

export class AuthControllers {
    async getAllUser(req: Request, res: Response){
        const result = await userService.getAllUsers()
        return res.status(200).json(result);
    }

    async registerUser(req: Request, res: Response){
        try {
            const {username, email, password} = req.body;

            if (!username || !email || !password){
                res.status(400).send('Username and password are required');
            }

            const user = await userService.createUser(username,email,password)

            // if (!user) {
            //     return res.status(400).json({
            //         message: "User not created",
            //     });
            // }
            return res.status(200).json(user)
        } catch (e){
            return res.status(400).json({
                message: "Internal Server Error",
            })
        }
    }

    async loginUser(req: Request, res: Response){
        const {username, password} = req.body;
        if (!username || !password){
            res.status(400).send('Юзер или пароль невалидны');
        }

        const user = userService.login(username, password);
    }
}