import { useState, useRef, useEffect } from 'react';
import { EyeClosed, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { CardShedule } from './cards';
import { SheduleDTO, RideSheduleSelectorProps } from '../types/ride';
interface InputProps {
  label: string;
  type: string;
  register: UseFormRegisterReturn;
}
export function Input({ label, type, register }: InputProps) {
  return (
    <span className="min-w-full flex flex-col gap-2 ">
      <label htmlFor="">{label}</label>
      <input type={type} {...register} className="rounded-md w-full border border-black shadow-md p-3 bg-dark" />
    </span>
  );
}
export function InputPassword({ label, type }: InputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  function handleVisibilityButton() {
    setIsVisible((prev) => !prev);
  }
  return (
    <span className="min-w-full">
      <label htmlFor="">{label}</label>
      <span className="relative h-full">
        <input type={isVisible ? 'text' : 'password'} className="relative rounded-md w-full border border-black shadow-md p-3 bg-dark" />
        <button type="button" className="absolute right-2 top-0" onClick={handleVisibilityButton}>
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
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>

      <div className={`${isOpen ? 'border-amber-500' : 'border-black'} text-base bg-dark p-2 border-2 rounded-md transition-all duration-300 ease-in-out`} role="combobox" aria-expanded={isOpen} aria-controls={`${id}-listbox`}>
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

export function RideSheduleSelector({ allShedules, register }: RideSheduleSelectorProps) {
  const [morningPeriod, afterPeriod] = allShedules.reduce<SheduleDTO[][]>(
    (acc, s) => {
      if (s.slot < 720) acc[0].push(s);
      else acc[1].push(s);
      return acc;
    },
    [[], []],
  );
  const [morningOpen, setMorningOpen] = useState<boolean>(false);
  const [afterOpen, setAfterOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-3">
      <h1>Horário da corrida</h1>
      <div className="flex flex-col gap-6 min-h-full h-full">
        <ContainerShedules register={register} shedules={morningPeriod} label="Manhã" handleClick={() => setMorningOpen((prev) => !prev)} isOpen={morningOpen} />
        <ContainerShedules register={register} shedules={afterPeriod} label="Tarde" handleClick={() => setAfterOpen((prev) => !prev)} isOpen={afterOpen} />
      </div>
    </div>
  );
}

interface ContainerShedulesProps {
  shedules: SheduleDTO[];
  label: string;
  handleClick: () => void;
  isOpen: boolean;
  register: UseFormRegisterReturn;
}
export function ContainerShedules({ shedules, label, handleClick, isOpen, register }: ContainerShedulesProps) {
  return (
    <div className={`bg-dark border border-black rounded-md shadow-black/50 shadow-md  p-5 ${isOpen ? 'h-full' : ''} flex flex-col gap-4`}>
      <button className={`min-w-full flex justify-between items-center  ${isOpen ? 'mb-4' : ''}`} onClick={handleClick} type="button">
        {label}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      <ul className={`relative max-w-full w-full  ${isOpen ? 'block' : 'hidden'} flex flex-wrap  items-center pb-5 gap-6 gap-y-12`}>
        {shedules.map((s) => {
          return <li>{<CardShedule key={s.slot} shedule={s} register={register} />}</li>;
        })}
      </ul>
    </div>
  );
}
