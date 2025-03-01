import React from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={twMerge('text-xs font-light text-neutral-700', className)}
        {...props}
      >
        {children}
      </label>
    )
  }
)

export default Label
