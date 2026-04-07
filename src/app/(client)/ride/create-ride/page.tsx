'use client';
import { Button } from '@/src/components/button';
import { Input, RideSheduleSelector, Select } from '@/src/components/input';
import { Title } from '@/src/components/title';
import { useEffect, useState } from 'react';
import { type CreateRideDTO } from '@/src/types/ride';
import { ArrowRight, Motorbike, User, Phone, CalendarDays, Pencil, ArrowLeft } from 'lucide-react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { SheduleDTO } from '@/src/types/ride';
import { allowedRoutes } from '@/src/data/routes';
import Link from 'next/link';


export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [countFormPage, setCountFormPage] = useState<1 | 2>(1);
  const { control, register, handleSubmit, watch, setValue } = useForm<CreateRideDTO>();
  const date = watch('date_ride');
  const origin = watch('origin');
  const destination = watch('destination');
  // const [allowedOrigins, setAllowedOrigins] = useState<Record<string, Record<string, number>> | null>(null);
  const [slots, setSlots] = useState<SheduleDTO[] | null>(null);
  // useEffect(() => {
  //   async function getRoutes() {
  //     const response = await fetch(`http://localhost:3001/ride/get-routes`);
  //     const json = await response.json();
  //     if (response.ok) {
  //       setAllowedOrigins(json);
  //     }
  //   }
  //   getRoutes();
  // }, []);
  useEffect(() => {
    if (date) {
      async function getSlots() {
        const response = await fetch(`http://localhost:3001/ride/get-slots?date_ride=${date}`);
        const json = await response.json();
        if (response.ok) {
          setSlots(json.allSlots);
        }
      }
      getSlots();
    }
  }, [date]);

  useEffect(() => {
    console.log(destination, origin);
    setValue('destination', '');
  }, [origin]);
  const onSubimit: SubmitHandler<CreateRideDTO> = async (data) => {
    console.log(data);
    alert('Corrida criada com sucesso, aguarde a confirmação do motoboy.');
  };
  function nextForm() {
    setCountFormPage(2);
  }
  function prevForm() {
    setCountFormPage(1);
  }
  return (
    <div className="animate-appear py-6 px-4 flex flex-col gap-4 max-w-full">
      <span className='flex gap-3 items-center'>
        <Link href={'/ride'}><ArrowLeft size={30}/></Link>
        <Title className="font-bold">Para onde Vamos ?</Title>
      </span>
      <p className="text-[#ccc]">Nos diga para onde deseja ir, que levaremos você.</p>
      <span className="text-black grid grid-cols-2 gap-8">
        <p className={`count-page ${countFormPage === 1 ? 'count-page-active' : ''}`}>passo 1{countFormPage === 1 ? ': Informações' : ''}</p>
        <p className={`count-page ${countFormPage === 2 ? 'count-page-active' : ''}`}>passo 2{countFormPage === 2 ? ': Rotas' : ''} </p>
      </span>
      <form className="bg-container py-8 px-4 rounded-xl shadow-black/50 shadow-md flex flex-col gap-y-10 max-w-full" onSubmit={handleSubmit(onSubimit)} action="">
        {countFormPage === 1 && (
          <div className="flex flex-col gap-y-10">
            <Input icon={User} label="Nome" type="text" register={register('name')} placeholder="Seu nome completo" />
            <Input icon={Phone} placeholder="(00) 0000-0000" label="Telefone" type="text" register={register('phone')} />
            <Input icon={CalendarDays} label="Data da corrida" type="date" register={register('date_ride')} />
            <RideSheduleSelector allShedules={slotsTeste} register={register('time')} />
            {/* {date && <RideSheduleSelector allShedules={slotsTeste} register={register('time')} />} */}
            <Button type="button" onClick={nextForm}>
              Adicionar origem e destino
              <ArrowRight />
            </Button>
          </div>
        )}
        {countFormPage === 2 && (
          <div className="flex flex-col gap-y-10 animate-appear">
            <button className="max-w-fit bg-dark px-4 py-2 rounded-md shadow-md shadow-black/50 flex items-center gap-4" type="button" onClick={prevForm}>
              <Pencil size={16} color="#f59e0b" />
              alterar dados iniciais
            </button>
            {allowedRoutes && (
              <>
                <Controller
                  name="origin"
                  control={control}
                  render={({ field }) => {
                    return <Select data={Object.keys(allowedRoutes)} label="Ponto de origem" onChange={field.onChange} value={field.value} id="origin" />;
                  }}
                />
                {origin && (
                  <Controller
                    name="destination"
                    control={control}
                    render={({ field }) => {
                      return <Select data={origin ? Object.keys(allowedRoutes[origin]) : null} label="Ponto de destino" onChange={field.onChange} value={field.value} id="destination" />;
                    }}
                  />
                )}
              </>
            )}
            <Input label="Ponto de referência" type="text" register={register('point_reference')} />
            {allowedRoutes && destination && destination && (
              <div className="flex justify-center bg-dark rounded-xl shadow-md">
                <span className="flex flex-col py-4">
                  <p className="text-[0.75rem] text-[#ccc] uppercase">Valor:</p>
                  <p className="text-amber-500 font-semibold text-3xl">{allowedRoutes[origin][destination] !== undefined ? `R$${allowedRoutes[origin][destination].toFixed(2).replace('.', ',')}` : 'Valor a combinar com Motoboy.'}</p>
                </span>
              </div>
            )}
            <Button type="submit" loadingState={loading}>
              Criar Corrida <Motorbike />
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

// const data = ['freitas', 'centro', 'pq_mariana'];

const slotsTeste = [
  {
    slot: 300,
    isAvailable: false,
    formatedShedule: '05:00',
  },
  {
    slot: 330,
    isAvailable: true,
    formatedShedule: '05:30',
  },
  {
    slot: 360,
    isAvailable: false,
    formatedShedule: '06:00',
  },
  {
    slot: 390,
    isAvailable: true,
    formatedShedule: '06:30',
  },
  {
    slot: 420,
    isAvailable: true,
    formatedShedule: '07:00',
  },
  {
    slot: 450,
    isAvailable: true,
    formatedShedule: '07:30',
  },
  {
    slot: 480,
    isAvailable: true,
    formatedShedule: '08:00',
  },
  {
    slot: 510,
    isAvailable: true,
    formatedShedule: '08:30',
  },
  {
    slot: 540,
    isAvailable: true,
    formatedShedule: '09:00',
  },
  {
    slot: 570,
    isAvailable: true,
    formatedShedule: '09:30',
  },
  {
    slot: 600,
    isAvailable: true,
    formatedShedule: '10:00',
  },
  {
    slot: 630,
    isAvailable: false,
    formatedShedule: '10:30',
  },
  {
    slot: 660,
    isAvailable: true,
    formatedShedule: '11:00',
  },
  {
    slot: 690,
    isAvailable: true,
    formatedShedule: '11:30',
  },
  {
    slot: 720,
    isAvailable: true,
    formatedShedule: '12:00',
  },
  {
    slot: 750,
    isAvailable: true,
    formatedShedule: '12:30',
  },
  {
    slot: 780,
    isAvailable: true,
    formatedShedule: '13:00',
  },
  {
    slot: 810,
    isAvailable: false,
    formatedShedule: '13:30',
  },
  {
    slot: 840,
    isAvailable: true,
    formatedShedule: '14:00',
  },
  {
    slot: 870,
    isAvailable: true,
    formatedShedule: '14:30',
  },
  {
    slot: 900,
    isAvailable: false,
    formatedShedule: '15:00',
  },
  {
    slot: 930,
    isAvailable: true,
    formatedShedule: '15:30',
  },
  {
    slot: 960,
    isAvailable: true,
    formatedShedule: '16:00',
  },
  {
    slot: 990,
    isAvailable: false,
    formatedShedule: '16:30',
  },
  {
    slot: 1020,
    isAvailable: true,
    formatedShedule: '17:00',
  },
  {
    slot: 1050,
    isAvailable: true,
    formatedShedule: '17:30',
  },
];

//
