"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Github } from "lucide-react";
import BackButton from "../back-button";
import { LoginSchema } from "@/lib/validation/schema";
import { login } from "@/lib/actions/login";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { on } from "events";
import ProviderButton from "./provider-button";

// const formSchema = z.object({
//   email: z.string().email({ message: "Enter a valid email address" }),
// });

type UserFormValue = z.infer<typeof LoginSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const defaultValues = {
    email: "",
    password: "",
  };
  const [isPending, startTransition] = useTransition();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const onSubmit = async (values: UserFormValue) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
          return;
        }
        toast.success("Logged In!");
      });
    });
    // { ...  signIn form action } TODO
    // signIn("credentials", {
    //   email: data.email,
    //   callbackUrl: callbackUrl ?? "/dashboard",
    // });
  };

  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="*******"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="ml-auto w-full" type="submit">
            Login With Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or login with
          </span>
        </div>
      </div>
      <ProviderButton />
      <BackButton href="/register" label="Don't have an account?" />
    </>
  );
}
