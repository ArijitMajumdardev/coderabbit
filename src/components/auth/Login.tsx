"use client";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { GithubIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleGithubSignIn = async () => {
    setLoading(true);
    try {
      await signIn.social({ provider: "github" });
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 text-primary-foreground"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.33.26 2.6.74 3.77L2 22l6.23-.74C9.4 21.74 10.67 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M8 12h.01" />
              <path d="M12 12h.01" />
              <path d="M16 12h.01" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome to CodeRabbit
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to start reviewing your code with AI
          </p>
        </div>

        <Button
          onClick={handleGithubSignIn}
          disabled={loading}
          className="w-full cursor-pointer"
          size="lg"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <GithubIcon />
          )}
          {loading ? "Signing in..." : "Continue with GitHub"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;