import { Connection } from "mysql2/promise"

/**
 * Verifie si un utilisateur existe dans la base de donnee et retourne un Boolean
 * 
 * @param {Connection} con
 * @param {string} email
 * 
 * @returns {Promise<Boolean>}
*/

export async function doesUserExist(con: Connection, email: string): Promise<boolean> {
    const [results]: any = await con.execute("SELECT * FROM users WHERE email = ?", [email])
    return results.length > 0
}