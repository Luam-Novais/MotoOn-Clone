import { useState, useRef, useEffect } from 'react';
import { EyeClosed, Eye, ChevronDown, ChevronUp } from 'lucide-react';
interface InputProps {
  label: string;
  type: string;
}
export function Input({ label, type }: InputProps) {
  return (
    <span className="input-container min-w-full rounded-md shadow-md shadow-black/40">
      <label htmlFor="">{label}</label>
      <input type={type} className="rounded-md" />
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
type Data = {
  desc: string;
  value: string;
};
interface SelectProps {
  data: string[];
  label: string;
}

interface SelectProps {
  data: string[];
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  id?: string;
}

export function Select({ data, label, value, onChange, id = 'select' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  function handleSelect(option: string | null) {
    onChange(option);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2 min-w-full" ref={containerRef}>
      <label className='text-sm' htmlFor={id}>{label}</label>

      <div className={`${isOpen ? 'border-amber-500' : 'border-black'} text-base bg-input px-2 border-2 rounded-md transition-all duration-300 ease-in-out`} role="combobox" aria-expanded={isOpen} aria-controls={`${id}-listbox`}>
        <button id={id} type="button" onClick={toggle} className={`p-2 flex justify-between w-full ${isOpen ? 'border-b-2 border-[#333]' : ''} `}>
          <span>{value ?? 'Escolher'}</span>
          <span>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
        </button>

        {isOpen && (
          <ul id={`${id}-listbox`} role="listbox" className="mt-2">
            {data.map((item) => (
              <li key={item} role="option" aria-selected={value === item} tabIndex={0} className={`p-2 cursor-pointer ${value === item ? 'bg-gray-700' : ''}`} onClick={() => handleSelect(item)}>
                {item}
              </li>
            ))}

            <li role="option" tabIndex={0} className="p-2 text-gray-400 cursor-pointer" onClick={() => handleSelect(null)}>
              Limpar
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}