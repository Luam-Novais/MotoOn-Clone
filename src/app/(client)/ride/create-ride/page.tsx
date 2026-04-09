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
import { createRide, getRoutes, getSlots } from '@/src/service/client.services';

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [countFormPage, setCountFormPage] = useState<1 | 2>(1);
  const { control, register, handleSubmit, watch, setValue, reset } = useForm<CreateRideDTO>();
  const date = watch('date_ride');
  const origin = watch('origin');
  const destination = watch('destination');
  const [slots, setSlots] = useState<SheduleDTO[] | null>(null);

  useEffect(() => {
    if (date) {
      async function slots() {
        const { response, json } = await getSlots(date);
        if (response.ok) {
          setSlots(json.allSlots);
        } else {
          alert(json.messageError);
        }
      }
      slots();
    }
  }, [date]);
  useEffect(() => {
    setValue('destination', '');
  }, [origin]);
  const onSubimit: SubmitHandler<CreateRideDTO> = async (data) => {
    if (data.client_name && data.client_phone && data.date_ride && data.origin && data.destination && data.address && data.start_ride) {
      const { response, json } = await createRide(data);
      if (response.ok) {
        alert(json.message);
        const token = json.client_token;
        localStorage.setItem('client_token', token);
        reset();
      }
    } else {
      alert('dados incompletos');
    }
  };
  return (
    <div className="animate-appear py-6 px-4 flex flex-col gap-4 max-w-full">
      <span className="flex gap-3 items-center">
        <Link href={'/ride'}>
          <ArrowLeft size={30} />
        </Link>
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
            <Input icon={User} label="Nome" type="text" register={register('client_name')} placeholder="Seu nome completo" />
            <Input icon={Phone} placeholder="(00) 0000-0000" label="Telefone" type="text" register={register('client_phone')} />
            <Input icon={CalendarDays} label="Data da corrida" type="date" register={register('date_ride')} />
            {slots && <RideSheduleSelector allShedules={slots} register={register('start_ride')} />}
            {/* {date && <RideSheduleSelector allShedules={slotsTeste} register={register('time')} />} */}
            <Button type="button" onClick={() => setCountFormPage(2)}>
              Adicionar origem e destino
              <ArrowRight />
            </Button>
          </div>
        )}
        {countFormPage === 2 && (
          <div className="flex flex-col gap-y-10 animate-appear">
            <button className="max-w-fit bg-dark px-4 py-2 rounded-md shadow-md shadow-black/50 flex items-center gap-4" type="button" onClick={() => setCountFormPage(1)}>
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
            <Input label="Endereço de origem" type="text" register={register('address')} />
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
