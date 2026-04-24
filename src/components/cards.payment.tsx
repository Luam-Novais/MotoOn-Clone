import { formatToCurrency } from '../utils/functionsFormat';
import { Trash, Calendar, CircleCheck } from 'lucide-react';
import { Payment } from '../types/payment';
import { useState } from 'react';
import { Client } from '../types/client';

interface CardPaymentProps {
  payment: Payment;
  index: number;
  onDelete: () => void;
}

function ContainerCardPayment({ children, index, onClick }: { children: React.ReactNode; index: number; onClick: () => void }) {
  const isEven = index % 2 === 0;
  return (
    <li className={`grid gap-2 relative ${!isEven ? 'bg-[#171717]' : 'bg-dark'}  p-2 rounded-xl border-l-4 border-amber-500 shadow-md shadow-black/50 `} onClick={onClick}>
      {children}
    </li>
  );
}
function BodyCardPayment({ payment, onDelete }: { payment: Payment; onDelete: () => void }) {
  const formatDate = new Date(payment.payment_date).toLocaleDateString();
  return (
    <div className="grid grid-cols-[2fr_50px] items-center justify-between">
      <div className="grid gap-2">
        <span className="flex gap-2">
          <p className="flex items-center text-xs gap-1 text-[#ccc]">
            <Calendar size={12} />
            {formatDate}
          </p>
          <p className="flex items-center text-xs gap-1 text-green-500">
            <CircleCheck size={12} />
            concluido
          </p>
        </span>
        <span className="flex items-end gap-1">
          <h2 className="text-2xl text-amber-500 font-bold">{formatToCurrency(payment.value)}</h2>
          <p className="flex items-center justify-center capitalize text-xs bg-container px-3 py-1 rounded-xl">{payment.payment_method}</p>
        </span>
      </div>
      <span>
        <button className="bg-container p-4 rounded-full flex items-center justify-center align-middle" onClick={onDelete}>
          <Trash size={18} color="#ef4444" />
        </button>
      </span>
    </div>
  );
}
function CardDataClient({ client }: { client?: Client }) {
  return (
    <div className="mt-3">
      {client ? (
        <div>
          <p className="capitalize">Nome: {client.name}</p>
          <p className="capitalize">Telefone: {client.phone}</p>
        </div>
      ) : (
        <span>Sem cliente cadastrado.</span>
      )}
    </div>
  );
}
export function CardPayment({ payment, index, onDelete }: CardPaymentProps) {
  const [mostDataClient, setMostDataClient] = useState<boolean>(false);

  return (
    <ContainerCardPayment index={index} onClick={() => setMostDataClient((prev: boolean) => !prev)}>
      <BodyCardPayment payment={payment} onDelete={onDelete} />
      {mostDataClient && <CardDataClient client={payment.client} />}
      <span className="absolute w-full h-[1.5px] bg-dark -bottom-4" />
    </ContainerCardPayment>
  );
}
