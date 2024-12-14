import { Request, Response } from "express";
import { connect } from "../modules/dbConn"

export async function addDream(req: Request, res: Response): Promise<any> {
    const {dreamName, dreamContent, isLucid} = req.body
    const email = req.body.payload.email

    try {
        const conn = await connect()
        
        await conn.execute("INSERT INTO dream(author, dreamName, dreamContent, isLucid) VALUES(?, ?, ?, ?)", [
            email,
            dreamName,
            dreamContent,
            isLucid
        ])

        console.log("Dream inserted");
        return res.send("test")

    } catch (error: any) {
        res.send("Erreur : ")
        console.log(error);
        
    }
}