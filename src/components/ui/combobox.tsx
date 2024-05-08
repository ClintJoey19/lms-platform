"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  choices: {
    value: string;
    label: string;
  }[];
  value?: string;
  label: string;
  onChange: (value: string) => void;
}

const Combobox = ({ choices, value, label, onChange }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? choices.find((choice) => choice.value === value)?.label
            : `Select ${label}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Select ${label}...`} />
          <CommandEmpty>No {label} found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {choices.map((choice) => (
                <CommandItem
                  key={choice.value}
                  value={choice.value}
                  onSelect={() => {
                    onChange(choice.value === value ? "" : choice.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === choice.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {choice.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
