import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer'

// Handles POST requests to /api




export async function POST(request: Request) {

    const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
    const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;
    console.log("dealing with request")
    debugger
    const formData = await request.json()
    const {name,email,message} = formData

    // create transporter object
    const transporter = nodemailer.createTransport({
        host: "smtp.mailersend.net",
        port: 587,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },

        auth: {

            user: username,
            pass: password
        }
    });

    try {
        console.log('mailwa')
        const mail = await transporter.sendMail({
            from: username,
            to: myEmail,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: ${message} </p>
            `,
        })
        
        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        debugger
        console.log(error)
        return NextResponse.json(
            { error },
            {
              status: 500,
            }
          );
    }


}