import { Toaster as RadixToaster } from "@radix-ui/react-toast"
import { ToasterProps } from "@radix-ui/react-toast"

export function Toaster({ ...props }: ToasterProps) {
  return <RadixToaster {...props} />
}
