"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/actions/user.action";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin"]),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      role: (session?.user?.role as "user" | "admin") || "user",
    },
  });

  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name || "");
      setValue("email", session.user.email || "");
      setValue("role", (session.user.role as "user" | "admin") || "user");
    }
  }, [session, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      if (!session?.user?.id) {
        throw new Error("User ID not found");
      }
      await updateUser(session.user.id, data);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[300px]">
          <CardContent className="flex flex-col items-center p-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">
              Loading profile...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="w-[300px]">
          <AlertTitle>Session has not loaded properly</AlertTitle>
          <AlertDescription>Please refresh your page.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/30">
      <div className="border shadow-sm rounded-lg w-full max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your profile information.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("role", value as "user" | "admin")
                  }
                  defaultValue={session.user.role as string}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
