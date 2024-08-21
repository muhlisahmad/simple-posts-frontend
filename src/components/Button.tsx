import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', ...props }, ref) => {
    const baseClasses = 'rounded-sm px-3 py-2 text-sm font-bold'
    const primaryClasses =
      'bg-darkblue-700 text-neutral-100 hover:bg-darkblue-900 active:bg-darkblue-500 disabled:bg-darkblue-100'
    const successClasses =
      'bg-limegreen-700 text-neutral-100 hover:bg-limegreen-900 active:bg-limegreen-500 disabled:bg-limegreen-100'
    const secondaryClasses =
      'border border-darkblue-700 bg-neutral-100 text-darkblue-700 hover:border-darkblue-900 hover:text-darkblue-900 active:border-darkblue-500 active:text-darkblue-500 disabled:border-darkblue-100 disabled:text-darkblue-100'
    const dangerClasses =
      'border border-danger-700 bg-neutral-100 text-danger-700 hover:border-danger-900 hover:text-danger-900 active:border-danger-500 active:text-danger-500 disabled:border-danger-100 disabled:text-danger-100'

    const variantClasses =
      variant === 'primary'
        ? primaryClasses
        : variant === 'secondary'
          ? secondaryClasses
          : variant === 'success'
            ? successClasses
            : dangerClasses

    return (
      <button
        ref={ref}
        {...props}
        className={twMerge(baseClasses, variantClasses, className)}
      >
        {children}
      </button>
    )
  }
)

export default Button
