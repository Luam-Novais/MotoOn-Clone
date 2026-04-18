import { Title } from '@/src/components/title';
import Link from 'next/link';
import { ScrollText, ArrowRight, CirclePlus,CircleCheck, CalendarPlus } from 'lucide-react';

export default function Page() {
  return (
    <section className="flex flex-col px-4 py-8 gap-8 animate-appear">
      <Title className="flex items-center gap-2">
        Bem vindo ao MotoOn
        <CircleCheck color="green" />
      </Title>
      <div className="flex flex-col gap-12 bg-container px-4 py-8 rounded-xl shadow-md shadow-black/50">
        <Link className="relative flex  justify-between gap-x-2 bg-linear-to-b from-amber-300 to-amber-600  p-4 h-44 rounded-xl  shadow-md shadow-black/50" href={'/ride/create-ride'}>
          <div className="text-black self-end">
            <CirclePlus size={30} />
            <h1 className="uppercase text-xl font-bold italic">Agendar nova corrida</h1>
            <p className="text-sm">Inicie um novo serviço agora.</p>
          </div>
          <CalendarPlus className="top-5 right-5" size={120} color="#4A2C00" />
        </Link>

        <Link className="relative flex flex-col gap-4 bg-dark p-4 min-h-32 rounded-xl  shadow-md shadow-black/50 border-l-4 border-amber-500 " href={'/ride/view-rides'}>
          <div className="flex flex-col gap-8 z-40">
            <span className="flex flex-col gap-2">
              <h1 className="uppercase text-md font-bold italic">Visualizar suas corridas</h1>
              <p className="text-sm text-[#ccc]">Acompanhe o status de suas corridas em tempo real.</p>
            </span>
            <p className="uppercase font-bold text-amber-500 flex items-center gap-2">
              Acessar Historico <ArrowRight />
            </p>
          </div>
          <ScrollText className="absolute right-3 bottom-0" size={80} color="#222" />
        </Link>
      </div>
    </section>
  );
}
