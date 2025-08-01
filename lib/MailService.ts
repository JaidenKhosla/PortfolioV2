"use server"

import { NextResponse, NextRequest } from "next/server";
import nodeMailer from "nodemailer"; 
import * as zod from "zod";

const transporter = nodeMailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME!,
        pass: process.env.GMAIL_APP_PASSWORD!
    }
})

const emailSchema = zod.object({
    name: zod.string().nonempty("Please input a name."),
    email: zod.email("Please input a valid email."),
    message: zod.string().nonempty("Please input a message.")
})

export type returnSchema = {
    msg?: string|null;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
}

export default async function sendToMe(prevState: returnSchema, formData: FormData): Promise<returnSchema>{

    const parsed = emailSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
    })

    if(parsed.error) return {
        errors: parsed.error.flatten().fieldErrors,
        msg: "Failed to send email. Please check your input fields."
    };

    const parsedFormData = parsed.data;

    const info = await transporter.sendMail({
        from: `Jaiden Khosla's Bot <${process.env.SMTP_USERNAME!}>`,
        to: `jaiden@khosla.io`,
        subject: `Message from ${parsedFormData.name}`,
        text: `REPLY EMAIL: ${parsedFormData.email}\n\n\n${parsedFormData.message}`
    });

    return {
        msg: "Email Sent Succesfully!"
    }
}