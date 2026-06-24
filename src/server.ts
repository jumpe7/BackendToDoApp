import dotenv from "dotenv";
dotenv.config();

import {app} from './app.js';
import {dbCheckConnection} from "./database/db.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    dbCheckConnection();
    console.log('Server started on port: ', port)
});