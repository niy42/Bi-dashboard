"use client";

import { useState, useEffect } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

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

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
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
          Register
        </Typography>

        <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-4">
          <TextField
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: { color: "var(--text-color)" },
              shrink: true
            }}
            inputProps={{ style: { color: "var(--text-color)" } }}
            error={!!error && !name}
            disabled={loading}
            className="bg-[var(--input-background)]"
            data-aos="fade-up"
            data-aos-delay="300"
          />

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
            data-aos-delay="400"
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
            onClick={handleRegister}
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: "primary",
              '&:hover': {
                backgroundColor: "primary.dark",
              },
            }}
            data-aos=""
            data-aos-delay=""
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

          <Typography
            className="relative top-3 text-center text-sm flex justify-center gap-1"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            Already have an account? {" "}
            <a
              href="/"
              className="text-[var(--primary-color)] hover:underline"
            >
              Login
            </a>
          </Typography>
        </form>
      </div>
      <Typography
        variant="body2"
        className="absolute bottom-4 left-4 text-[var(--text-color)] text-xs sm:text-sm opacity-75"
        data-aos="fade-right"
        data-aos-delay="900"
      >
        Made with ❤️ from Adeniyi
      </Typography>
    </div>
  );
}