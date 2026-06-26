import bcrypt from 'bcrypt';
import {UserRepository} from "../repository/user.repository.js";
import {TokenService} from "./token.service.js";

const userRepository = new UserRepository();
const tokenService = new TokenService();

export class UserService {

    async getAllUsers(){
        const users = await userRepository.getAllUsers()
        return users;
    }

    async getUsersAdmin(){
        const users = await userRepository.getAllUsersAdmin()
        return users;
    }

    async createUser(username: string,email: string,password: string){

        const exists = await userRepository.findByEmail(email);

        if(exists){
            throw new Error("Пользователь уже зарегистрирован");
        }

        const hashPassword = await bcrypt.hash(password, 12);
        return userRepository.createUser(username,email,hashPassword);

    }

    async login(email: string, password: string){
        const exists = await userRepository.findByEmail(email);
        if(!exists) {
            throw new Error("Пользователь не зарегистрирован");
        }
        const dbPassword = exists.password;
        const validPassword = await bcrypt.compare(password, dbPassword);

        if(!validPassword){
            throw new Error('Неверный пароль')
        }

        const token = tokenService.generateToken({id: exists.id, username: exists.username});

        return {
            user: exists,
            token: token
        };
    }

    async updateUser(username: string, email: string, password: string, id:  string | string[] | undefined){
        // const exists = await userRepository.findByUsername(username);
        // if(!exists){
        //     throw new Error('Пользователя с таким Юзернеймом не сущестует');
        // }
        const hashPassword = await bcrypt.hash(password, 12);
        const result = await userRepository.updateUser(username,email,hashPassword, id);
        if (result.rowCount == 0){
            throw new Error('Пользователь не найден')
        }
        return result;
    }

    async deleteUser(id: string | string[]){
        const result = await userRepository.deleteUser(id);
        return result;
    }
}