import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import UserAuthForm from "@/components/forms/user-auth-form";
import { Plane, PlaneLanding, PlaneTakeoff } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login",
    description: "Login",
  };
}

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 hidden md:right-8 md:top-8"
        )}
      >
        Login
      </Link>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900"></div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <PlaneTakeoff className="mr-2 h-6 w-6" />
          FlightLogger
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              FlightLogger Assessment - A web application to track flight logs.
            </p>
            <footer className="text-sm">Made by Harsha</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
