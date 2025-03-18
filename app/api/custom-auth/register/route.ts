// Custom route for registering a new user
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "users.json");

const readUsers = (): { id: string; email: string; password: string; name: string }[] => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeUsers = (users: any[]) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
};

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    let users = readUsers();
    if (users.some((user) => user.email === email)) {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 400 });
    }

    const id = email;
    users.push({ id, email, password, name });

    writeUsers(users);

    return NextResponse.json({ success: true, user: { id, email, name } });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to register user" }, { status: 500 });
  }
}
