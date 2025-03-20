"use client";

import { useState, useEffect } from "react";
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
        redirect: false,
        email,
        password,
        keepLoggedIn,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div
        className="w-full max-w-md space-y-6 p-6 sm:p-8 rounded-lg shadow-lg bg-[var(--form-background)] text-[var(--text-color)]"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Typography
          variant="h5"
          className="text-xl sm:text-2xl font-bold text-center"
          data-aos="fade-in"
          data-aos-delay="200"
        >
          Login
        </Typography>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: { color: "var(--text-color)" },
              shrink: true
            }}
            inputProps={{
              style: { color: "var(--text-color)" },
              autoCapitalize: "none"
            }}
            error={!!error && (!email || !/\S+@\S+\.\S+/.test(email))}
            disabled={loading}
            className="bg-[var(--input-background)]"
            data-aos="fade-up"
            data-aos-delay="300"
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: { color: "var(--text-color)" },
              shrink: true
            }}
            inputProps={{ style: { color: "var(--text-color)" } }}
            error={!!error && (!password || password.length < 6)}
            disabled={loading}
            className="bg-[var(--input-background)]"
            data-aos="fade-up"
            data-aos-delay="400"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                disabled={loading}
                sx={{
                  color: "var(--text-color)",
                  '&.Mui-checked': {
                    color: "primary",
                  },
                }}
              />
            }
            label="Keep me logged in"
            className="text-[var(--text-color)]"
            data-aos=""
            data-aos-delay="500"
          />

          {error && (
            <Typography
              className="text-red-500 text-sm text-center"
              data-aos="fade-in"
              data-aos-delay="600"
            >
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handleLogin}
            fullWidth
            disabled={loading}
            sx={{
              mt: 0.5,
              py: 1.5,
              backgroundColor: "primary",
              '&:hover': {
                backgroundColor: "primary.dark",
              },
            }}
            data-aos=""
            data-aos-delay="700"
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

          <Typography
            className="relative top-3 text-center text-sm flex justify-center gap-1"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            Don’t have an account?
            <a
              href="/register"
              className="text-[var(--primary-color)] hover:underline"
            >
              Register
            </a>
          </Typography>
        </form>
      </div>
    </div>
  );
}