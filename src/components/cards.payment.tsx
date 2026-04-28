import { CalendarDays, CheckCircle2, Trash2, Wallet, User, UserX, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { formatToCurrency } from '../utils/functionsFormat';
import { Trash, Calendar, CircleCheck } from 'lucide-react';
import { Payment } from '../types/payment';
import { useState } from 'react';
import { Client } from '../types/client';

interface PaymentCardProps {
  payment: Payment;
  index: number;
  onDelete: () => void;
}

function BodyCardPayment({ payment }: { payment: Payment }) {
  const formatDate = new Date(payment.payment_date).toLocaleDateString();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <CalendarDays size={16} />
          <span>{formatDate}</span>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
          <CheckCircle2 size={14} />
          Concluído
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-zinc-500">Valor recebido</p>

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-3xl font-semibold text-amber-400">{formatToCurrency(payment.value)}</h2>

          <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
            <Wallet size={15} />
            {payment.payment_method}
          </div>
        </div>
      </div>
    </>
  );
}
function CardDataClient({ client }: { client?: Client }) {
  return (
    <div className="mt-3">
      {client ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-zinc-800 p-2">
              <User size={16} className="text-zinc-400" />
            </div>

            <div>
              <p className="text-sm text-zinc-500">Cliente</p>
              <p className="text-base font-medium text-zinc-100 capitalize">{client.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-zinc-800 p-2">
              <Phone size={16} className="text-zinc-400" />
            </div>

            <div>
              <p className="text-sm text-zinc-500">Telefone</p>
              <p className="text-base font-medium text-zinc-100">{client.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-zinc-800 p-2">
            <UserX size={16} className="text-zinc-400" />
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-100">Sem cliente cadastrado.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function PaymentCard({ payment, index, onDelete }: PaymentCardProps) {
  const [mostDataClient, setMostDataClient] = useState<boolean>(false);

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg overflow-hidden">
      <div className="h-1 w-full bg-amber-500" />

      <div className="p-5 space-y-4">
        <BodyCardPayment payment={payment} />
        <div className="border-t border-zinc-800" />
        <div className="flex items-center justify-between">
          <button className="rounded-xl bg-zinc-800 p-2 text-zinc-500 transition duration-300 ease-in-out flex items-center justify-center" onClick={() => setMostDataClient((prev: boolean) => !prev)}>
            {mostDataClient ? <ChevronUp /> : <ChevronDown />}
          </button>
          <button onClick={onDelete} className="rounded-xl bg-zinc-800 p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400">
            <Trash2 size={18} />
          </button>
        </div>
        {mostDataClient && (
          <>
            <CardDataClient client={payment.client} />
          </>
        )}
      </div>
    </div>
  );
}
