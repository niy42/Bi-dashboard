"use server";

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
// import fs from "fs/promises"; // Use fs.promises for async file operations
// import path from "path";

// const filePath = path.join(process.cwd(), "users.json");
const prisma = new PrismaClient();

// Function to read users asynchronously (File-based, now commented out)
// const readUsers = async (): Promise<{ id: string; email: string; password: string; name: string }[]> => {
//     try {
//         const data = await fs.readFile(filePath, "utf8");
//         return JSON.parse(data);
//     } catch (error) {
//         return []; // Return empty array if file does not exist
//     }
// };

// Function to write users asynchronously (File-based, now commented out)
// const writeUsers = async (users: any[]) => {
//     await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8");
// };

// Register user (using Prisma)
export const registerUser = async (email: string, password: string, name: string) => {
    // let users = await readUsers(); // Commented out file-based logic

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword, // Store hashed password
            name,
        },
    });

    console.log("User registered:", newUser);
    return newUser;
};

// Authenticate user (using Prisma)
export const authenticateUser = async (email: string, password: string) => {
    console.log("Authenticate called with:", { email, password });

    // let users = await readUsers(); // Commented out file-based logic
    // console.log("Users array in authenticate:", users);

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.log("User not found");
        return null;
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log("Invalid password");
        return null;
    }

    console.log("User authenticated:", user);
    return { id: user.id, email: user.email, name: user.name };
};