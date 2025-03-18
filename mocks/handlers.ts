// Next-auth handles api calls authomatically ...

/*import { rest } from "msw";

interface User {
    email: string;
    password: string;
    name: string;
}

let users: User[] = [];

export const handlers = [
    rest.post("/api/register", (req: any, res: any, ctx: any) => {
        const { email, password, name } = req.body;
        if (users.some((u) => u.email === email)) {
            return res(ctx.status(400), ctx.json({ error: "Email already exists" }));
        }
        users.push({ email, password, name });
        return res(ctx.json({ email, name }));
    }),

    rest.post("/api/login", (req: any, res: any, ctx: any) => {
        const { email, password } = req.body;
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
            return res(ctx.status(401), ctx.json({ error: "Invalid credentials" }));
        }
        return res(ctx.json({ email, name: user.name }));
    }),
];
*/