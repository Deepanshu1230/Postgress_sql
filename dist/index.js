"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
//CONNECTING THE NEON LINK WITH IT
const client = new pg_1.Client({
    connectionString: "postgresql://neondb_owner:npg_wp3hT4FgZkBy@ep-flat-tree-a56mlmse-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
});
//Creating the table
// async function createusertable(){
//     await client.connect();
//     const result=await client.query(`
//     CREATE TABLE  users(
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(25) UNIQUE NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     );
//     `);
//     console.log(result);
// }
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertquery = ` INSERT INTO users(
     email,
     username,
     password
    ) VALUES($1,$2,$3);
`;
            const values = ["Deepanshu@gmail.com", "Deepanshu", "Deepanshu123"];
            const res = yield client.query(insertquery, values);
            console.log("Insertion Complete", res);
        }
        catch (err) {
            console.log(err);
        }
    });
}
function createtodo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const createtable = `
        CREATE TABLE todos(
        id SERIAL PRIMARY KEY,
        Task TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER REFERENCES users(id) 

        );`;
            const answer = yield client.query(createtable);
            console.log("Create todo", answer);
        }
        catch (err) {
            console.log(err);
        }
    });
}
function inserttodo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertattodo = `
        INSERT INTO todos(
        task
        )
        VALUES($1)`;
            const values = ["IND WIN OVER PAK"];
            const res = yield client.query(insertattodo, values);
            console.log(res);
        }
        catch (err) {
        }
    });
}
function getEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getmail = `SELECT * FROM users WHERE email=$1;`;
            const result = yield client.query(getmail, [email]);
            if (result.rows.length > 0) {
                console.log("User found:", result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log("No user found");
                return null;
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
function createAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const res = `CREATE TABLE address(
       id SERIAL PRIMARY KEY,
       user_id INTEGER NOT NULL,
       city VARCHAR(50) NOT NULL,
       country VARCHAR(250) NOT NULL,
       street VARCHAR(255) NOT NULL,
       pincode VARCHAR(50),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

    )`;
            const answer = yield client.query(res);
            console.log("Address Created:", answer);
        }
        catch (err) {
            console.log(err);
        }
    });
}
function insertAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const res = `INSERT INTO address(
          city,
          user_id,
          country,
          street,
          pincode
        ) VALUES($1,$2,$3,$4,$5)`;
            const values = ['Delhi', 1, 'India', 'Gandhi Market', '110069'];
            const result = yield client.query(res, values);
            console.log("Address Inserted:", result);
        }
        catch (err) {
            console.log(err);
        }
    });
}
function getuseraddress() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const res = `SELECT u.id,u.username,u.email,a.city,a.country,a.street,
        a.pincode
        FROM users u
        JOIN address a ON u.id=a.user_id
        WHERE u.id =1`;
            const result = yield client.query(res);
            console.log("Getting the Info:", result);
        }
        catch (err) {
            console.log(err);
        }
    });
}
// getuseraddress();
// createtodo();
inserttodo();
// insertAddress();
// createAddress();
// getEmail("Deepanshu@gmail.com").catch(console.error);
// createusertable();
// insertData();
