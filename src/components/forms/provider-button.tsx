"use client";
import React from "react";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { auth } from "@/auth";
import { register } from "@/lib/actions/register";
import toast from "react-hot-toast";

export default function ProviderButton() {
  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex items-center w-full justify-center gap-x-2">
      <Button
        className="w-full text-gray-500"
        variant="outline"
        type="button"
        onClick={() => onClick("google")}
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-4 w-4 "
        >
          <title>Google</title>
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
        {/* Google */}
      </Button>
      <Button
        className="w-full text-gray-500"
        variant="outline"
        type="button"
        onClick={() => onClick("github")}
      >
        <Github className="mr-2 h-4 w-4" />
        {/* Github */}
      </Button>
    </div>
  );
}
