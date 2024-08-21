import React from 'react'
import { twMerge } from 'tailwind-merge'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { FiChevronDown } from 'react-icons/fi'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode
  validation?: RegisterOptions
}

interface DropdownContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DropdownContext = React.createContext<
  DropdownContextProps | undefined
>(undefined)

const Dropdown = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, validation, className, ...props }, ref) => {
    const { register, setValue, getFieldState, getValues } = useFormContext()
    const [open, setOpen] = React.useState<boolean>(false)

    const registration = register(props.name!, validation)

    return (
      <DropdownContext.Provider value={{ open, setOpen }}>
        <div className="relative">
          <button
            type="button"
            className={`hover:has-[:placeholder-shown]:border-darkblue-900 focus:has-[:placeholder-shown]:border-darkblue-700 flex w-full items-center rounded-sm border bg-neutral-100 px-3 py-2 outline-none has-[:disabled]:cursor-default has-[:disabled]:border-neutral-300 has-[:disabled]:bg-[#eeeeee] has-[:disabled]:bg-opacity-30 ${open ? (getFieldState(props.name!).error ? 'border-danger-700 has-[:placeholder-shown]:border-darkblue-700' : 'border-darkblue-700') : getFieldState(props.name!).error ? 'border-danger-700 has-[:placeholder-shown]:border-danger-700 focus:has-[:placeholder-shown]:border-danger-700' : 'border-neutral-700 has-[:placeholder-shown]:border-neutral-300'}`.trim()}
            onClick={() => {
              setOpen(!open)
              if (
                open &&
                (!getValues(props.name!) || getValues(props.name!) === '')
              ) {
                setValue(props.name!, '', {
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }
            }}
          >
            <input
              type="text"
              {...registration}
              tabIndex={-1}
              autoComplete="off"
              className={twMerge(
                'pointer-events-none w-full cursor-pointer text-xs font-light text-neutral-700 outline-none placeholder:text-neutral-500 disabled:cursor-default disabled:placeholder:text-neutral-300',
                className
              )}
              readOnly
              ref={(e) => {
                registration.ref(e)
                if (ref) {
                  if (typeof ref === 'function') {
                    ref(e)
                  } else {
                    ;(
                      ref as React.MutableRefObject<HTMLInputElement | null>
                    ).current = e
                  }
                }
              }}
              {...props}
            />
            <FiChevronDown
              className={`min-w-4 text-neutral-500 transition-transform duration-300 ease-in-out ${open ? 'rotate-180' : ''}`.trim()}
            />
          </button>
          {open && (
            <div className="shadow-high absolute z-[1] mt-2 w-full rounded-sm bg-neutral-100">
              {children}
            </div>
          )}
        </div>
      </DropdownContext.Provider>
    )
  }
)

export default Dropdown
