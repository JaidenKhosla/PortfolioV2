import type { NextAuthConfig } from "next-auth";
import { pages } from "next/dist/build/templates/app-page";

export const authConfig = {
    pages: {
        signIn: "/login"
    },
    callbacks : {
        authorized({ auth, request: { nextUrl }}){
            const isLoggedIn = !!auth?.user
            const isInAuthPage = nextUrl.pathname.startsWith("/admin")

            if(isInAuthPage){
                if(isLoggedIn) return true;
                return false;
            }

            return true;
        }
    },
    providers: []
} satisfies NextAuthConfig