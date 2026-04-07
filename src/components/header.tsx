import Link from "next/link"
import { House, Motorbike, DollarSign } from "lucide-react"
export  function Header({href}: {href: string}){
    return (
      <header className="min-w-full fixed bottom-0  p-4 bg-amber-500 rounded-l-md rounded-r-md ">
        <nav className="flex gap-2.5 justify-around transition-all duration-500 ease-in-out">
          <Link href={'/home'} className={`${href === 'home' ? 'text-[#451A03]' : ''}`}>
            <House size={30} />
          </Link>
          <Link href={'/payment'} className={`${href === 'payment' ? 'text-[#451A03]' : ''}`}>
            <DollarSign size={30} />
          </Link>
          <Link href={'/rides'} className={`${href === 'rides' ? 'text-[#451A03]' : ''}`}>
            <Motorbike size={30} />
          </Link>
        </nav>
      </header>
    );
}

export function HeaderClient({ href }: { href: string }) {
  return (
    <header className="min-w-full fixed bottom-0  p-4 bg-amber-500 rounded-l-md rounded-r-md ">
      <nav className="flex gap-2.5 justify-around transition-all duration-500 ease-in-out">
        <Link href={'/home'} className={`${href === 'home' ? 'text-[#451A03]' : ''}`}>
          <House size={30} />
        </Link>
        <Link href={'/payment'} className={`${href === 'payment' ? 'text-[#451A03]' : ''}`}>
          <DollarSign size={30} />
        </Link>
        <Link href={'/rides'} className={`${href === 'rides' ? 'text-[#451A03]' : ''}`}>
          <Motorbike size={30} />
        </Link>
      </nav>
    </header>
  );
}
