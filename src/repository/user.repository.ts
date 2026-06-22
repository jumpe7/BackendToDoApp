import {pool} from "../database/db.js";

export class UserRepository {
    async findByEmail(email: string){
        const result = await pool.query('SELECT * FROM users WHERE email= $1', [email]);
        return result.rows[0]||null;
    }

    async createUser(username: string, email: string, hashPassword: string){
        const result = await pool.query('INSERT INTO users (username, email,password) VALUES ($1, $2, $3) RETURNING *, [username, email, hashPassword])');
        return result.rows[0];
    }
}