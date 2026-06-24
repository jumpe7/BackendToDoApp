import bcrypt from 'bcrypt';
import {UserRepository} from "../repository/user.repository.js";

const userRepository = new UserRepository();

export class UserService {

    async getAllUsers(){
        const users = await userRepository.getAllUsers()
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

    async login(username: string, password: string){
        const exists = await userRepository.findByUsername(username);
        if(!exists){
            throw new Error("Пользователь не зарегистрирован");
        }
        const dbPassword = exists.hashPassword;
        const validPassword = await bcrypt.compareSync(password, dbPassword);

        if(!validPassword){
            throw new Error('Неверный пароль')
        }

    }
}