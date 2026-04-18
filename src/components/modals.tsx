import { CircleCheckBig, CircleDollarSign, Banknote, CreditCard, X } from 'lucide-react';
import { InputRadio, Select } from './input';
import { Button } from './button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
export function ContainerModal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 min-w-full w-full h-full bg-black/80 z-50 p-4 flex flex-col items-center justify-center">
      <div className="animate-appear bg-dark w-full mt-8 rounded-xl shadow-xl shadow-black/50 flex justify-center">{children}</div>
    </div>
  );
}
interface ModalProps {
  modalState: boolean;
  setModalState: () => void;
  id_ride: number;
  token: string;
}
interface FinishRideDTO {
  paymentMethod: string;
}
const httpReqBuilder = new HttpRequestBuilder();
export function FinishRideModal({ token, setModalState, id_ride }: ModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<FinishRideDTO>();
  const finishRide = useMutation({
    mutationFn: async (data: FinishRideDTO) => {
      const { url, options } = httpReqBuilder.ridesRequest.buildFinishRequest({ id: id_ride, token, data });
      const res = await fetch(url, options);
      const json = await res.json();
      return json;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['rides'] });
      setModalState();
    },
    onError: (data) => {
      toast.success(data.message);
    },
  });
  const onSubmit: SubmitHandler<FinishRideDTO> = async (data) => {
    finishRide.mutate(data);
  };
  return (
    <ContainerModal>
      <div className="relative min-w-full w-full p-4 flex flex-col gap-4 items-center">
        <div className="flex items-center">
          <div className="p-4 w-fit h-fit bg-container rounded-full ">
            <CircleCheckBig size={30} color="#22c55e" />
          </div>
          <button onClick={setModalState}>
            <X className="absolute top-2 right-2" />
          </button>
        </div>
        <div className="grid gap-4 w-full">
          <h3 className="mb-4 text-sm text-[#ccc]">Selecione a forma de pagamento</h3>
          <form onSubmit={handleSubmit(onSubmit)} action="" className="grid gap-4">
            <InputRadio icon={CircleDollarSign} value="pix" register={register('paymentMethod')} label="Pix" />
            <InputRadio icon={Banknote} value="dinheiro" register={register('paymentMethod')} label="Dinheiro" />
            <InputRadio icon={CreditCard} value="cartao" register={register('paymentMethod')} label="Cartão" />
            <Button className="mt-4" type="submit">
              Finalizar Corrida
            </Button>
          </form>
        </div>
      </div>
    </ContainerModal>
  );
}
