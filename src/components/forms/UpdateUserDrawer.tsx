"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UserSchema } from "@/lib/validation/schema";
import { updateUser } from "@/lib/actions/user.action";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserFormData = z.infer<typeof UserSchema>;

interface UpdateUserDrawerProps {
  user: UserFormData & { id: string };
  children: React.ReactNode;
}

export function UpdateUserDrawer({ user, children }: UpdateUserDrawerProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: user,
  });
  const router = useRouter();

  const onSubmit = async (data: UserFormData) => {
    try {
      console.log("Updating user:", user);
      await updateUser(user.id, data);
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update User</DrawerTitle>
          <DrawerDescription>
            Make changes to the user here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 p-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register("name")} />
              {errors.name && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" className="col-span-3" {...register("email")} />
              {errors.email && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("role", value as "user" | "admin")
                }
                defaultValue={user.role}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>
          <DrawerFooter>
            <Button type="submit">Save changes</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
