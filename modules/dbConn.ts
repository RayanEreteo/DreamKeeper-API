import { Connection } from "mysql2/promise"

const mysql = require("mysql2/promise")

// Paramètres de connexion a la base de donnée
const dbParams = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
}
/**
 * Se connecte a la base de donnee et retourne une Promise de type Connection
 * @returns {Promise<Connection>}
**/

export async function connect(): Promise<Connection>{
    console.log("Connexion a la base de donnee...")
    const con = await mysql.createConnection(dbParams)
    console.log("Connecté a la base de donnee")
    return con
}