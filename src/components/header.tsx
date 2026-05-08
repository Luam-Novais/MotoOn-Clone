import Link from 'next/link';
import { House, Motorbike, DollarSign } from 'lucide-react';

const navItems = [
  {
    id: 'home',
    href: '/home',
    icon: House,
    label: 'Home',
  },
  {
    id: 'payment',
    href: '/payment',
    icon: DollarSign,
    label: 'Pagamentos',
  },
  {
    id: 'ride',
    href: '/ride',
    icon: Motorbike,
    label: 'Corridas',
  },
];

export function Header({ href }: { href: string }) {
  return (
    <header className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2">
      <nav className="flex items-center gap-2 justify-between rounded-2xl border border-zinc-700 bg-zinc-950 px-2 py-2 shadow-2xl transition-all duration-200 ease-in-out">
        {navItems.map((item) => {
          const isActive = href === item.id;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                relative flex flex-1 items-center justify-center gap-2
                rounded-xl px-4 py-3
                transition-all duration-200
                ${isActive ? 'bg-amber-500/30 text-amber-500 border border-amber-500' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}
              `}
            >
              <Icon size={22} strokeWidth={2.3} className={`transition-all ${isActive ? 'scale-110' : ''}`} />
              {isActive && <span className="absolute -top-1 h-1 w-12 rounded-full bg-zinc-200" />}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
