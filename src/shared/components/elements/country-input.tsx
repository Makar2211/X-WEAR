"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { Input } from "../ui/input";
import { InputProps } from "./custom-input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { CheckIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ICountry {
  id: number;
  code: string;
  name: string;
}

export const CountryInput: React.FC<InputProps & { setValue: any }> = ({
  label,
  errorMessage,
  register,
  className,
  setValue,
}) => {
  const [countries, setCountries] = React.useState<ICountry[] | []>([]);
  const [open, setOpen] = React.useState(false);
  const [contry, setContry] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://xc-countries-api.fly.dev/api/countries/"
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Не удалось получить список стран", error);
        toast.error("Не удалось получить список стран");
      }
    })();
  }, []);
  return (
    <div className={cn("mb-6 relative", className)}>
      <label className="block w-full bg-[#F9F9F9] px-4 rounded relative">
        <span className=" block pt-2 mb-[-10px] text-gray-700">{label}</span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="countrybutton"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between p-0"
            >
              {contry
                ? countries.find((country: ICountry) => country.name === contry)
                    ?.name
                : "Выбрать страну"}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 bg-[#F9F9F9] w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
            <Command>
              <CommandInput placeholder="Найти страну..." className="h-9" />
              <CommandList>
                <CommandEmpty>Не найдена страна.</CommandEmpty>
                <CommandGroup>
                  {countries.map((country: ICountry) => (
                    <CommandItem
                      key={country.id}
                      value={country.name}
                      {...register}
                      onSelect={(currentValue: any) => {
                        setValue("country", currentValue);
                        setContry(currentValue === contry ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {country.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          contry === country.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </label>
      <p className="absolute bottom-[-20px] text-red-600 font-bold ml-1">
        {errorMessage}
      </p>
    </div>
  );
};
