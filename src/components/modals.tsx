import { CircleCheckBig, CircleDollarSign, Banknote, CreditCard, X, LucideIcon, TriangleAlert, Trash } from 'lucide-react';
import { InputRadio, Input } from './input';
import { Button, ButtonFilter } from './button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { Payment } from '../types/payment';
import { Spinner } from './spinner';
export function ContainerModal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 min-w-full w-full h-full bg-black/80 z-50 p-4 flex flex-col items-center justify-center">
      <div className="animate-appear bg-dark w-full mt-8 rounded-xl shadow-xl shadow-black/50 flex overflow-y-scroll justify-center p-4">{children}</div>
    </div>
  );
}
interface HeaderModalProps {
  handleClose: () => void;
  icon: LucideIcon;
  desc: string;
  colorIcon: string;
}
export function HeaderModal({ handleClose, icon: Icon, colorIcon, desc }: HeaderModalProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="p-4 w-fit h-fit bg-container rounded-full ">
        <Icon size={30} color={colorIcon} />
      </div>
      <button onClick={handleClose}>
        <X className="absolute top-2 right-2" />
      </button>
      <h3 className="mb-4 text-sm text-[#ccc]">{desc}</h3>
    </div>
  );
}
interface FinishRideModalProps {
  modalState: boolean;
  setModalState: () => void;
  id_ride: number;
  token: string;
}
interface FinishRideDTO {
  paymentMethod: string;
}
const httpReqBuilder = new HttpRequestBuilder();
export function FinishRideModal({ token, setModalState, id_ride }: FinishRideModalProps) {
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
      queryClient.invalidateQueries({ queryKey: ['payment'] });
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
        <HeaderModal colorIcon="#22c55e" handleClose={setModalState} icon={CircleCheckBig} desc={'Selecione a forma de pagamento'} />
        <div className="grid gap-4 w-full">
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
interface PaymentModalProps {
  data: Payment;
  onClose: () => void;
  token: string;
}
async function deletePayment(id: number, token: string) {
  const { url, options } = httpReqBuilder.adminRequests.buildAdminDel(`payment/delete/${id}`, token);
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}
export function DeletePaymentModal({ data, onClose, token }: PaymentModalProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deletePayment(data.id, token),
    mutationKey: ['payment', 'today-payment', 'month-payment'],
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['payment'] });
      onClose();
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  function handleDelete() {
    mutate();
  }
  if (isPending) return <Spinner />;
  return (
    <ContainerModal>
      <div className="flex w-full flex-col gap-8">
        <HeaderModal icon={TriangleAlert} colorIcon="#ef4444" desc="Essa ação não poderá ser desfeita." handleClose={onClose} />
        <div className="grid gap-2">
          <button onClick={handleDelete} className="text-red-950 font-bold bg-linear-0 from-red-800 to-red-500 p-4 rounded-xl">
            Excluir
          </button>
          <ButtonFilter type="button">Cancelar</ButtonFilter>
        </div>
      </div>
    </ContainerModal>
  );
}
