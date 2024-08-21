import React from "react";
import { useFormContext } from "react-hook-form";
import { DropdownContext } from "./Dropdown";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DropdownOption = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, name, value, ...props }, ref) => {
    const { getValues, setValue } = useFormContext();
    const context = React.useContext(DropdownContext);

    if (!context) {
      throw new Error(
        "DropdownOption component must be used within Dropdown component"
      );
    }
    const { setOpen } = context;

    return (
      <button
        className={twMerge(
          `w-full px-3 py-2 text-left font-display text-xs hover:bg-neutral-300 ${getValues(name!) === value ? "bg-limegreen-100 font-medium text-darkblue-700" : "font-light text-neutral-700"}`,
          className
        )}
        type="button"
        ref={ref}
        onClick={() => {
          setOpen(false);
          setValue(name!, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default DropdownOption;
