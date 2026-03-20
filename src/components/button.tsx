import { SpinnerWithButton } from "./spinner";
export function Button({ children, loadingState }: { children: React.ReactNode; loadingState: boolean }) {
  return(
     <button 
     className="py-2 px-6 bg-linear-to-b text-amber-950 font-medium from-amber-300 to-amber-600 shadow-xl rounded-md justify-center items-center flex gap-6">
        {children} {loadingState ? <SpinnerWithButton/>: ''}
     </button>
  )
}
