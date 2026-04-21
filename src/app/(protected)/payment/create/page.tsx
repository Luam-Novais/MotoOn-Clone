'use client';
import { Title } from '@/src/components/title';
import { CreatePaymentDTO } from '@/src/types/payment';
import { Input, InputRadio } from '@/src/components/input';
import { Button } from '@/src/components/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CircleDollarSign, Banknote, CreditCard } from 'lucide-react';
import { HttpRequestBuilder } from '@/src/utils/httpRequestBuilder';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetToken } from '@/src/hooks/useGetToken';
import { toast } from 'react-toastify';

const { adminRequests } = new HttpRequestBuilder();

async function createPayment(data: CreatePaymentDTO, token: string) {
  const { url, options } = adminRequests.buildAdminPost('payment/create', token, data);
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}

export default function Page() {
  const token = useGetToken();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePaymentDTO>();
  const createPaymentMutation = useMutation({
    mutationFn: (data: CreatePaymentDTO) => createPayment(data, token as string),
    mutationKey: ['payment'],
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['payment'] });
      reset()
    },
    onError: (data) => {
      toast.success(data.message);
    },
  });
  const onSubmit: SubmitHandler<CreatePaymentDTO> = async (data) => {
    createPaymentMutation.mutate(data);
  };
  return (
    <section className="grid gap-4 mb-40 p-4">
      <span className="flex items-center gap-4 mb-10">
        <Link href={'/payment'}>
          <ArrowLeft />
        </Link>
        <Title>Criar um novo pagamento</Title>
      </span>
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} action="">
        <div className="grid grid-cols-2 gap-x-4 bg-container p-4 rounded-xl shadow-md shadow-black/50">
          <Input error={errors.value?.message} type="text" label="Valor" register={register('value', { required: 'O valor é obrigatório.' })} placeholder="00.00" />
          <Input error={errors.payment_date?.message} type="date" label="Data do pagamento" register={register('payment_date', { required: 'A data do pagamento é obrigatório.' })} />
        </div>
        <div className="grid col-span-full gap-3">
          <h3>Selecione a forma de pagamento</h3>
          <InputRadio icon={CircleDollarSign} value="pix" register={register('payment_method')} label="Pix" />
          <InputRadio icon={Banknote} value="dinheiro" register={register('payment_method')} label="Dinheiro" />
          <InputRadio icon={CreditCard} value="cartao" register={register('payment_method')} label="Cartão" />
        </div>
        <Button className="mt-4 col-span-full" type="submit">
          Criar Pagamento
        </Button>
      </form>
    </section>
  );
}
