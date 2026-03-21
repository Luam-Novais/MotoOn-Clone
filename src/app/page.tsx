import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Link href={'/login'}>Login</Link>
      <Link href={'/create-ride'}>Criar corrida</Link>
    </div>
  );
}
