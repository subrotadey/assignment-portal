import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        // Validation
        console.log(reqBody);

        
        // Optional: Validate input fields here (basic example)
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }
        
        const existingUser = await User.findOne({email})

        if(existingUser) {
            return NextResponse.json({error: "User already exist"}, {status: 400})
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt )

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        const userId = savedUser._id

        // send verification email
        await sendEmail({email, emailType: "VERIFY", userId: userId})


        // Continue with user creation logic here...
    return NextResponse.json({ 
        message: "User Registered Successfully",
        success: true,
        savedUser
     }, { status: 200 });


    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
