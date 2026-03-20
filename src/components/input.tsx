import {useState} from 'react'
import { EyeClosed, Eye } from 'lucide-react'
interface InputProps{
    label: string
    type: string
    
}
export function Input({label, type}: InputProps){
   return (
     <span className="input-container min-w-full rounded-md shadow-md shadow-black/40">
       <label htmlFor="">{label}</label>
       <input type={type} className="rounded-md"/>
     </span>
   );
}
export function InputPassword({ label, type }: InputProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    function handleVisibilityButton() {
      setIsVisible((prev) => !prev);
    }
  return (
    <span className="input-container min-w-full rounded-md shadow-md shadow-black/40">
      <label htmlFor="">{label}</label>
      <span className="relative h-full">
        <input type={isVisible ? 'text' : 'password'} className="rounded-md" />
        <button type="button" className="absolute right-2 top-3" onClick={handleVisibilityButton}>
          {isVisible ? <EyeClosed color="#777" size={20} /> : <Eye color="#777" size={20} />}
        </button>
      </span>
    </span>
  );
}