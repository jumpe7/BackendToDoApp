import dotenv from "dotenv";
dotenv.config();

import {Pool} from "pg";


export const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
})

export async function dbCheckConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('База данных подключена');
    } catch(e){
        console.error(`Ошибка подключения к базе данных: ${e}`);
    }
}