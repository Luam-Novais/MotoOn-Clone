import { CheckCircle2, ArrowLeft, Bike, Motorbike } from 'lucide-react';
import Link from 'next/link';

export default function SuccessRide() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-white px-4">
      <div className="w-full max-w-md text-center animate-fade-in">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/10 p-6 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-green-500 animate-scale-in" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-2">Corrida criada com sucesso</h1>

        <p className="text-zinc-400 text-sm mb-8">Sua solicitação foi enviada. Agora é só aguardar a confirmação do motoboy.</p>

        <div className="flex flex-col gap-3">
          <Link href={'/ride/view-rides'} className="flex items-center justify-center gap-2 bg-linear-0 from-amber-600 to-amber-500 hover:bg-orange-600 transition-colors rounded-lg py-3 font-semibold text-amber-950">
            <Motorbike size={18} />
            Acompanhar corrida
          </Link>
          <Link href="/" className="flex items-center justify-center gap-2 border border-zinc-700 hover:bg-zinc-900 transition-colors rounded-lg py-3 text-zinc-300">
            <ArrowLeft size={18} />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
