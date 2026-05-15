import { formatToCurrency, minutesToHoursFormated, normalizeTextLabel, urlBase64ToUint8Array } from '../utils/functionsFormat';
import { CircleCheckBig, CircleDollarSign, Banknote, CreditCard, X, LucideIcon, BellDot, TriangleAlert, CheckCircle2, XCircle, User, MapPin, Clock3, Calendar } from 'lucide-react';
import { InputRadio, Input } from './input';
import { Button, ButtonEnableNotification, ButtonFilter } from './button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { HttpRequestBuilder } from '../utils/httpRequestBuilder';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { Payment } from '../types/payment';
import { Spinner } from './spinner';
import { RideWithClient } from '../types/ride';
import { finishRideService, updateStatusService } from '../service/ride.services';
import { deletePayment } from '../service/payment.services';
import { only } from 'node:test';
import { useNotificationStore } from '../store/useNotificationStore';
import { sendPushSubcription } from '../service/notification.services';

export function ContainerModal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 min-h-full bg-black/70 backdrop-blur-sm">
      <div className="animate-appear-down h-[80%] absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-zinc-800 bg-zinc-950 p-5 shadow-2xl">
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-zinc-700" />
        {children}
        <button onClick={onClose} className="w-full py-3 text-sm text-zinc-500 transition hover:text-zinc-300">
          Fechar
        </button>
      </div>
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
export function FinishRideModal({ token, setModalState, id_ride }: FinishRideModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<FinishRideDTO>();

  const finishRide = useMutation({
    mutationFn: async (data: FinishRideDTO) => finishRideService({ id: id_ride, token, data }),
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
    <ContainerModal onClose={setModalState}>
      <div className="relative min-w-full w-full p-4 flex flex-col gap-4 items-center">
        <HeaderModal colorIcon="#22c55e" handleClose={setModalState} icon={CircleCheckBig} desc={'Selecione a forma de pagamento'} />
        <div className="grid gap-4 w-full">
          <form onSubmit={handleSubmit(onSubmit)} action="" className="grid gap-4">
            <InputRadio icon={CircleDollarSign} value="pix" register={register('paymentMethod')} label="Pix" />
            <InputRadio icon={Banknote} value="dinheiro" register={register('paymentMethod')} label="Dinheiro" />
            <InputRadio icon={CreditCard} value="cartao" register={register('paymentMethod')} label="Cartão" />
            <Button className="mt-4" type="submit" loadingState={finishRide.isPending} disabled={finishRide.isPending}>
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

export function DeletePaymentModal({ data, onClose, token }: PaymentModalProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deletePayment(data.id, token),
    mutationKey: ['payment', 'today', 'current-month', 'last-three-months'],
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
    <ContainerModal onClose={onClose}>
      <div className="flex w-full flex-col gap-8">
        <HeaderModal icon={TriangleAlert} colorIcon="#ef4444" desc="Essa ação não poderá ser desfeita." handleClose={onClose} />
        <div className="grid gap-4">
          <button onClick={handleDelete} className="text-red-950 font-bold bg-linear-0 from-red-800 to-red-500 p-4 rounded-xl">
            Excluir
          </button>
          <ButtonFilter onClick={onClose} type="button">
            Cancelar
          </ButtonFilter>
        </div>
      </div>
    </ContainerModal>
  );
}

type UpdatePendingRideModalProps = {
  data: RideWithClient;
  onClose: () => void;
  token: string;
};

export function UpdatePendingRideModal({ data, token, onClose }: UpdatePendingRideModalProps) {
  const formatDate = new Date(data.date_ride).toLocaleDateString();
  const queryClient = useQueryClient();

  const updateMutate = useMutation({
    mutationFn: (status: string) => updateStatusService({ id: data.id, token, data: { newStatus: status } }),
    mutationKey: ['rides', 'pending'],
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['rides', 'pending'] });
    },
    onError: (data) => toast.error(data.message),
  });
  const handleUpdateStatus = (status: 'CONFIRMADA' | 'CANCELADA') => {
    updateMutate.mutate(status);
    onClose();
  };

  return (
    <ContainerModal onClose={onClose}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100">Atualizar corrida</h2>

          <p className="mt-1 text-sm text-zinc-500">#{data.number_ride}</p>
        </div>

        <button onClick={onClose} className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
          <X size={22} />
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <User size={16} className="text-zinc-500" />
          {data.client.name}
        </div>

        <div className="flex items-start gap-2 text-sm text-zinc-300">
          <MapPin size={16} className="mt-0.5 text-amber-400 shrink-0" />
          <div>
            <p>{normalizeTextLabel(data.origin)}</p>
            <p className="text-zinc-500">→ {normalizeTextLabel(data.destination)}</p>
          </div>
        </div>

        <div className="flex items-end justify-between pt-1">
          <div className="">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Calendar size={15} />
              {formatDate}
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Clock3 size={15} />
              {minutesToHoursFormated(data.start_ride)}
            </div>
          </div>

          <span className="text-lg font-bold text-amber-400">{formatToCurrency(data.value)}</span>
        </div>
      </div>

      {/* ações */}
      <div className="mt-5 space-y-3 grid gap-3">
        <button onClick={() => handleUpdateStatus('CONFIRMADA')} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-4 font-semibold text-black transition hover:bg-emerald-400 active:scale-[0.99]">
          <CheckCircle2 size={20} />
          Aceitar corrida
        </button>

        <button onClick={() => handleUpdateStatus('CANCELADA')} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-4 font-semibold text-red-400 transition hover:bg-red-500/15 active:scale-[0.99]">
          <XCircle size={20} />
          Recusar corrida
        </button>
      </div>
    </ContainerModal>
  );
}

interface EnableNotificationsPromptProps {
  showModal: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}
export function EnableNotificationsPrompt({ showModal, handleClose, handleOpen }: EnableNotificationsPromptProps) {
  return <div>{showModal ? <NotificationPermissionModal onClose={handleClose} /> : <ButtonEnableNotification onOpen={handleOpen} />}</div>;
}

export function NotificationPermissionModal({ onClose }: { onClose: () => void }) {
  const { setPermission } = useNotificationStore();
  async function handlePermission() {
    try {
      console.log('1');
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) throw new Error('Chave publica não existente.');
      console.log('2');

      const vapidKey = urlBase64ToUint8Array(publicKey);
      const registration = await navigator.serviceWorker.ready;
      if (!registration) throw new Error('registration do sw não criada.');
      console.log('3', registration);

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Ative as notificações para melhor experiência.');
        return;
      }
      console.log('4', permission);
      setPermission(permission);
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidKey,
        });
      }
      console.log('5', subscription);
      const response = await sendPushSubcription(subscription);
      console.log(await response.json());
      console.log('6 ______ tudo certo>>>>');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ContainerModal onClose={onClose}>
      <div className="grid gap-4 justify-center mb-9 mt-4">
        <h1 className="text-2xl">Para uma melhor experiência no sistema, ative as notificações.</h1>
        <p className="text-[#ccc]">As notificações servirão, para te alertar quando uma nova solicitação de corrida for feita.</p>
        <button className="flex items-center justify-center mt-8 border border-zinc-950 uppercase bg-zinc-100 text-zinc-950 font-bold p-4 gap-2 rounded-xl" onClick={handlePermission}>
          Ativar notificações
          <BellDot size={22} strokeWidth={2.3} />
        </button>
      </div>
    </ContainerModal>
  );
}
