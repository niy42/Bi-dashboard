"use client";

import { useState } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        name,
        callbackUrl: "/dashboard",
      }, { nextauth: "signup" });
      console.log("SignIn result:", result);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-[var(--form-background)] text-[var(--text-color)]">
        <Typography variant="h5" className="text-2xl font-bold mb-6 text-center">
          Register
        </Typography>
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: "var(--text-color)" } }}
          inputProps={{ style: { color: "var(--text-color)" } }}
          error={!!error && !name}
          disabled={loading}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: "var(--text-color)" } }}
          inputProps={{ style: { color: "var(--text-color)" } }}
          error={!!error && (!email || !/\S+@\S+\.\S+/.test(email))}
          disabled={loading}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: "var(--text-color)" } }}
          inputProps={{ style: { color: "var(--text-color)" } }}
          error={!!error && (!password || password.length < 6)}
          disabled={loading}
        />
        {error && (
          <Typography className="text-red-500 text-sm mt-2 text-center">{error}</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          fullWidth
          className="mt-6 relative top-2"
          disabled={loading}
        >
          {loading ? (
            <div className={`flex items-center justify-center ${theme === "dark" ? "text-amber-100" : "text-gray-900"}`}>
              <CircularProgress size={24} color="inherit" className="mr-2" />
              Registering...
            </div>
          ) : (
            "Register"
          )}
        </Button>
        <Typography className="relative top-4 text-center flex justify-center gap-2">
          Already have an account?
          <a href="/" className="hover:underline">
            Login
          </a>
        </Typography>
      </div>
    </div>
  );
}