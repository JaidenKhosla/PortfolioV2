import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { encryptPassword } from "./login";
import { compare } from "bcrypt";

const config = {
    providers: [
        Credentials({
            credentials: {
                email: {label: "Email", type: "text", placeholder: "johnDoe@gmail.com"},
                password: {label: "Password", type: "password", placeholder: "johndoe123!"}
            },
            authorize: async (credentials) => {
                let user = {id: 1, email: process.env.DASHBOARD_EMAIL};

                const hashedPassword = await encryptPassword(String(credentials.password));

                const res = await compare(process.env.DASHBOARD_PASSWORD!, hashedPassword)

                if(user.email===credentials.email && res){
                    return user;
                }
            }
        })
    ]
} satisfies NextAuthConfig