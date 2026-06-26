import type {Request, Response} from 'express';
import {UserService} from "../services/user.service.js";


const userService = new UserService();
const cookieParser = {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
}

export class AuthControllers {
    async getAllUser(req: Request, res: Response){
        const result = await userService.getAllUsers()
        return res.status(200).json(result);
    }

    async getAllUsersAdmin(req: Request, res: Response){
        const result = await userService.getUsersAdmin()
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
        const {email, password} = req.body;
        if (!email || !password){
            res.status(400).send('Юзер или пароль невалидны');
        }

        const user = await userService.login(email, password);

        // res.cookie('refreshToken');
    }

    async updateUser(req: Request, res: Response){
        const {username, email, password} = req.body;
        const id = req.params.id;
        if (!username || !email || !password){
            res.status(400).send('Неверные данные');
        }

        const user = await userService.updateUser(username,email,password,id)
        return res.status(200).json(user);
    }

    async deleteUser(req: Request, res: Response){
        const id = req.params.id;
        if (!id) {
            throw new Error('Неверный id');
        }

        const result = await userService.deleteUser(id);
        return res.status(200).json(result);
    }
}