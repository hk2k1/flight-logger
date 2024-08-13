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
import { FlightLogSchema } from "@/lib/validation/schema";
import { updateFlightLog } from "@/lib/actions/flightlog.action";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Types } from "mongoose";
import { z } from "zod";

type FlightLogFormData = z.infer<typeof FlightLogSchema>;

interface UpdateFlightLogDrawerProps {
  flightLog: FlightLogFormData & { fid: string };
  children: React.ReactNode;
}

export function UpdateFlightLogDrawer({
  flightLog,
  children,
}: UpdateFlightLogDrawerProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlightLogFormData>({
    resolver: zodResolver(FlightLogSchema),
    defaultValues: flightLog,
  });
  const router = useRouter();

  const onSubmit = async (data: FlightLogFormData) => {
    console.log("flightLog", flightLog);
    try {
      await updateFlightLog(flightLog.fid, data);
      toast({
        title: "Success",
        description: "Flight log updated successfully",
      });
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating flight log:", error);
      toast({
        title: "Error",
        description: "Failed to update flight log",
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update Flight Log</DrawerTitle>
          <DrawerDescription>
            Make changes to your flight log here.
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 p-4">
            {Object.entries(flightLog).map(([key, value]) => {
              if (key === "_id" || key === "email" || key === "fid")
                return null;
              return (
                <div key={key} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={key} className="text-right capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <Input
                    id={key}
                    className="col-span-3"
                    {...register(key as keyof FlightLogFormData)}
                  />
                  {errors[key as keyof FlightLogFormData] && (
                    <p className="col-span-3 col-start-2 text-sm text-red-500">
                      {errors[key as keyof FlightLogFormData]?.message}
                    </p>
                  )}
                </div>
              );
            })}
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
