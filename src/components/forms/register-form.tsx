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
import { RegisterSchema } from "@/lib/validation/schema";
import { register } from "@/lib/actions/register";
import { useTransition } from "react";
import toast from "react-hot-toast";

// const formSchema = z.object({
//   email: z.string().email({ message: "Enter a valid email address" }),
// });

type UserFormValue = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const defaultValues = {
    email: "",
    password: "",
    name: "",
  };
  const [isPending, startTransition] = useTransition();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  const onSubmit = async (values: UserFormValue) => {
    startTransition(() => {
      register(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }
        toast.success("User Registered!");
      });
    });
    // { ...  signIn form action } TODO
    // signIn("credentials", {
    //   email: data.email,
    //   callbackUrl: callbackUrl ?? "/dashboard",
    // });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name..."
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
            Continue With Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex items-center w-full justify-center gap-x-2">
        <Button
          className="w-full text-gray-500"
          variant="outline"
          type="button"
          // onClick={() =>
          //   signIn("github", { callbackUrl: callbackUrl ?? "/dashboard" })
          // }
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
          // onClick={() =>
          //   signIn("github", { callbackUrl: callbackUrl ?? "/dashboard" })
          // }
        >
          <Github className="mr-2 h-4 w-4" />
          {/* Github */}
        </Button>
      </div>
      <BackButton href="/login" label="Already have an account?" />
    </>
  );
}
