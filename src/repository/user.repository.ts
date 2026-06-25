import {pool} from "../database/db.js";

export class UserRepository {
    async findByEmail(email: string){
        const result = await pool.query('SELECT * FROM users WHERE email= $1', [email]);
        return result.rows[0]||null;
    }

    async findByUsername(username: string){
        const result = await pool.query('SELECT * FROM users WHERE username= $1', [username]);
        return result.rows[0]||null;
    }

    async createUser(username: string, email: string, hashPassword: string){
        const result = await pool.query('INSERT INTO users (username, email,password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashPassword]);
        return result.rows[0];
    }

    async updateUser(username: string, email: string, password: string, id:  string | string[] | undefined){
        const result = await pool.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [username, email, password, id]);
        return result.rows[0];
    }

    async deleteUser(id: string | string[]){
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    async getAllUsers(){
        const result = await pool.query('SELECT username,email FROM users');
        return result.rows;
    }

    async getAllUsersAdmin(){
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    }
}