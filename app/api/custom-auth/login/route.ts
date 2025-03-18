// Custom api route for user login
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the path to the users.json file
const filePath = path.join(process.cwd(), "users.json");

// Read users from the JSON file
const readUsers = (): { id: string; email: string; password: string; name: string }[] => {
  if (!fs.existsSync(filePath)) {
    console.log("users.json does not exist, returning empty array");
    return [];
  }
  const data = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(data);
  console.log("Loaded users:", users); // Debug log
  return users;
};

export async function POST(req: Request) {
  try {
    console.log("Received login request"); // Debug log
    const { email, password } = await req.json();
    console.log("Request body:", { email, password }); // Debug log

    if (!email || !password) {
      console.log("Validation failed: Missing email or password");
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const users = readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      console.log("User not found for email:", email);
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    console.log("Found user:", user); // Debug log
    if (user.password !== password) {
      console.log("Password mismatch for user:", email);
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    console.log("Login successful for user:", user.email); // Debug log
    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Error in login process:", error);
    return NextResponse.json(
      { success: false, error: "Failed to login user" },
      { status: 500 }
    );
  }
}