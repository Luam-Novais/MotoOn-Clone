'use client';
import { BellDot } from 'lucide-react';
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
      {children} {loadingState ? <SpinnerWithButton /> : ''}
    </button>
  );
}
interface ButtonProps {
  children: React.ReactNode;
  loadingState?: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  active?: boolean;
}

export function ButtonFilter({ children, loadingState, type = 'button', onClick, active }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        group flex min-w-fit items-center justify-center gap-2
        rounded-xl border px-5 py-3
        text-sm font-medium uppercase tracking-wide
        whitespace-nowrap transition-all duration-200

        ${
          active
            ? `
              border-amber-500/30
              bg-amber-500/15
              text-amber-400
              shadow-md shadow-amber-500/10
            `
            : `
              border-zinc-800
              bg-zinc-950/80
              text-zinc-400
              hover:border-zinc-700
              hover:bg-zinc-900
              hover:text-zinc-200
            `
        }
      `}
    >
      {children}

      {loadingState && <SpinnerWithButton />}
    </button>
  );
}
export function ButtonEnableNotification({onOpen}: {onOpen: ()=> void}){
  return (
    <div className="flex p-4">
      <button className="flex relative items-center gap-2 text-xl" onClick={onOpen}>
        Ativar as Notificações <BellDot size={20} />
        <span className="absolute top-0 left-0 flex size-2 -z-10">
          <span className="absolute inline-flex h-full  w-full  animate-ping rounded-full bg-amber-500 opacity-100"></span>
          <span className="inline-flex size-2 rounded-full bg-amber-500"></span>
        </span>
      </button>
    </div>
  );
}