import { connection } from '../_database/index'
import { randomUUID } from 'crypto';
const bcrypt = require('bcrypt');


export default class userService {
    static async getAll() {
        const results = await connection.query('SELECT * FROM user;');
        try {
            return results[0];
        } catch(err: any) {
            return console.log(err as Error);
        }
    }
    
    static async getOne(id: string) {
        const results = await connection.query(`SELECT * FROM user WHERE ID = '${id}';`)
        try {
            return results[0];
        } catch(err: any) {
            return console.log(err as Error);
        }
    }

    static async findOne(username: string) {
        const results = await connection.query(`SELECT * FROM user WHERE USERNAME = '${username}';`)
        try {
            return results[0];
        } catch(err: any) {
            return console.log(err as Error);
        }
    }


    static async postOne(body: any) {
        const id = randomUUID();
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(body.password, salt);
        const results = await connection.query(`INSERT INTO user (ID, username, email, password) VALUES ('${id}', '${body.username}', '${body.email}', '${password}');`)
        try {
            return results[0];
        } catch(err: any) {
            return console.log(err as Error);
        }
    }

    static async patchOne(id: string, body: any) {
        const results = await connection.query(`UPDATE user SET username = ? WHERE ID = ?;`, [body.username, id]);
        try {
            return results[0];
        } catch(err: any) {
            return console.log(err as Error);
        }
    }

    static async deleteOne(id: string) {
        const results = await connection.query(`DELETE FROM user WHERE ID = '${id}';`);
        try {
            return results[0];
        } catch(err: any) {
            return console.log(err as Error);
        }
    }
}