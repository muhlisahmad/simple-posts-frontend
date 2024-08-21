import React from 'react'
import { twMerge } from 'tailwind-merge'
import { RegisterOptions, useFormContext } from 'react-hook-form'

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  validation?: RegisterOptions
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ validation, className, ...props }, ref) => {
    const { register } = useFormContext()

    const registration = register(props.name!, validation)

    return (
      <textarea
        {...registration}
        className={twMerge(
          'hover:border-darkblue-900 focus:border-darkblue-700 w-full rounded-sm border border-neutral-700 bg-neutral-100 px-3 py-2 text-xs font-light text-neutral-700 outline-none placeholder:text-neutral-500 placeholder-shown:border-neutral-300 disabled:border-neutral-300 disabled:bg-[#eeeeee] disabled:bg-opacity-30 disabled:placeholder:text-neutral-300',
          className
        )}
        ref={(e) => {
          registration.ref(e)
          if (ref) {
            if (typeof ref === 'function') {
              ref(e)
            } else {
              ;(
                ref as React.MutableRefObject<HTMLTextAreaElement | null>
              ).current = e
            }
          }
        }}
        {...props}
      />
    )
  }
)

export default TextArea
