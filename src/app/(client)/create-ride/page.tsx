'use client';
import { Button } from '@/src/components/button';
import { Select, Input, RideSheduleSelector } from '@/src/components/input';
import { Title } from '@/src/components/title';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Motorbike } from 'lucide-react';
import { useForm, type SubmitHandler, Controller, Watch } from 'react-hook-form';

interface CreateRideDTO {
  origin: string;
  destination: string;
  date_ride: Date;
  point_reference: string;
  name: string;
  phone: string;
  time: string;
}
interface SheduleDTO {
  slot: number;
  isAvailable: boolean;
  formatedShedule: string;
}

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [countFormPage, setCountFormPage] = useState<1 | 2>(1);
  const { control, register, handleSubmit, watch } = useForm<CreateRideDTO>();
  const date = watch('date_ride');

  // const [slots, setSlots] = useState<SheduleDTO[] | null>(null);
  // useEffect(() => {
  //   if(date){
  //     async function getSlots() {
  //       const response = await fetch(`http://localhost:3001/ride/get-slots?date_ride=${date}`);
  //       const json = await response.json();
  //       if (response.ok) {
  //         setSlots(json.allSlots);
  //       }
  //     }
  //     getSlots();
  //   }
  // }, [date]);
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
    <div className="py-6 px-4 flex flex-col gap-4 bg-gray-300 max-w-full">
      <Title className="text-[#090909] font-bold">Para onde Vamos ?</Title>
      <p className="text-[#222]">Nos diga para onde deseja ir, que levaremos você.</p>
      <span className="flex gap-4 text-black text-sm justify-end">
        <p className={`py-1 px-3 border rounded-full  count-page ${countFormPage === 1 ? 'count-page-active' : ''}`}>1</p>
        <p className={`py-1 px-3 border rounded-full count-page ${countFormPage === 2 ? 'count-page-active' : ''}`}>2</p>
      </span>
      <form className="bg-container py-8 px-4 rounded-md shadow-black/50 shadow-md flex flex-col gap-y-10 max-w-full" onSubmit={handleSubmit(onSubimit)} action="">
        {countFormPage === 1 && (
          <div className="flex flex-col gap-y-10">
            <Input label="Nome" type="text" register={register('name')} />
            <Input label="Telefone" type="text" register={register('phone')} />
            <Input label="Data da corrida" type="date" register={register('date_ride')} />
            {date && <RideSheduleSelector allShedules={slotsTeste} register={register('time')} />}
            <Button type="button" onClick={nextForm}>
              Adicionar origem e destino
              <ArrowRight />
            </Button>
          </div>
        )}
        {countFormPage === 2 && (
          <div className="flex flex-col gap-y-10">
            <button className="max-w-fit bg-dark p-2 rounded-md shadow-md shadow-black/50 flex gap-4" type="button" onClick={prevForm}>
              <ArrowLeft />
              alterar dados iniciais
            </button>
            <Controller
              name="origin"
              control={control}
              render={({ field }) => {
                return <Select data={data} label="Ponto de origem" onChange={field.onChange} value={field.value} id="origin" />;
              }}
            />
            <Controller
              name="destination"
              control={control}
              render={({ field }) => {
                return <Select data={data} label="Ponto de destino" onChange={field.onChange} value={field.value} id="destination" />;
              }}
            />
            <Input label="Ponto de referência" type="text" register={register('point_reference')} />
            <span className="flex justify-between text-xl">
              <p>Valor:</p> <p className="text-amber-500 font-semibold">R$7,00</p>
            </span>
            <Button type="submit" loadingState={loading}>
              Criar Corrida <Motorbike />
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

const data = ['freitas', 'centro', 'pq_mariana'];

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
