"use client";

import { useState } from "react";
import { TextField, Button, Typography, CircularProgress, FormControlLabel, Checkbox } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
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
        redirect: false, // Prevent automatic redirect
        email,
        password,
        keepLoggedIn,
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push("/dashboard");
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
          Login
        </Typography>
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
        {/* Optional: Add keepLoggedIn checkbox */}
        {/*<div className="flex items-center my-2">
          <input
            type="checkbox"
            id="keepLoggedIn"
            checked={true} // Default value, manage state if needed
            onChange={(e) => console.log("Keep logged in:", e.target.checked)}
          />
          <label htmlFor="keepLoggedIn" className="ml-2 text-[var(--text-color)]">
            Keep me logged in
          </label>
        </div>*/}
        <FormControlLabel
          control={<Checkbox checked={keepLoggedIn} onChange={(e) => setKeepLoggedIn(e.target.checked)} />}
          label="Keep me logged in"
        />
        {error && (
          <Typography className="text-red-500 text-sm mt-2 text-center">{error}</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          className="mt-6 mb-2 relative"
          disabled={loading}
        >
          {loading ? (
            <div className={`flex items-center justify-center ${theme === "dark" ? "text-amber-100" : "text-gray-900"}`}>
              <CircularProgress size={24} color="inherit" className="mr-2" />
              Logging in...
            </div>
          ) : (
            "Login"
          )}
        </Button>
        <Typography className="relative top-3 text-center flex justify-center gap-2">
          Don’t have an account?
          <a href="/register" className="hover:underline">
            Register
          </a>
        </Typography>
      </div >
    </div >
  );
}