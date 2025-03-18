import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect to login page if not authenticated
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Protect /dashboard and all subpaths
};