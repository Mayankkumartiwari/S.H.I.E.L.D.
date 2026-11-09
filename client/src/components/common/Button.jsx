import { forwardRef } from 'react'

const Button = forwardRef(function Button({ children, variant = 'primary', className = '', ...props }, ref) {
  return <button ref={ref} className={`btn btn-${variant} ${className}`} {...props}>{children}</button>
})

export default Button
