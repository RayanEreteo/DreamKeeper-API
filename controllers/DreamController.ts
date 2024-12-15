import { Request, Response } from "express";
import { connect } from "../modules/dbConn"
import { areDreamInputsValid } from "../modules/inputsValidator";

export async function addDream(req: Request, res: Response): Promise<any> {
    const {dreamName, dreamContent, isLucid} = req.body
    const email = req.body.payload.email

    try {
        const conn = await connect()
        
        const inputsValidResponseObject = areDreamInputsValid(dreamName, dreamContent, isLucid);
        if (inputsValidResponseObject.success === false) {
          return res.status(400).json(inputsValidResponseObject); // 400 for bad request (validation failed)
        }

        await conn.execute("INSERT INTO dream(author, dreamName, dreamContent, isLucid) VALUES(?, ?, ?, ?)", [
            email,
            dreamName,
            dreamContent,
            isLucid
        ])

        console.log("Dream inserted");
        return res.json({success: true, message: "Dream inserted with success."})

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "An unknown error occurred, please try again.",
          });
    }
}

export async function getDream(req: Request, res: Response): Promise<any> {
    const email = req.body.payload.email

    try {
        const conn = await connect()

        const [data] = await conn.execute("SELECT * FROM dream WHERE author = ?", [
            email
        ])

       return res.json({success: true, data: data})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An unknown error occurred, please try again.",
          });
    }
}