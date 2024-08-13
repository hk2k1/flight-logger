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
import { createFlightLog } from "@/lib/actions/flightlog.action";
import { FlightLogSchema } from "@/lib/validation/schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type FlightLogFormData = z.infer<typeof FlightLogSchema>;

export function CreateFlightLogDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<FlightLogFormData>({
    resolver: zodResolver(FlightLogSchema),
    defaultValues: {
      tailNumber: "",
      flightID: "",
      takeoff: "",
      landing: "",
      duration: "",
    },
  });

  const onSubmit = async (data: FlightLogFormData) => {
    try {
      await createFlightLog(data);
      toast({
        title: "Success",
        description: "Flight log created successfully",
      });
      setOpen(false);
      form.reset();
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tailNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tail Number</FormLabel>
                  <FormControl>
                    <Input placeholder="N12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="flightID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flight ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ID12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="takeoff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Takeoff Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Singapore" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="landing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landing Location</FormLabel>
                  <FormControl>
                    <Input placeholder="North Korea" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2h 30m" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save Flight Log
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
