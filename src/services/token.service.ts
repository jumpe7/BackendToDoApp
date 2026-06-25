import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';


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
}