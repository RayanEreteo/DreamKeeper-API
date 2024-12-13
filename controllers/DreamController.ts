import { Request, Response } from "express";
import { connect } from "../modules/dbConn"

export async function addDream(req: Request, res: Response): Promise<any> {
    try {
        const conn = await connect()

        await conn.execute("INSERT INTO dream(dreamName, dreamContent, isLucid) VALUES(?, ?, ?)", [
            "a forest",
            "i was in a forest",
            false
        ])

        console.log("Dream inserted");
        return res.send("test")

    } catch (error: any) {
        res.send("Erreur : ")
        console.log(error);
        
    }
}