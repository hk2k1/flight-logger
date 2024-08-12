"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
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
import { Label } from "@/components/ui/label";
import { createFlightLog } from "@/lib/actions/flightlog.action";

import { FlightLogSchema } from "@/lib/validation/schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type FlightLogFormData = z.infer<typeof FlightLogSchema>;

export function CreateFlightLogDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FlightLogFormData>({
    resolver: zodResolver(FlightLogSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: FlightLogFormData) => {
    try {
      await createFlightLog(data);
      // toast.success("Flight log created successfully");
      toast({
        title: "Success",
        description: "Flight log created successfully",
      });
      setOpen(false);
      reset();
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create flight log",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">New Flight Log</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Flight Log</DialogTitle>
          <DialogDescription>
            Enter the details for the new flight log. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tailNumber" className="text-right">
                Tail Number
              </Label>
              <Input
                id="tailNumber"
                className="col-span-3"
                placeholder="N12345"
                {...register("tailNumber")}
              />
              {errors.tailNumber && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.tailNumber.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="flightID" className="text-right">
                Flight ID
              </Label>
              <Input
                id="flightID"
                className="col-span-3"
                placeholder="ID12"
                {...register("flightID")}
              />
              {errors.flightID && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.flightID.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="takeoff" className="text-right">
                Takeoff Location
              </Label>
              <Input
                id="takeoff"
                className="col-span-3"
                placeholder="Singapore"
                {...register("takeoff")}
              />
              {errors.takeoff && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.takeoff.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="landing" className="text-right">
                Landing Location
              </Label>
              <Input
                id="landing"
                className="col-span-3"
                placeholder="North Korea"
                {...register("landing")}
              />
              {errors.landing && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.landing.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                id="duration"
                className="col-span-3"
                placeholder="e.g., 2h 30m"
                {...register("duration")}
              />
              {errors.duration && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Flight Log</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
