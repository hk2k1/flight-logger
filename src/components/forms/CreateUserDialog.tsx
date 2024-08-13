"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createUser } from "@/lib/actions/user.action";
import { UserSchema } from "@/lib/validation/schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RegisterForm from "./register-form";

type UserFormData = z.infer<typeof UserSchema>;

export function CreateUserDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      await createUser(data);
      toast({
        title: "Success",
        description: "User created successfully",
      });
      setOpen(false);
      form.reset();
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">New User</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Enter the details for the new user. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <RegisterForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
