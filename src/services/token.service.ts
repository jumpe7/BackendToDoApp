import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import {UserRepository} from "../repository/user.repository.js";

const userRepository = new UserRepository();
interface TokenPayload {
    id: number;
    username: string;
}

export class TokenService {
    async generateToken(payload: TokenPayload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS as string, { expiresIn: '24h' });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH as string, { expiresIn: '7d' });
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(token: string, userId: string){
        const tokenData = await userRepository.checkToken(token)
        if (tokenData.rows.length > 0){
            const saveToken = await userRepository.updateToken(token);
            return saveToken;
        }

        const tokens = await userRepository.saveToken(token, userId)
        return tokens;
    }
}