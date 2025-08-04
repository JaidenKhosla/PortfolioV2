import * as zod from "zod";
import crypto from "crypto"
import postgres from "postgres";

const COOKIE_SESSION_ID = "sesssion_key"
const expirationDuration = 60*60*24*7; //in seconds

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

const sessionSchema = zod.object({
    userId: zod.string(),
    role: zod.enum(["basic", "blog"])
})

export type UserSession = zod.infer<typeof sessionSchema>
export type Cookies = {
    set: (
        key: string,
        value: string,
        options: {
            secure?: boolean, 
            httpOnly?: boolean,
            sameSite?: "strict" | "lax",
            expires?: number
        }
    ) => void,

    get: (key: string) => { name: string, value: string} | undefined,
    delete: (key: string) => void
}

export function getUserFromSesssion(cookies: Pick<Cookies, "get">){
    const sessionID = cookies.get(COOKIE_SESSION_ID)?.value
    if(sessionID == null) return null;

    return getUserSessionById(sessionID);
}


export default async function createUserSession(user: UserSession, cookies: Pick<Cookies, "set">){ 
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();
    
    await sql`INSERT INTO sessions ("sessionId", "userId", "role") VALUES (${sessionId}, ${user.userId}, ${user.role})`;

    setCookie(sessionId, cookies)
}

export async function removeUserFromSesssion(cookies: Pick<Cookies, "get" | "delete">){
    const sessionId = cookies.get(COOKIE_SESSION_ID)?.value;

    if(sessionId==null) return null;

    await sql`DELETE FROM sessions WHERE "sessionId"=${sessionId}`;
    cookies.delete(COOKIE_SESSION_ID);
}

export function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
    cookies.set(COOKIE_SESSION_ID, sessionId, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        expires: Date.now() + expirationDuration * 1000
    })
}

async function getUserSessionById(sessionId: string){
    const rawSession = await sql<UserSession[]>`SELECT * FROM sessions WHERE "sessionId"=${sessionId} LIMIT 1`;
   
    const { success, data } = sessionSchema.safeParse(rawSession[0]);

    return success ? data : null;

}