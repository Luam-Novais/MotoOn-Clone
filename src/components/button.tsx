import { SpinnerWithButton } from "./spinner";

interface ButtonProps {
  children: React.ReactNode;
  loadingState?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: ()=>void
  type: 'submit' | 'reset' | 'button' | undefined;
}
export function Button({ children, loadingState, type, className, disabled, onClick}: ButtonProps) {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={` py-2 px-6 bg-linear-to-b text-amber-950 font-medium from-amber-300 to-amber-600 shadow-xl rounded-xl justify-center items-center flex gap-8 ${className}`}>
      {children} {loadingState ? <SpinnerWithButton /> : ''}
    </button>
  );
}
