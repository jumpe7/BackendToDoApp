import bcrypt from 'bcrypt';
import {UserRepository} from "../repository/user.repository.js";

const userRepository = new UserRepository();

export class UserService {

    async getAllUsers(){

    }

    async createUser(username: string,email: string,password: string){

        const exists = await userRepository.findByEmail(email);

        if(exists){
            throw new Error("User already exists");
        }

        const hashPassword = await bcrypt.hash(password, 12);
        return userRepository.createUser(username,email,hashPassword);

    }
}