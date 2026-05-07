import { useState, useRef, useEffect } from 'react';
import { EyeClosed, Eye, ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { CardShedule } from './cards';
import { SheduleDTO, RideSheduleSelectorProps } from '../types/ride';
interface InputProps {
  label: string;
  type: string;
  icon?: LucideIcon;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error: string | undefined;
}
export function Input({ label, type, register, icon: Icon, placeholder, error }: InputProps) {
  return (
    <span className={`w-full flex flex-col gap-1 has-[input:focus]:text-amber-500 transition-all duration-200 ease-in`}>
      <label className={`${error ? 'text-red-500' : ''} flex items-center text-sm gap-2 px-1 transition-all duration-200 ease-in`}>
        {Icon && <Icon size={18} />}
        {label}
      </label>
      <input type={type} {...register} className="text-white rounded-xl w-full min-w-0  border border-[#111] shadow-md shadow-[#191919] p-3 bg-dark" placeholder={placeholder} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </span>
  );
}
export function InputPassword({ label, icon: Icon, placeholder, register, error }: InputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  function handleVisibilityButton() {
    setIsVisible((prev) => !prev);
  }
  return (
    <span className="w-full flex flex-col gap-1 has-[input:focus]:text-amber-500 transition-all duration-200 ease-in">
      <label className={`${error ? 'text-red-500' : ''} flex items-center text-sm gap-2 px-1 transition-all duration-200 ease-in`}>
        {Icon && <Icon size={18} />}
        {label}
      </label>
      <span className="relative h-full">
        <input type={isVisible ? 'text' : 'password'} {...register} className="relative text-white rounded-xl w-full min-w-0  border border-[#111] shadow-md shadow-[#191919] p-3 bg-dark" placeholder={placeholder} />
        <button type="button" className="absolute right-2 top-3.5" onClick={handleVisibilityButton}>
          {isVisible ? <EyeClosed color="#777" size={20} /> : <Eye color="#777" size={20} />}
        </button>
      </span>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </span>
  );
}
interface SelectProps {
  data: string[] | null;
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
    <div className="animate-appear flex flex-col gap-2 min-w-full" ref={containerRef}>
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>

      <div className={`${isOpen ? 'border-amber-500' : 'border-black'} ${data ? '' : 'disabled'} text-base bg-dark p-2  border shadow-md shadow-[#111] rounded-xl transition-all duration-300 ease-in-out`} role="combobox" aria-expanded={isOpen} aria-controls={`${id}-listbox`}>
        <button id={id} type="button" onClick={toggle} className={`p-2 flex justify-between w-full ${isOpen ? 'border-b-2 border-[#333]' : ''} `}>
          <span>{value ?? 'Escolher'}</span>
          <span>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
        </button>

        {isOpen && (
          <ul id={`${id}-listbox`} role="listbox" className="mt-2">
            {data &&
              data.map((item) => (
                <li key={item} role="option" aria-selected={value === item} tabIndex={0} className={`px-2 py-3 cursor-pointer ${value === item ? 'bg-gray-700' : ''}`} onClick={() => handleSelect(item)}>
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

export function RideSheduleSelector({ allShedules, register }: RideSheduleSelectorProps) {
  const [morningPeriod, afterPeriod] = allShedules.reduce<SheduleDTO[][]>(
    (acc, s) => {
      if (s.slot < 720) acc[0].push(s);
      else acc[1].push(s);
      return acc;
    },
    [[], []],
  );
  const [periodState, setPeriodState] = useState<'morning' | 'after'>('morning');
  return (
    <div className="flex flex-col gap-3">
      <h1 className="uppercase text-2 sm">Período da corrida</h1>
      <div className="flex flex-col gap-2 h-full">
        <span className="bg-dark p-2 rounded-xl flex justify-between gap-2 mb-4">
          <button
            onClick={() => setPeriodState('morning')}
            type="button"
            className={`px-8 py-2 rounded-xl transition-all duration-400 ease cursor-pointer 
          ${periodState === 'morning' ? 'bg-container shadow-md shadow-black' : ''}`}
          >
            Manhã
          </button>
          <button
            onClick={() => setPeriodState('after')}
            type="button"
            className={`px-8 py-2 rounded-xl transition-all duration-300 ease cursor-pointer 
          ${periodState === 'after' ? 'bg-container shadow-md shadow-black' : ''}`}
          >
            Tarde
          </button>
        </span>
        <ContainerShedules register={register} shedules={periodState === 'morning' ? morningPeriod : afterPeriod} />
      </div>
    </div>
  );
}

interface ContainerShedulesProps {
  shedules: SheduleDTO[];
  register: UseFormRegisterReturn;
}
export function ContainerShedules({ shedules, register }: ContainerShedulesProps) {
  return (
    <div className='grid gap-2'>
      <h1>Horário da sua corrida.</h1>
      <ul className={`bg-dark px-2 py-8 rounded-xl w-full flex flex-wrap justify-center  items-center gap-6 `}>
        {shedules.map((s) => {
          return <CardShedule key={s.slot} shedule={s} register={register} />;
        })}
      </ul>
    </div>
  );
}
interface InputRadioProps {
  label: string;
  icon?: LucideIcon;
  register: UseFormRegisterReturn
  value: string
}
export function InputRadio({ label, icon: Icon, register, value}: InputRadioProps) {
  return (
    <span className="relative bg-container has-[input:checked]:bg-[#f59e0b33]! has-[input:focus]:text-amber-500 flex p-4 rounded-xl">
      <label htmlFor="" className="flex items-center gap-2">
        {Icon && <Icon size={18} />}
        {label}
      </label>
      <input value={value} type="radio" {...register} className="absolute inset-0 opacity-0 min-w-full min-h-full w-full h-full" />
    </span>
  );
}
