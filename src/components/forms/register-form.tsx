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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Github } from "lucide-react";
import BackButton from "../back-button";
import { RegisterSchema } from "@/lib/validation/schema";
import { register } from "@/lib/actions/register";
import { useTransition } from "react";
import toast from "react-hot-toast";
import ProviderButton from "./provider-button";

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
  const router = useRouter();

  const onSubmit = async (values: UserFormValue) => {
    startTransition(() => {
      register(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }
        form.reset();
        router.refresh();
        toast.success("Account Created!");
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
      <ProviderButton />
      <BackButton href="/login" label="Already have an account?" />
    </>
  );
}
