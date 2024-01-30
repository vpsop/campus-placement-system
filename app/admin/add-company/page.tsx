"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddCompanySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import addCompany from "@/firebase/firestore/addCompany";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function AddCompany() {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof AddCompanySchema>>({
    resolver: zodResolver(AddCompanySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddCompanySchema>) => {
    const data = AddCompanySchema.safeParse(values);
    if (data.success) {
      startTransition(async () => {
        try {
          await addCompany(data.data.name, data.data.description);
          router.push("/admin/display-companies");
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  return (
    <div className="flex items-start justify-center w-full h-full pt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[500px]"
        >
          <div className="space-y-8">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Eg. Google"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Company description (minimum 100 characters)"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <span>Add Company</span>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}


