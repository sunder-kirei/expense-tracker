"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PatchUserInterface, PatchUserSchema } from "@/schema/PatchUser.schema";
import { usePatchUserMutation } from "@/store/services/api";
import { GetUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Currency, getAllISOCodes } from "iso-country-currency";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  user: GetUser;
}

function getCountryAndSymbol(country?: Currency) {
  if (!country) return "Select locale...";
  return country.symbol + " \u2022 " + country.countryName;
}

export function EditUserForm({ user }: Props) {
  const isoCodes = useMemo(() => getAllISOCodes(), [getAllISOCodes]);
  const [patchUser] = usePatchUserMutation();
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm<PatchUserInterface>({
    resolver: zodResolver(PatchUserSchema),
    defaultValues: {
      locale: user.locale ?? undefined,
      name: user.name ?? undefined,
    },
  });

  function onSubmit({ locale, name }: PatchUserInterface) {
    if (locale === user.locale && name === user.name) {
      toast.info("No change.");
      return;
    }
    setIsDisabled(true);
    toast.promise(patchUser({ locale, name }).unwrap(), {
      loading: "Updating profile...",
      success: (data) => {
        return `Profile updated successfully😎`;
      },
      error: () => `Something went wrong🥲`,
      finally: () => {
        setIsDisabled(false);
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-72 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="locale"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country and Currency</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? getCountryAndSymbol(
                            isoCodes.find(({ iso }) => field.value === iso)
                          )
                        : "Select locale..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Search locale..." />
                    <CommandList className="scrollbar-none">
                      <CommandEmpty>No locale found</CommandEmpty>
                      <CommandGroup>
                        {isoCodes.map((country) => (
                          <CommandItem
                            value={country.countryName}
                            key={country.iso}
                            onSelect={() => {
                              form.setValue("locale", country.iso);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                country.iso === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {country.symbol} &#8226; {country.countryName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Edit</Button>
      </form>
    </Form>
  );
}
