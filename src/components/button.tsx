import { SpinnerWithButton } from './spinner';

interface ButtonProps {
  children: React.ReactNode;
  loadingState?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button' | undefined;
}
export function Button({ children, loadingState, type, className, disabled, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={`p-4 shadow-xl rounded-xl justify-center items-center flex gap-4 text-[1.125rem] font-semibold ${disabled ? 'disabled bg-dark opacity-40' : ' bg-linear-to-b text-amber-950 from-amber-300 to-amber-600 '} ${className}`}>
      {children} {loadingState ? <SpinnerWithButton/> : ''}
    </button>
  );
}
