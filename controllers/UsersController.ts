import { connect } from "../modules/dbConn";
import { encrypt, checkHash } from "../modules/bcryptUtils";
import { areInputsValid } from "../modules/inputsValidator";
import { doesUserExist } from "../modules/CRUDFunction";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

/**
 * Insert un utilisateur dans la base de donnée
 */
export async function insertUser(req: Request, res: Response): Promise<any> {
  const { email, password, dreamMemory } = req.body;

  const inputsValidResponseObject = areInputsValid(email, password, dreamMemory);
  if (inputsValidResponseObject.success === false) {
    return res.status(400).json(inputsValidResponseObject); // 400 for bad request (validation failed)
  }

  try {
    const con = await connect();

    const userExist = await doesUserExist(con, email);
    if (userExist) {
      return res.status(409).json({ success: false, message: "Email is already in use." }); // 409 for conflict
    }

    const hashedPass = await encrypt(password);
    await con.execute("INSERT INTO users(email, password, dreamMemory) VALUES(?, ?, ?)", [
      email,
      hashedPass,
      dreamMemory,
    ]);

    console.log("User inserted.");
    return res.status(201).json({ success: true, message: "Account created successfully!" }); // 201 for resource created
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An unknown error occurred, please try again.",
    });
  }
}

/**
 * Authentifie un utilisateur
 */
export async function loginUser(req: Request, res: Response): Promise<any> {
  const { email, password} = req.body;

  const inputsValidResponseObject = areInputsValid(email, password, "")
  if (inputsValidResponseObject.success == false) return res.status(400).json(inputsValidResponseObject)
  
  try {
    const con = await connect();

    const user = await doesUserExist(con, email);
    if (!user) return res.status(409).json({ success: false, message: "This account does not exist." });
  
    const [rows]: Array<any> = await con.execute("SELECT password FROM users WHERE email = ?", [email])
    if (rows.length == 0) return
  
    const userPasswordHash = rows[0].password
    const passwordValid = await checkHash(password, userPasswordHash)
    if (!passwordValid) return res.status(403).json({ success: false, message: "The password is incorrect."})

    const date = new Date();
    date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000)); // 10 days in milliseconds

    const jwt = sign({email}, process.env.JWT_SECRET!, {expiresIn: "10d"});

    res.cookie("authToken", jwt, {httpOnly: true, expires: date})
    
    const username = email.split("@")[0]
    return res.status(200).json({ success: true, message: "Redirecting, please wait...", username: username}) 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unknown error occured, please try again.",
    });
  }
}

/**
 * Supprime le token et deconnecte l'utilisateur
 */
export function logout(req: Request, res: Response): any{
  res.clearCookie("authToken", {httpOnly: true})
  return res.status(200).send("Logged out");
}

/**
 * Verifie si le JWT est valide
 */
export function verifyToken(req: Request, res: Response): any{
  const token = req.body?.token?.value;
  
  if (!token) {
    return res.status(403).send("Undefined token")
  }

  try {
    const payload = verify(token, process.env.JWT_SECRET!);
    return res.status(200).json({ success: true, payload: payload });
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ success: false, message: "Malformed Token" });
    } else {
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  }
}