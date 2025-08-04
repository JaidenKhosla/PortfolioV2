"use server"

import { cookies } from "next/headers";
import { cache } from "react"
import { getUserFromSesssion } from "./session";

export const getCurrentUser = cache(async () => {
    return await getUserFromSesssion(await cookies());
})