import postgres from "postgres";
import { hashSync, genSalt } from "bcrypt";
import { serialize } from "cookie";

import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        const { email, password } = req.body;
        await signIn("credentials", { email, password });

        res.status(200).json({ success: true });
    }
    catch(error){
        if(error === "CredentialsSignIn")
            res.status(401).json({ error: "Invalid Credentials"})
        else
            res.status(500).json({ error : "Something went wrong!"})
    }
}


export async function encryptPassword(password: string){
    const hashedPassword = await hashSync(password, 20);
    return hashedPassword;
}