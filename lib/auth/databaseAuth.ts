"use server"

import postgres from "postgres";
import * as zod from "zod"
import { hashPassword, generateSalt, comparePasswords } from "./passwordHasher";
import createUserSession, { removeUserFromSesssion } from "./session";
import type { UserSession } from "./session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const UserSchema = zod.object({
    email: zod.email(),
    password: zod.string().nonempty().min(6)
})

export type userMessageSchema = {
    message?: string,
    errors?: {
        email?: string[],
        password?: string[],
    }
}


export async function register(prevState: userMessageSchema, unsafeData: FormData, alterUserSession?: boolean): Promise<userMessageSchema>{
    const {success, data, error} = UserSchema.safeParse({
        email: unsafeData.get("email"),
        password: unsafeData.get("password")
    });

    if (!success) return { message: "Unable to register account.", errors: error.flatten().fieldErrors};

    const existingUser = await sql`SELECT * FROM users WHERE email=${data.email}`;

    if (existingUser.length != 0) return {message: "Account already exists for email."};
    
    try{
        const salt = generateSalt();
        const hashedPassword = await hashPassword(data.password, salt);
    
        const user = await sql<UserSession[]>`INSERT INTO users (email, password, salt) VALUES (${data.email}, ${hashedPassword}, ${salt}) RETURNING "userId", role`;
        
        if(user == null) return {message: "Unable to register account. User NULL!"}
        if(alterUserSession) await createUserSession(user[0], await cookies())
        redirect("/dashboard");
    }
    catch(error){
        throw error;
        return {message: `Unable to register account ${error}`};
    }
}

export type DatabaseUser = {
    userId: number,
    email: string,
    password: string,
    salt: string,
    role: "basic" | "blog",
}

export async function signIn(prevState: userMessageSchema, unsafeData: FormData): Promise<userMessageSchema>{
    const { success, data, error } = UserSchema.safeParse({
        email: unsafeData.get("email"),
        password: unsafeData.get("password")
    })

    if(!success) return { message: "Unable to log you in.", errors: error.flatten().fieldErrors};

    const user = await sql<DatabaseUser[]>`SELECT * FROM users WHERE "email"=${data.email}`;

    if(user.length==0) return {message: "Unable to log you in."}

    const isCorrectPassword = await comparePasswords({
        hashedPassword: user[0].password,
        password: data.password,
        salt: user[0].salt
    })

    if(!isCorrectPassword) return { message: "Unable to log you in."}

    await createUserSession({ userId: user[0].userId.toString(), role: user[0].role }, await cookies());

    redirect("/dashboard")
    return {message: "Logging you in."}
}

export async function logOut(){
    await removeUserFromSesssion(await cookies())
    redirect("/")
}