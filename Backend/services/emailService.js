import path from "path";
import fs from "fs";
import mustache from "mustache";
import sendEmail from "../providers/smtp.js"

const configEmail = async (emailFor, content) => {
    try {

        const template = fs.readFileSync(path.resolve(`templates/${emailFor}.html`), "utf8")
        const body = mustache.render(template, content.body)

        const email = {...content, body};

        sendEmail(email);
    } catch (err) {
        throw err
    }
}

export const accountVerification =  (user) => {
    try {
        const emailContent = {
            toMail:user.email,
            subject:"Welcome to Web Chat - Verify Your Email Address",
            body:{
                name: ((user?.profile?.firstName || "") + (user?.profile?.lastName || "")) ||  "User",
                verificationLink:"http://localhost:4200/auth/email-confirmation?token="+user.verificationToken,
            }
        }

        configEmail("user-verification", emailContent)

    } catch (err) {
        throw err
    }
}

export const accountForgotPassword =  (user) => {
    try {
        const emailContent = {
            toMail:user.email,
            subject:"Welcome to Web Chat - Forgot Password",
            body:{
                name: ((user?.profile?.firstName || "") + (user?.profile?.lastName || "")) || "User",
                verificationLink:"http://localhost:4100/auth/reset-password?token="+user.verificationToken,
            }
        }

        configEmail("forgot-password", emailContent)

    } catch (err) {
        throw err
    }
}

